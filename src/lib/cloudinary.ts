import { config as loadEnv } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Load .env into process.env for local builds (CI injects secrets directly).
loadEnv({ path: '.env', quiet: true });
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  loadEnv({ path: '.env.local', quiet: true });
}

function cloudName() {
  return process.env.CLOUDINARY_CLOUD_NAME;
}
function apiKey() {
  return process.env.CLOUDINARY_API_KEY;
}
function apiSecret() {
  return process.env.CLOUDINARY_API_SECRET;
}
/** Media Library root; read lazily so Vite/dotenv have loaded `.env` first. */
function baseFolder() {
  return process.env.CLOUDINARY_BASE_FOLDER?.trim() || 'znimay';
}

/**
 * Delivery presets aimed at ~100KB per image on the free Cloudinary plan.
 * Always: f_auto (WebP/AVIF when supported) + q_auto:eco + capped width.
 * Never serve originals.
 */
export const IMAGE_PRESETS = {
  /** Gallery grid thumbs */
  thumb: { width: 480, crop: 'limit' as const },
  /** Team / portfolio cover cards */
  card: { width: 640, height: 800, crop: 'fill' as const },
  /** Section / page heroes */
  hero: { width: 960, height: 720, crop: 'fill' as const },
  /** Homepage studio backdrop */
  studio: { width: 1280, height: 720, crop: 'fill' as const },
  /** Lightbox — still compressed, never full-res */
  lightbox: { width: 1100, crop: 'limit' as const },
} as const;

export type ImagePreset = keyof typeof IMAGE_PRESETS;

export type CloudImage = {
  publicId: string;
  width: number;
  height: number;
  alt: string;
  /** Media Library display name (what Cloudinary sorts by “name”) */
  name: string;
  /** Media Library folder (dynamic folders) — may differ from public_id path */
  assetFolder?: string;
  resourceType: 'image' | 'video';
};

export type TeamGallery = {
  /** Numeric folder used for display order, e.g. "100" */
  order: number;
  orderKey: string;
  /** Gallery folder name, e.g. "portrait" */
  slug: string;
  title: string;
  images: CloudImage[];
};

type TeamBundle = {
  hero: CloudImage | null;
  galleries: TeamGallery[];
};

let configured = false;

/** Build-time cache only — skip in `astro dev` so new Cloudinary uploads show up. */
const useResourceCache = !import.meta.env.DEV;
const resourceCache = new Map<string, Promise<CloudImage[]>>();
const teamBundleCache = new Map<string, Promise<TeamBundle>>();

function ensureConfigured() {
  if (configured) return;
  // Re-read .env in case this module evaluated before Vite injected env.
  loadEnv({ path: '.env', quiet: true });
  if (!cloudName()) {
    loadEnv({ path: '.env.local', quiet: true });
  }
  if (!cloudName() || !apiKey() || !apiSecret()) {
    configured = true;
    return;
  }
  cloudinary.config({
    cloud_name: cloudName(),
    api_key: apiKey(),
    api_secret: apiSecret(),
    secure: true,
  });
  configured = true;
}

export function hasCloudinaryCredentials() {
  ensureConfigured();
  return Boolean(cloudName() && apiKey() && apiSecret());
}

export function folderPath(...parts: string[]) {
  return [baseFolder(), ...parts].filter(Boolean).join('/');
}

/**
 * Build a delivery URL. Prefer named presets so every image stays ~≤100KB.
 * Free-plan friendly: eco quality, auto format, no DPR upscaling, no originals.
 * Videos: compressed with c_limit (aspect preserved); poster for grid thumbs.
 */
export function imageUrl(
  publicId: string,
  options:
    | ImagePreset
    | {
        width?: number;
        height?: number;
        crop?: string;
        preset?: ImagePreset;
        resourceType?: 'image' | 'video';
        /** When true and resource is video, return a playable (compressed) stream */
        videoStream?: boolean;
      } = 'thumb',
) {
  ensureConfigured();

  if (!cloudName()) return '';

  const resourceType =
    typeof options === 'string' ? 'image' : (options.resourceType ?? 'image');
  const videoStream =
    typeof options === 'string' ? false : Boolean(options.videoStream);

  const resolved =
    typeof options === 'string'
      ? IMAGE_PRESETS[options]
      : options.preset
        ? { ...IMAGE_PRESETS[options.preset], ...options }
        : {
            width: options.width ?? IMAGE_PRESETS.thumb.width,
            height: options.height,
            crop: options.crop ?? 'limit',
          };

  // Playable video — compress, never crop (c_limit keeps aspect ratio)
  if (resourceType === 'video' && videoStream) {
    return cloudinary.url(publicId, {
      secure: true,
      resource_type: 'video',
      transformation: [
        {
          width: resolved.width,
          // Cap both axes so portrait clips aren’t only width-scaled into a wide box
          height: resolved.height ?? Math.round((resolved.width ?? 1100) * 1.8),
          crop: 'limit',
          quality: 'auto:eco',
        },
      ],
    });
  }

  // Video poster frame for grid; c_limit keeps aspect ratio
  if (resourceType === 'video') {
    return cloudinary.url(publicId, {
      secure: true,
      resource_type: 'video',
      format: 'jpg',
      transformation: [
        {
          start_offset: '0',
          width: resolved.width,
          crop: 'limit',
          quality: 'auto:eco',
        },
      ],
    });
  }

  return cloudinary.url(publicId, {
    secure: true,
    resource_type: 'image',
    transformation: [
      {
        width: resolved.width,
        height: 'height' in resolved ? resolved.height : undefined,
        crop: resolved.crop,
        quality: 'auto:eco',
        fetch_format: 'auto',
      },
    ],
  });
}

function toCloudImage(resource: {
  public_id: string;
  width?: number;
  height?: number;
  display_name?: string;
  filename?: string;
  asset_folder?: string;
  resource_type?: string;
}): CloudImage {
  const resourceType = resource.resource_type === 'video' ? 'video' : 'image';
  const name =
    resource.display_name ||
    resource.filename ||
    resource.public_id.split('/').pop() ||
    'Photo';
  return {
    publicId: resource.public_id,
    width: resource.width ?? 0,
    height: resource.height ?? 0,
    alt: name,
    name,
    assetFolder: resource.asset_folder,
    resourceType,
  };
}

/** Match Cloudinary Media Library “sort by name” (display_name, numeric-aware). */
function compareByName(a: CloudImage, b: CloudImage) {
  return a.name.localeCompare(b.name, undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

/**
 * List images + videos under a Media Library folder.
 *
 * Uses Search API by `folder:` / `asset_folder` — required for Cloudinary
 * dynamic folders, where public_id is flat and Admin `prefix` returns nothing.
 * Cached for the build; does not download media bytes.
 */
export async function fetchFolderImages(relativeFolder: string): Promise<CloudImage[]> {
  ensureConfigured();
  const folder = folderPath(relativeFolder);
  const cacheKey = `search:${folder}`;
  if (useResourceCache) {
    const cached = resourceCache.get(cacheKey);
    if (cached) return cached;
  }

  const promise = (async (): Promise<CloudImage[]> => {
    if (!hasCloudinaryCredentials()) {
      console.warn(`[cloudinary] Missing credentials; skipping folder "${relativeFolder}"`);
      return [];
    }

    const images: CloudImage[] = [];
    let nextCursor: string | undefined;

    // Include videos (e.g. galleries/400/Video) — folder:* works with dynamic folders
    const expression = `(resource_type:image OR resource_type:video) AND folder:${folder}/*`;

    try {
      do {
        let query = cloudinary.search.expression(expression).max_results(100);
        if (nextCursor) {
          query = query.next_cursor(nextCursor);
        }
        const result = await query.execute();

        for (const resource of result.resources ?? []) {
          images.push(toCloudImage(resource));
        }

        nextCursor = result.next_cursor;
      } while (nextCursor);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[cloudinary] Failed to search "${folder}": ${message}`);
      resourceCache.delete(cacheKey);
      return [];
    }

    if (images.length === 0) {
      console.warn(
        `[cloudinary] No media in "${folder}". If files exist in Media Library, check CLOUDINARY_BASE_FOLDER (expected "znimay").`,
      );
    }

    return images.sort(compareByName);
  })();

  if (useResourceCache) {
    resourceCache.set(cacheKey, promise);
    const images = await promise;
    if (images.length === 0) {
      resourceCache.delete(cacheKey);
    }
    return images;
  }

  return promise;
}

function formatGalleryTitle(slug: string) {
  if (!slug) return 'Gallery';
  if (slug.toUpperCase() === slug) return slug;
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

/**
 * One Search API pull for the whole member tree, then group by asset_folder.
 *
 * Expected asset folders:
 *   …/main/hero
 *   …/galleries/{order}/{galleryName}
 */
async function fetchTeamBundle(memberFolder: string): Promise<TeamBundle> {
  ensureConfigured();
  const cacheKey = `${baseFolder()}:${memberFolder}`;
  if (useResourceCache) {
    const cached = teamBundleCache.get(cacheKey);
    if (cached) return cached;
  }

  const promise = (async (): Promise<TeamBundle> => {
    const all = await fetchFolderImages(`team/${memberFolder}`);
    const memberRoot = folderPath('team', memberFolder);
    const galleriesRoot = `${memberRoot}/galleries/`;
    const heroRoot = `${memberRoot}/main/hero`;

    let hero: CloudImage | null = null;
    const galleryMap = new Map<string, TeamGallery>();

    for (const image of all) {
      const assetFolder = image.assetFolder ?? '';

      if (assetFolder === heroRoot || assetFolder.startsWith(`${heroRoot}/`)) {
        if (!hero && image.resourceType === 'image') hero = image;
        continue;
      }

      if (!assetFolder.startsWith(galleriesRoot)) continue;

      const rest = assetFolder.slice(galleriesRoot.length);
      const [orderKey, gallerySlug] = rest.split('/');
      if (!orderKey || !gallerySlug) continue;

      const order = Number.parseInt(orderKey, 10);
      if (Number.isNaN(order)) continue;

      const key = `${orderKey}/${gallerySlug}`;
      let gallery = galleryMap.get(key);
      if (!gallery) {
        gallery = {
          order,
          orderKey,
          slug: gallerySlug,
          title: formatGalleryTitle(gallerySlug),
          images: [],
        };
        galleryMap.set(key, gallery);
      }
      gallery.images.push(image);
    }

    const galleries = [...galleryMap.values()]
      .map((gallery) => ({
        ...gallery,
        images: [...gallery.images].sort(compareByName),
      }))
      .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

    return {
      hero,
      galleries,
    };
  })();

  if (useResourceCache) {
    teamBundleCache.set(cacheKey, promise);
    const bundle = await promise;
    // Don't keep a "hero only" snapshot — galleries often land later in the same session
    if (bundle.galleries.length === 0) {
      teamBundleCache.delete(cacheKey);
    }
    return bundle;
  }

  return promise;
}

/** Avatar / cover for team card: znimay/team/{member}/main/hero */
export async function fetchTeamHero(memberFolder: string): Promise<CloudImage | null> {
  const bundle = await fetchTeamBundle(memberFolder);
  return bundle.hero;
}

/**
 * Galleries for a team member:
 * znimay/team/{member}/galleries/{order}/{galleryName}/*
 * Galleries sorted by numeric order ascending; photos inside by Media Library
 * display name (same as Cloudinary “sort by name”).
 */
export async function fetchTeamGalleries(memberFolder: string): Promise<TeamGallery[]> {
  const bundle = await fetchTeamBundle(memberFolder);
  return bundle.galleries;
}

/** Flat list of all gallery images (fallback / legacy). */
export async function fetchTeamImages(memberFolder: string): Promise<CloudImage[]> {
  const galleries = await fetchTeamGalleries(memberFolder);
  return galleries.flatMap((gallery) => gallery.images);
}

export async function fetchStudioImages() {
  return fetchFolderImages('space');
}

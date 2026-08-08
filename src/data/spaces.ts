export type TourRoomId = 'entrance' | 'room_1' | 'dressing';

export type TourNodeId =
  | 'entrance'
  | 'room_1_1'
  | 'room_1_2'
  | 'room_1_3'
  | 'room_1_4'
  | 'dressing';

/** forward = floor/path arrow; wall = plaque projected on a wall/door */
export type TourLinkKind = 'forward' | 'wall';

export type TourPlaqueArrow = 'up' | 'down' | 'left' | 'right';

export type TourLink = {
  nodeId: TourNodeId;
  kind: TourLinkKind;
  position: { yaw: string; pitch: string };
  name: string;
  /** Direction cue on wall plaques */
  arrow?: TourPlaqueArrow;
};

export type TourNode = {
  id: TourNodeId;
  room: TourRoomId;
  /** Low-res path under public/media/ — used for instant hops */
  panorama: string;
  name: string;
  /** Initial camera look when entering this node */
  view: { yaw: string; pitch: string };
  /** Rotate the panorama on the sphere (e.g. pan: '180deg') */
  sphereCorrection?: { pan?: string; tilt?: string; roll?: string };
  links: TourLink[];
};

/** HQ companion for a LQ tour panorama (`3d/x.JPG` → `3d/hq/x.JPG`, ~8K). */
export function panoramaHqPath(panorama: string): string {
  return panorama.replace(/^3d\//, '3d/hq/');
}

export const tourRooms: {
  id: TourRoomId;
  startNodeId: TourNodeId;
  label: string;
  /** Still preview for Locations tab fallback */
  preview: string;
  blurb: string;
}[] = [
  {
    id: 'room_1',
    startNodeId: 'room_1_4',
    label: 'Фотостудія',
    preview: '3d/hq/room_1_4.JPG',
    blurb: 'Велика фотостудія із зонами: циклорама, сети й пілон.',
  },
  {
    id: 'entrance',
    startNodeId: 'entrance',
    label: 'Вхід',
    preview: '3d/hq/enterance.JPG',
    blurb: 'Хол студії — звідси заходите у фотостудію.',
  },
  {
    id: 'dressing',
    startNodeId: 'dressing',
    label: 'Гримерка',
    preview: '3d/hq/dressing.JPG',
    blurb: 'Гримерка з дзеркалом, одягом і місцем підготуватися до зйомки.',
  },
];

/**
 * Graph:
 * entrance → room_1_1
 * room_1_1 ↔ room_1_2 ↔ room_1_3 ↔ room_1_4
 * room_1_4 → dressing ↔ room_1_4
 *
 * World-zero alignment (shared look direction in the photo studio):
 * room_1_4 landmark was at 274/0  → pan 274
 * room_1_3 landmark was at 87/-2 → pan 267, tilt -2
 * room_1_2 landmark was at 89/0  → pan 269
 * room_1_1 landmark was at 87/0  → pan 267
 * After correction, landmark ≈ yaw 0.
 * room_1_4.view is only the tour open pose; node hops keep the prior camera.
 */
export const tourNodes: TourNode[] = [
  {
    id: 'entrance',
    room: 'entrance',
    panorama: '3d/enterance.JPG',
    name: 'Вхід',
    view: { yaw: '0deg', pitch: '-15deg' },
    links: [
      {
        nodeId: 'room_1_1',
        kind: 'wall',
        position: { yaw: '-15deg', pitch: '-45deg' },
        name: 'Фотостудія',
        arrow: 'down',
      },
    ],
  },
  {
    id: 'room_1_1',
    room: 'room_1',
    panorama: '3d/room_1_1.JPG',
    name: 'Фотостудія',
    view: { yaw: '0deg', pitch: '0deg' },
    sphereCorrection: { pan: '267deg' },
    links: [
      {
        nodeId: 'room_1_2',
        kind: 'forward',
        position: { yaw: '-177deg', pitch: '-55deg' },
        name: 'Далі',
      },
    ],
  },
  {
    id: 'room_1_2',
    room: 'room_1',
    panorama: '3d/room_1_2.JPG',
    name: 'Фотостудія',
    view: { yaw: '0deg', pitch: '0deg' },
    sphereCorrection: { pan: '269deg' },
    links: [
      {
        nodeId: 'room_1_1',
        kind: 'forward',
        position: { yaw: '1deg', pitch: '-55deg' },
        name: 'Назад',
      },
      {
        nodeId: 'room_1_3',
        kind: 'forward',
        position: { yaw: '-179deg', pitch: '-55deg' },
        name: 'Далі',
      },
    ],
  },
  {
    id: 'room_1_3',
    room: 'room_1',
    panorama: '3d/room_1_3.JPG',
    name: 'Фотостудія',
    view: { yaw: '0deg', pitch: '0deg' },
    sphereCorrection: { pan: '267deg', tilt: '-2deg' },
    links: [
      {
        nodeId: 'room_1_2',
        kind: 'forward',
        position: { yaw: '-7deg', pitch: '-53deg' },
        name: 'Назад',
      },
      {
        nodeId: 'room_1_4',
        kind: 'forward',
        position: { yaw: '173deg', pitch: '-53deg' },
        name: 'Далі',
      },
    ],
  },
  {
    id: 'room_1_4',
    room: 'room_1',
    panorama: '3d/room_1_4.JPG',
    name: 'Фотостудія',
    /** Opening pose only — transitions keep the previous camera (Street View style) */
    view: { yaw: '30deg', pitch: '0deg' },
    sphereCorrection: { pan: '274deg' },
    links: [
      {
        nodeId: 'room_1_3',
        kind: 'forward',
        position: { yaw: '-4deg', pitch: '-55deg' },
        name: 'Назад',
      },
      {
        nodeId: 'dressing',
        kind: 'wall',
        position: { yaw: '86deg', pitch: '0deg' },
        name: 'Гримерка',
        arrow: 'up',
      },
    ],
  },
  {
    id: 'dressing',
    room: 'dressing',
    panorama: '3d/dressing.JPG',
    name: 'Гримерка',
    view: { yaw: '0deg', pitch: '0deg' },
    links: [
      {
        nodeId: 'room_1_4',
        kind: 'wall',
        position: { yaw: '322deg', pitch: '0deg' },
        name: 'Фотостудія',
        arrow: 'up',
      },
    ],
  },
];

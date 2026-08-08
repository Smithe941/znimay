# ЗНІМАЙ

Лендінг продакшн-студії ЗНІМАЙ з власним простором + портфоліо команди (Roman, Olena, Oleksandr).

## Стек

- Astro (static)
- Tailwind CSS 4
- Cloudinary
- Українська

## Локальний запуск

1. Node.js 22+
2. Скопіюйте `.env.example` → `.env` і заповніть Cloudinary credentials
3. Структура папок у Cloudinary:

```
znimay/
  space/
    locations/   # stills for Locations tab
  team/
    roman/
    olena/
    oleksandr/
```

4. Встановіть залежності та запустіть:

```bash
npm install
npm run dev
```

Сайт: `http://localhost:4321/`

## Деплой (GitHub Pages)

Сайт: `https://znimay.art`  
Кастомний домен на GitHub Pages → `base` = `/`.

Workflow: `.github/workflows/deploy.yml`

Secrets:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Optional variables:
- `CLOUDINARY_BASE_FOLDER` (default `znimay`)
- `PUBLIC_GOOGLE_MAPS_API_KEY` — dark Google Map in Contacts (Maps JavaScript API)

У Settings → Pages виберіть Source: **GitHub Actions**.

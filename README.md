# ЗНІМАЙ

Лендінг продакшн-студії ЗНІМАЙ з власним простором + портфоліо команди (Roman, Olena, Oleksandr).

## Стек

- Astro (static)
- Tailwind CSS 4
- Cloudinary
- UA / EN (мова в `localStorage` + cookie)

## Локальний запуск

1. Node.js 22+
2. Скопіюйте `.env.example` → `.env` і заповніть Cloudinary credentials
3. Структура папок у Cloudinary:

```
znimay/
  studio/
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

## Мова

- Маршрути: `/uk/…`, `/en/…`
- Корінь `/` читає `localStorage` (`znimay-lang`) або cookie (`znimay_lang`) і редіректить
- Перемикач мови оновлює обидва сховища

## Деплой (GitHub Pages)

Workflow: `.github/workflows/deploy.yml`

Secrets:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Optional variable:
- `CLOUDINARY_BASE_FOLDER` (default `znimay`)

У Settings → Pages виберіть Source: **GitHub Actions**.

// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const base = process.env.PUBLIC_BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://smithe941.github.io',
  base,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow ngrok / LAN / any Host header in dev for now
      allowedHosts: true,
    },
  },
});

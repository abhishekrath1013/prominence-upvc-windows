// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { legacyRedirects } from './src/data/brand.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://prominance.com',
  integrations: [sitemap()],
  redirects: legacyRedirects,
  vite: {
    plugins: [tailwindcss()],
  },
});

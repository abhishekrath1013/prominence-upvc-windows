// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { legacyRedirects } from './src/data/brand.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://prominance.com',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  redirects: legacyRedirects,
  vite: {
    plugins: [tailwindcss()],
    // Lenis / ScrollTrigger are pulled in by the home page script; list them so Vite bundles them once, up front.
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'lenis'],
    },
  },
  image: {
    responsiveStyles: true,
  },
  // Same type pairing as the Prominance aluminium site: Manrope for text, Poppins for headlines.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Manrope',
      cssVariable: '--font-sans-raw',
      weights: ['200', '300', '400', '500', '600', '700'],
    },
    {
      provider: fontProviders.google(),
      name: 'Poppins',
      cssVariable: '--font-poppins-raw',
      weights: ['200', '300', '400', '500', '600', '700', '800'],
    },
  ],
});

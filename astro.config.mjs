// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jcc-dev.onrender.com/',

  server: {
    host: true,
    port: 4321,
  },

  integrations: [sitemap()],
});
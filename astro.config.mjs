// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://josepcompany.dev/',

  server: {
    host: true,
    port: 4321,
  },

  integrations: [sitemap()],
});
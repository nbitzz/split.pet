import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/remark-plugins/readTime';
import { remarkCustomEmoji } from './src/remark-plugins/customEmoji';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://split.pet/',
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkCustomEmoji],
    
  },
  integrations: [mdx()]
});
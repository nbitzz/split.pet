import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/remark-plugins/readTime';
import { remarkCustomEmoji } from './src/remark-plugins/customEmoji';

// https://astro.build/config
export default defineConfig({
    site: 'https://split.pet/',
    markdown: {
        remarkPlugins: [
            remarkReadingTime,
            remarkCustomEmoji
        ]
    }
});
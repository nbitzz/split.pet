import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/remark-plugins/readTime';

// https://astro.build/config
export default defineConfig({
    site: 'https://split.pet/',
    markdown: {
        remarkPlugins: [remarkReadingTime]
    }
});
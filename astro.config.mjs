import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/remark-plugins/readTime';
import { remarkCustomEmoji } from './src/remark-plugins/customEmoji';
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://split.pet/',
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkCustomEmoji]
  },
  integrations: [mdx()],
  redirects: {
    "/blog/setup": {
      status: 301,
      destination: "/docs/setup"
    },
    "/domainlist": {
      status: 301,
      destination: "/docs/split/domainlist"
    },
    "/blog/introduction": {
      status: 301,
      destination: "/blog/2024/05/introduction"
    },
    "/blog/hello-world": {
      status: 301,
      destination: "/blog/2024/04/hello-world"
    }
  }
});
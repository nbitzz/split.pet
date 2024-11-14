import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/remark-plugins/readTime';
import { remarkCustomEmoji } from './src/remark-plugins/customEmoji';
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
// https://astro.build/config
export default defineConfig({
  site: 'https://split.pet/',
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkCustomEmoji]
  },
  integrations: [expressiveCode(), mdx()],
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
    },
    "/tabs": {
      status: 301,
      destination: "https://tabs.split.pet/"
    }
  }
});
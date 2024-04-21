import rss, {pagesGlobToRssItems} from '@astrojs/rss';
import type { MarkdownInstance } from 'astro';
import type { Props as PostProps } from "../layouts/Post.astro"

export async function GET(context) {
  return rss({
    title: 'split.pet blog',
    description: 'blog hosted on split.pet by split!',
    site: context.site,
    items: 
      (await Promise.all(Object.entries(import.meta.glob("./blog/*.md"))
        .map(([_, get]) => get())))
        .filter((e: MarkdownInstance<PostProps["frontmatter"]>) => e.frontmatter.publicationDate && !e.frontmatter.unlisted)
        .map((e: MarkdownInstance<PostProps["frontmatter"]>) => {
          return {
            title: e.frontmatter.title,
            description: e.frontmatter.description,
            pubDate: new Date(e.frontmatter.publicationDate),
            content: e.compiledContent(),
            link: e.url
          }
        })
  });
}
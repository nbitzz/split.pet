import rss, {pagesGlobToRssItems} from '@astrojs/rss';
import type { MarkdownInstance, MDXInstance } from 'astro';
import type { Props as PostProps } from "../layouts/Post.astro"

export async function GET(context) {
  return rss({
    title: 'split.pet blog',
    description: 'blog hosted on split.pet by split!',
    site: context.site,
    items: 
      (await Promise.all(Object.entries(import.meta.glob<MarkdownInstance<PostProps["frontmatter"]>|MDXInstance<PostProps["frontmatter"]>>("./blog/*.{md,mdx}"))
        .map(([_, get]) => get())))
        .filter(e => e.frontmatter.publicationDate && !e.frontmatter.unlisted)
        .map(e => {
          return {
            title: e.frontmatter.title,
            description: e.frontmatter.description,
            pubDate: new Date(e.frontmatter.publicationDate),
            content: "compiledContent" in e ? e.compiledContent() : `This content can't be rendered here. See the full post at <a href="${e.url}">${e.url}</a>.`,
            link: e.url
          }
        })
  });
}
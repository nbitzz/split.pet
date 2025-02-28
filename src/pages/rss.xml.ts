import rss, { pagesGlobToRssItems } from "@astrojs/rss"
import type { MarkdownInstance, MDXInstance } from "astro"
import type { Props as PostProps } from "../layouts/Post.astro"
import { getCollection } from "astro:content"
import astroConfig from "../../astro.config.mjs"

export async function GET(context) {
    const posts = await getCollection("posts")
    return rss({
        title: "split.pet blog",
        description: "blog hosted on split.pet by split!",
        site: context.site,
        items: posts
            .filter(e => e.data.pubDate && !e.data.unlisted)
            .map(e => {
                return {
                    title: e.data.title,
                    description: e.data.description,
                    pubDate: e.data.pubDate
                        ? new Date(e.data.pubDate)
                        : undefined,
                    content:
                        "compiledContent" in e
                            ? (e.compiledContent as () => string)()
                            : `This content can't be rendered here. See the full post at <a href="/blog/${e.id}">${astroConfig.site}/blog/${e.id}</a>.`,
                    link: `/blog/${e.id}`,
                }
            }),
    })
}

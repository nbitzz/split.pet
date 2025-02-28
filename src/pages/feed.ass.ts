import rss, { pagesGlobToRssItems } from "@astrojs/rss"
import type { MarkdownInstance, MDXInstance } from "astro"
import type { Props as PostProps } from "../layouts/Post.astro"
import { getCollection } from "astro:content"
import astroConfig from "../../astro.config.mjs"

export async function GET(context) {
    const posts = await getCollection("posts")
    return new Response(
        "# Actually Simple Syndication - https://tilde.town/~dzwdz/ass/\n" +
            posts
                .filter(e => e.data.pubDate && !e.data.unlisted)
                .map(
                    e =>
                        `${
                            new Date(e.data.pubDate!)
                                .toISOString()
                                .split("T")[0]
                        }\t${astroConfig.site}/${e.slug}\t${e.data.title}`
                )
                .join("\n"),
        {
            headers: {
                "Content-Type": "text/plain",
            },
        }
    )
}

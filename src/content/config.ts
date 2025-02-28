import { z, defineCollection } from "astro:content"

const BaseImage = z.object({
    alt: z.string(),
    isTopper: z.boolean().optional()
})

const BaseCollectionItem = z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    pubDate: z.number().optional(),
    image: z.union([
        BaseImage.extend({ url: z.string() }),
        BaseImage.extend({ path: z.string() })
    ])
})

export const collections = {
    posts: defineCollection({
        type: "content",
        schema: BaseCollectionItem.omit({order: true}).extend({
            unlisted: z.boolean().optional(),
            tags: z.array(z.string()).optional()
        })
    }),
    docs: defineCollection({
        type: "content",
        schema: BaseCollectionItem
    })
}
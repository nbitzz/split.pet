// if you're reading what's in this file i'm Sorry

// using parseSync cause I don't gaf
import { parseSync as parseSvg, stringify as buildSvg } from "svgson"

let metadata =
        await import.meta.glob<{default: ImageMetadata}>("../images/**/*")

export default function dynImportImg(path: string) {
    let img = metadata[`../images/${path}`]
    if (!img) throw `${path} not found`
    return img()
}

export function injectTitleIntoSvg(input: string, title: string) {
    let svg = parseSvg(input)
    svg.children.splice(0,0,{
        name: "title",
        type: "element",
        value: "",
        attributes: {},
        children: [
            {
                name: "",
                type: "text",
                value: title,
                attributes: {},
                children: []
            }
        ],
    })
    return buildSvg(svg)
}
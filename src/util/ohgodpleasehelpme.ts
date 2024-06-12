// this unfortunately seems to be the intended way of doing this shit

let metadata =
        await import.meta.glob<{default: ImageMetadata}>("../images/**/*")

export default function dynImportImg(path: string) {
    let img = metadata[`../images/${path}`]
    if (!img) throw `${path} not found`
    return img()
}
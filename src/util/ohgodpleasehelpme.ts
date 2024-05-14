// this unfortunately seems to be the intended way of doing this shit

let metadata =
    Object.entries(
        await import.meta.glob<{default: ImageMetadata}>("../images/**/*")
    )

export default function dynImportImg(path: string) {
    return metadata.find(e => e[0] == `../images/${path}`)[1]()
}
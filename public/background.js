onmessage = async ({ data: { url = undefined, dom = undefined } }) => {
    if (!dom) {
        let { abort, signal } = new AbortController(),
            r = await fetch(url, { signal })

        if (!r.headers.get("content-type")?.includes("text/html")) {
            abort()
            return postMessage({ url, d: false })
        }

        dom = await r.text()
    }

    postMessage({
        url,
        d: dom.match(
            /<head>([\S\s]*?)<\/head>[\S\s]*<div id="all".*?>([\S\s]*)<\/div>.*<\/div>/
        )?.slice(1),
    })
}

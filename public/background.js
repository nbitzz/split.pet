onmessage = async ({ data: url }) => {
    let { abort, signal } = new AbortController(),
        r = await fetch(url, { signal })

    if (!r.headers.get("content-type")?.includes("text/html")) {
        abort()
        return postMessage({ url, d: false })
    }

    postMessage({
        url,
        d: (await r.text()).match(
            /<head>([\S\s]*?)<\/head>[\S\s]*<div id="all".*?>([\S\s]*)<\/div>.*<\/div>/
        )?.slice(1),
    })
}

// i should not be allowed to write ts
// ever again
import { CONTINUE, SKIP, visit } from "unist-util-visit"
import { getEmoji } from "../util/emojicore"

export function remarkCustomEmoji() {
  return function (tree) {
    let toAwait: Promise<void>[] = []
    visit(tree, "text", (node: Record<string, any> & { value: string }, index, parent) => {

      toAwait.push((async () => {
        let objs = Array.from(node.value
          .matchAll(/:([^\s:]+?):|([^:]+)|(:)/g))
          .map(async ([match, emojiName, text, colon]) => {
            if (text || colon) return { type: "text", value: match }
            else {
              let element = await getEmoji(emojiName)

              return element 
                ? {type: "html", value: element} 
                : { type: "text", value: match }
            }
          })
          
        if (parent.idxOffset === undefined) parent.idxOffset = 0

        let fn = (await Promise.all(objs))

        parent.children.splice(
          index+parent.idxOffset,
          1,
          ...fn
        )
        
        parent.idxOffset += objs.length-1
      })())
    })
    return Promise.all(toAwait).then(() => undefined)
  };
}
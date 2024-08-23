// i should not be allowed to write ts
// ever again
import { CONTINUE, SKIP, visit } from "unist-util-visit"
import { getEmoji } from "../util/emojicore"
import { groupBy } from "../util/polyfills";

function joinText(arr: (string|Record<any, any>)[]) {
  let textGroup: string[] | null = null
  let newArr: (string|Record<any, any>)[] = []

  arr.forEach(e => {
    if (typeof e == "string") {
      if (textGroup) textGroup.push(e)
      else {
        textGroup = [e];
        newArr.push(textGroup)
      }
    } else {
      textGroup = null;
      newArr.push(e)
    }
  })
  
  return newArr.map(e => Array.isArray(e) ? e.join("") : e)
}

export function remarkCustomEmoji() {
  return function (tree) {
    let toAwait: Promise<void>[] = []
    visit(tree, "text", (node: Record<string, any> & { value: string }, index, parent) => {

      toAwait.push((async () => {
        let objs = Array.from(node.value
          .matchAll(/:([^\s:]+?):|([^:]+)|(:)/g))
          .map(async ([match, emojiName, text, colon]) => {
            if (text || colon) return match
            else {
              let element = await getEmoji(emojiName)

              return element 
                ? {type: "html", value: element} 
                : match
            }
          })

        // group text nodes
          
        if (parent.idxOffset === undefined) parent.idxOffset = 0

        let fn = joinText(await Promise.all(objs))
          .map(e => 
            typeof e == "string" 
            ? { type: "text", value: e }
            : e
          )
        
        parent.children.splice(
          index+parent.idxOffset,
          1,
          ...fn
        )
        
        parent.idxOffset += fn.length-1
      })())
    })
    return Promise.all(toAwait).then(() => undefined)
  };
}
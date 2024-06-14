import * as simple from "simple-icons"

const cache = {
  fluent: new Map<string, string|undefined>(),
  default: new Map<string, string|undefined>()
}

interface Emoji {
  src: string,
  alt?: string
}

const emoji =
      Object.fromEntries(await Promise.all(
          Object.entries(import.meta.glob("./emoji/*.json"))
              .map(async ([key, prom]) => [
                key.match(/\.\/emoji\/(.*)\.json/)?.[1], 
                (await prom() as any)?.default
              ])
      )) as Record<string, Emoji>

let locators: Record<string, (name: string) => Promise<(string|undefined|void)> | (string|undefined|void)> = {
  async default(name) {
    if (cache.default.has(name)) return cache.default.get(name)
    else if (name in emoji) return`<img src="${emoji[name].src}" alt="${emoji[name].alt ?? name}" class="customEmoji" title=":${name}:">`
    else {
      let icon = undefined
      try {
        icon = (await import(`./emoji/${name}.svg?raw`)).default
      } catch {}

      cache.default.set(name, icon)
      return icon
    }
  },
  async fluent(name) {
    if (cache.fluent.has(name)) return cache.fluent.get(name)
    else {
      let icon = undefined
      try {
        icon = (await import(`../../node_modules/@fluentui/svg-icons/icons/${name}_16_filled.svg?raw`)).default
      } catch {}

      cache.fluent.set(name, icon)
      return icon
    }
  },
  simple(name) {
    return `si${name}` in simple ? simple[`si${name}`].svg : undefined
  }
}

export async function getEmoji(emojiName: string) {
    let [_, locator, name] = emojiName.match(/(?:(.*)\.)?(.*)/)!
    if (!locator) locator = "default"
    if (!locators[locator]) return

    return locators[locator](name)
}
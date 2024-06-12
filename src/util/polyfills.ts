export const groupBy = Object.groupBy || function<K extends PropertyKey, T>(items: Array<T>, keySelector: (item: T, index: number) => K): Partial<Record<K, T[]>> {
    let newObj = {} as Record<K, T[]>

    items.forEach((v, x) => {
        let key = keySelector(v,x)
        newObj[key] = [...(newObj[key] || [] as T[]), v]
    })

    return newObj
}
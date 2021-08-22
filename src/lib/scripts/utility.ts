export function stripPhone(phone: string) {
    return phone.match(/\d/g)?.join("") ?? ""
}

export function splitChoices(choices: string) {
    return choices.split("\n") ?? []
}

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function smoothEdges<T, R extends { edges: { node: T }[] }>(resource: R) {
    return resource.edges.map(edge => edge.node)
}

export async function preloadImage(href: string) {
    await new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = resolve
        image.onerror = reject
        image.src = href
    })
    return href
}

export async function preloadImages(...hrefs: string[]) {
    return await Promise.all(hrefs.map(preloadImage))
}

import _ from "lodash"

export function css(node: HTMLElement, styles: Record<string, any>) {
    function update(styles: Record<string, any>) {
        setStyleProperties(node, styles, _.kebabCase)
    }

    update(styles)

    return {
        update
    }
}

export function cssVars(node: HTMLElement, styles: Record<string, any>) {
    function update(styles: Record<string, any>) {
        setStyleProperties(node, styles, x => "--" + _.kebabCase(x))
    }

    update(styles)

    return {
        update
    }
}

export function setStyleProperties(
    node: HTMLElement,
    styles: Record<string, any>,
    transform = (x: any) => x
) {
    Object.entries(styles).forEach(([key, value]) => node.style.setProperty(transform(key), value))
}

export function classes(node: HTMLElement, listOrSingleton: any) {
    let last: string[] = []

    function update(listOrSingleton: any = []) {
        node.classList.remove(...last)

        const list = Array.isArray(listOrSingleton) ? listOrSingleton : [listOrSingleton]
        const next = list.filter(Boolean).flatMap(x => x?.split(" "))
        node.classList.add(...next)

        last = next
    }

    update(listOrSingleton)

    return {
        update
    }
}

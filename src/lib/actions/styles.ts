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

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
    Object.entries(styles).forEach(([key, value]) => {
        const property = transform(key)
        if (value === undefined || value === null) node.style.removeProperty(property)
        else node.style.setProperty(property, value)
    })
}

type BuildExpression = string | boolean
type BuildExpressionMaybeList = BuildExpression | BuildExpression[]

function parseBuildExpressions(listOrSingleton: BuildExpressionMaybeList) {
    const list = Array.isArray(listOrSingleton) ? listOrSingleton : [listOrSingleton]
    return list
        .filter(Boolean)
        .flatMap((x: string) => x?.split(" "))
        .filter(Boolean)
}

export function buildClasses(listOrSingleton: BuildExpressionMaybeList) {
    return parseBuildExpressions(listOrSingleton).join(" ")
}

export function classes(node: HTMLElement, listOrSingleton: BuildExpressionMaybeList) {
    let last: string[] = []

    function update(listOrSingleton: BuildExpressionMaybeList = []) {
        node.classList.remove(...last)

        const next = parseBuildExpressions(listOrSingleton)
        console.log({ next })
        node.classList.add(...next)

        last = next
    }

    update(listOrSingleton)

    return {
        update
    }
}

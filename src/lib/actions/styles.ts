export function css(node: HTMLElement, styles: Record<string, any>) {
    function update(styles: Record<string, any>) {
        setStyleProperties(node, styles)
    }
  
    update(styles)
  
    return {
        update
    }
}

export function setStyleProperties(node: HTMLElement, styles: Record<string, any>) {
    Object.entries(styles).forEach(([key, value]) => node.style.setProperty(key, value))
}
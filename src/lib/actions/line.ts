import "./line.scss"
import _ from "lodash"

export interface LineConfig {
    origin: string
    maxWidth: string
    force: boolean
    scale: number
    color: string
}

export type LineActionConfig = boolean | Partial<LineConfig>

const name = "line-decoration"

export function line(node: HTMLElement, config: LineActionConfig) {
    function update(config: LineActionConfig) {
        if (!config) {
            node.classList.remove(name)
            return
        }

        const _config: Partial<LineConfig> = typeof config === "object" ? config : {}
        node.classList.add(name)
        node.classList[_config?.force ? "add" : "remove"]("active-line")
        Object.entries(_config)
            .filter(([key]) => key !== "force")
            .forEach(([key, value]) => {
                node.style.setProperty(`--line-${_.kebabCase(key)}`, String(value))
            })
    }
    update(config)
    return {
        update
    }
}

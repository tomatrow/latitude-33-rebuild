<script lang="ts">
    import { line as lineAction } from "../actions/line"
    import type { LineActionConfig } from "../actions/line"

    export { clazz as class }
    export let hollow: boolean
    export let filled: boolean
    export let href: string
    export let line: LineActionConfig = false

    let clazz = ""

    const classes = [
        hollow && "border-white border",
        filled && "bg-either-gray-blue",
        (hollow || filled) && "rounded-full py-2 px-4"
    ]
        .filter(Boolean)
        .join(" ")
</script>

<a {href} class="{clazz} {classes}" {...$$restProps} use:lineAction={line}>
    <slot />
</a>

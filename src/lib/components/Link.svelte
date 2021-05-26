<script context="module" lang="ts">
    export interface ClassesConfig {
        hollow?: boolean
        filled?: boolean
        shadow?: boolean
        blob?: boolean
        pill?: boolean
    }
    export function createClasses({ hollow, filled, shadow, blob, pill }: ClassesConfig) {
        return [
            blob && "rounded",
            pill && "rounded-full",
            hollow && "border-white border",
            filled && "bg-either-gray-blue",
            (hollow || filled) && "rounded-full py-2 px-4",
            shadow && "transition-shadow duration-200",
            "font-display text-white"
        ]
            .filter(Boolean)
            .join(" ")
    }
</script>

<script lang="ts">
    import { line as lineAction } from "../actions/line"
    import type { LineActionConfig } from "../actions/line"

    export let hollow: boolean = undefined
    export let filled: boolean = undefined
    export let shadow: boolean = undefined
    export let blob: boolean = undefined
    export let pill: boolean = undefined
    export let line: LineActionConfig = false

    export let href: string
    export { clazz as class }

    let clazz = ""

    $: classes = createClasses({ hollow, filled, shadow, blob, pill })
</script>

<a
    {href}
    class:shadow-inner-full={shadow}
    class="{clazz} {classes}"
    use:lineAction={line}
    {...$$restProps}
>
    <slot />
</a>

<style lang="postcss">
    .shadow-inner-full:hover {
        box-shadow: inset 0 200px 200px 200px rgba(0, 0, 0, 0.1);
    }
</style>

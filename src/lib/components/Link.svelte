<script context="module" lang="ts">
    export interface ClassesConfig {
        hollow?: boolean
        filled?: boolean
        shadow?: boolean
        blob?: boolean
        pill?: boolean
        raise?: boolean
        ease?: boolean
    }
    export function createClasses({
        hollow,
        filled,
        shadow,
        blob,
        pill,
        raise,
        ease
    }: ClassesConfig) {
        return [
            ease && "duration-200 ease-in-out transition",
            raise && "hover:-translate-y-1.5 hover:shadow-md transform",
            blob && "rounded",
            pill && "rounded-full",
            hollow && "border-white border",
            filled && "bg-either-gray-blue",
            (hollow || filled) && "rounded-full py-2 px-4",
            shadow && "transition-shadow duration-200",
            "font-display"
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
    export let raise: boolean = undefined
    export let ease: boolean = undefined
    export let line: LineActionConfig = false

    export let title: string = undefined

    export let href: string
    export { clazz as class }

    let clazz = ""

    $: classes = createClasses({ hollow, filled, shadow, blob, pill, raise, ease })
</script>

<a
    {href}
    class:hover:shadow-inner-10xl={shadow}
    class="{clazz} {classes}"
    use:lineAction={line}
    on:click
    {...$$restProps}
>
    {#if title}
        {title}
    {:else}
        <slot />
    {/if}
</a>

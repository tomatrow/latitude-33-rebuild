<script context="module" lang="ts">
    export type PrimaryColor =
        | "a-taste-of-blueberries"
        | "either-gray-blue"
        | "scorpion-tan"
        | "pre-coffee-sky-blue"
        | "calm-summer-horizon"
        | "dark-charcoal"
        | "disappointment-blue"
        | "tinted-rear-window"
        | "shark"
        | "sarcastic-orange"
        | "the-girl-is-looking-at-the-sky"
        | "white"
        | "black"

    export interface ClassesConfig {
        hollow?: boolean
        filled?: boolean
        shadow?: boolean
        fill?: boolean
        blob?: boolean
        pill?: boolean
        raise?: boolean
        ease?: boolean
        border?: boolean
        color?: PrimaryColor
    }
    export function createClasses({
        hollow,
        filled,
        shadow,
        blob,
        pill,
        fill,
        raise,
        ease,
        border,
        color
    }: ClassesConfig) {
        return [
            ease && "duration-200 ease-in-out transition",
            raise && "hover:-translate-y-1.5 hover:shadow-md transform",
            shadow && "hover:shadow-inner-10xl",
            fill && `hover:bg-${color}`,
            blob && "rounded",
            pill && "rounded-full",
            hollow && "border-white border",
            filled && `bg-${color} text-white`,
            border && `border-${color} border-2`,
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
    export let color: PrimaryColor = undefined
    export let border: boolean = undefined
    export let fill: boolean = undefined

    export let title: string = undefined

    export let href: string
    export { clazz as class }

    let clazz = ""

    const classes = createClasses({
        hollow,
        filled,
        shadow,
        blob,
        pill,
        raise,
        ease,
        border,
        color,
        fill
    })
</script>

<a {href} class="{clazz} {classes}" use:lineAction={line} on:click {...$$restProps}>
    {#if title}
        {title}
    {:else}
        <slot />
    {/if}
</a>

<script context="module" lang="ts">
    import Colors from "$lib/data/colors.json"
    import type { PrimaryColor } from "$lib/index.type"
    
    const baseTheme = {
        class: "py-2 px-4 font-extralight uppercase",
        ease: true,
        border: true
    }

    export const themes = {
        dark(classes?: string) {
            return {
                fill: "white" as PrimaryColor,
                color: "a-stormy-morning" as PrimaryColor,
                ...baseTheme,
                class: baseTheme.class + (classes ? ' ' + classes : '')
            }
        },
        light(classes?: string) {
            return {
                fill: "black" as PrimaryColor,
                color: "white" as PrimaryColor,
                ...baseTheme,
                class: baseTheme.class + (classes ? ' ' + classes  : '')
            }
        }
    }

    export interface ClassesConfig {
        hollow?: boolean
        filled?: boolean
        shadow?: boolean
        fill?: boolean | PrimaryColor
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
            ease && "duration-[425ms] ease-in-out transition",
            raise && "hover:-translate-y-1.5 hover:shadow-md transform",
            shadow && "hover:shadow-inner-10xl",
            fill && `hover:bg-${color}`,
            Colors[fill] && `hover:text-${filled ? color : fill} hover:border-${filled ? color : fill} hover:bg-${filled ? fill : color}`,
            blob && "rounded",
            pill && "rounded-full",
            hollow && "border-white border",
            filled && `bg-${color} text-white`,
            border && `border-${color} border`,
            "font-display"
        ]
            .filter(Boolean)
            .join(" ")
    }
</script>

<script lang="ts">
    import { line as lineAction } from "../actions/line"
    import type { LineActionConfig } from "../actions/line"
    import { page } from "$app/stores"

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
    export let fill: boolean | PrimaryColor = undefined

    export let title: string = undefined
    export let active: boolean|string = undefined 

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
   
    function pathFor(href: string) {
        let path: string

        if (href?.startsWith("/"))
            path = href 
        else if (href?.startsWith("http"))
            path = (new URL(href)).pathname

        return path?.endsWith('/') ? path.slice(0, -1) : path
    }

    let activeClasses = ""
    $: if (active && pathFor(href) === $page.path) {
        activeClasses = typeof active === "string" ? active : "opacity-70"
    } else {
        activeClasses = ""
    }
</script>

<a {href} class="{clazz} {classes} {activeClasses}" use:lineAction={line} on:click {...$$restProps}>
    {#if $$slots.default}
        <slot />
    {:else}
        {title}
    {/if}
</a>

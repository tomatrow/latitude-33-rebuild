<script lang="ts">
    import { line as lineAction } from "../actions/line"
    import type { LineActionConfig } from "../actions/line"
    import { createClasses } from "./Link.svelte"

    export let hollow: boolean = undefined
    export let filled: boolean = undefined
    export let shadow: boolean = undefined
    export let blob: boolean = undefined
    export let pill: boolean = undefined
    export let line: LineActionConfig = false

    export let title: string = undefined

    export let type: "button" | "submit" | "reset" = "button"
    export { clazz as class }

    let clazz = ""

    $: classes = createClasses({ hollow, filled, shadow, blob, pill })
</script>

<button
    {type}
    on:click
    class:hover:shadow-inner-10xl={shadow}
    class="{clazz} {classes}"
    use:lineAction={line}
    {...$$restProps}
>
    {#if title}
        {title}
    {:else}
        <slot />
    {/if}
</button>

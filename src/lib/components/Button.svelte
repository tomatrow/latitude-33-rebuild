<script lang="ts">
    import { line as lineAction } from "../actions/line"
    import type { LineActionConfig } from "../actions/line"
    import { createClasses } from "./Link.svelte"
    import type { PrimaryColor } from "./Link.svelte"

    export let hollow: boolean = undefined
    export let filled: boolean = undefined
    export let shadow: boolean = undefined
    export let blob: boolean = undefined
    export let pill: boolean = undefined
    export let line: LineActionConfig = false
    export let color: PrimaryColor = undefined
    export let border: boolean = undefined
    export let fill: boolean = undefined
    export let ease: boolean = undefined

    export let title: string = undefined

    export let type: "button" | "submit" | "reset" = "button"
    export { clazz as class }

    let clazz = ""

    const classes = createClasses({ ease, hollow, filled, shadow, blob, pill, border, color, fill })
</script>

<button {type} on:click class="{clazz} {classes}" use:lineAction={line} {...$$restProps}>
    {#if title}
        {title}
    {:else}
        <slot />
    {/if}
</button>

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

    export let type: "button" | "submit" | "reset" = "button"
    export { clazz as class }

    let clazz = ""

    $: classes = createClasses({ hollow, filled, shadow, blob, pill })
</script>

<button
    {type}
    on:click
    class:shadow-inner-full={shadow}
    class="{clazz} {classes}"
    use:lineAction={line}
    {...$$restProps}><slot /></button
>

<style lang="postcss">
    .shadow-inner-full:hover {
        box-shadow: inset 0 200px 200px 200px rgba(0, 0, 0, 0.1);
    }
</style>

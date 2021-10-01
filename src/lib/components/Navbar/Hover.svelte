<script lang="ts">
    export let hovering = false
    let clazz = ""
    export { clazz as class }
    let style: string = undefined
</script>

<div {style} class="{clazz}" on:mouseenter={() => hovering = true} on:mouseleave={() => hovering = false}>
    <slot {hovering} />
</div>
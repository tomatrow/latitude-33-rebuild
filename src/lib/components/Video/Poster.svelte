<script lang="ts">
    import type { AcfImage } from "$lib/index.type"

    export let image: AcfImage = undefined
    let clazz = ""
    export { clazz as class }
</script>

{#if image}
    <!-- svelte-ignore a11y-missing-attribute -->
    <img class={clazz} {...image} />
{/if}

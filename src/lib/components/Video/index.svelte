<script lang="ts">
    import { browser, dev } from "$app/env"
    import type { AcfImage } from "$lib/index.type"
    import Poster from "./Poster.svelte"

    export let poster: AcfImage = undefined
    let clazz = ""
    export { clazz as class }
</script>

{#if browser}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video class={clazz} poster={poster?.src} {...$$restProps}>
        {#if !dev}
            <slot />
        {/if}
        <Poster class={clazz} image={poster} />
    </video>
{:else}
    <Poster class={clazz} image={poster} />
{/if}

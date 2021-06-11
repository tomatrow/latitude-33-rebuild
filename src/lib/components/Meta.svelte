<script>
    import { browser } from "$app/env"
    export let title
    export let seo
</script>

<svelte:head>
    <title>{title}</title>
    {#if !browser}
        {@html seo.fullHead}
    {/if}
</svelte:head>

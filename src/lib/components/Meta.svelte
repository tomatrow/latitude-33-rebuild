<script lang="ts">
    import { browser } from "$app/env"

    export let title: string
    export let seo: any
</script>

<svelte:head>
    <title>{title}</title>
    {#if browser}
        {@html seo.fullHead}
    {/if}
</svelte:head>

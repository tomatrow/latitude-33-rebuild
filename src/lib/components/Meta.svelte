<script lang="ts">
    import { browser } from "$app/env"

    export let title: string
    export let seo: any = undefined
</script>

<svelte:head>
    <title>{title}</title>
    {#if browser && seo}
        {@html seo.fullHead}
    {/if}
</svelte:head>

<script>
    import { browser } from "$app/env"
    export let post
</script>

<svelte:head>
    <title>{post.seo.title}</title>
    {#if browser}
        {@html post.seo.fullHead}
    {/if}
</svelte:head>

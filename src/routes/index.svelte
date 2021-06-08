<script lang="ts" context="module">
    import { createLoad } from "$lib/scripts/utility"
    import { fetchPage } from "./[base]/index.svelte"

    export const load = createLoad(
        ({ session }) => session.pages.find(item => item.isFrontPage),
        fetchPage
    )
</script>

<script lang="ts">
    import Home from "./[base]/_page-templates/Home/index.svelte"
    import { onMount } from "svelte"

    export let info: any
    export let data: any
    export let variables: any

    onMount(async () => (data ??= await fetchPage(info, variables)))
</script>

{#if data}
    <Home {...data} />
{/if}

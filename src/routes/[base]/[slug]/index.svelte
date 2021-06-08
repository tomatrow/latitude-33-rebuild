<script lang="ts" context="module">
    import { query } from "$lib/scripts/apollo"
    import * as AircraftInfo from "./_post-templates/Aircraft.svelte"
    import { createLoad } from "$lib/scripts/utility"

    async function fetchPost(info, variables) {
        let postQuery: string
        switch (info.base) {
            case AircraftInfo.name:
                postQuery = AircraftInfo.Query
                break
            default:
                throw new Error("Post not found")
        }
        const response = await query(postQuery, variables)
        return response.data
    }

    function findPost({ page, session }) {
        console.log({ page, session })
        const result = session[page.params.base]?.find(post => post.slug === page.params.slug)
        if (!result) return null
        return {
            base: page.params.base,
            ...result
        }
    }

    export const load = createLoad(findPost, fetchPost)
</script>

<script lang="ts">
    import Aircraft from "./_post-templates/Aircraft.svelte"
    import { Link } from "$lib/components"
    import { onMount } from "svelte"

    export let info: any
    export let data: any
    export let variables: any

    onMount(async () => (data ??= await fetchPost(info, variables)))
</script>

{#if data}
    {#if info.base === AircraftInfo.name}
        <Aircraft {...data} />
    {:else}
        <Link class="block text-black text-center" sveltekit:prefetch href="/">Home</Link>
    {/if}
{/if}

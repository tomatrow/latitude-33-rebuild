<script lang="ts" context="module">
    import { query } from "$lib/scripts/apollo"
    import * as AircraftInfo from "./post-templates/_Aircraft.svelte"

    export const load: import("@sveltejs/kit").Load = async ({ page, session }) => {
        const { base, slug } = page.params

        const postInfo = session[base]?.find(post => post.slug === slug)

        if (!postInfo)
            return {
                status: 404
            }

        const { id } = postInfo

        let postQuery: string
        switch (base) {
            case AircraftInfo.base:
                postQuery = AircraftInfo.Query
                break
            default:
                return {
                    status: 404
                }
        }

        const response = await query(postQuery, { id })

        const { data } = response

        return {
            status: 200,
            props: {
                base,
                data
            }
        }
    }
</script>

<script lang="ts">
    import Aircraft from "./post-templates/_Aircraft.svelte"
    import { Link } from "$lib/components"

    export let base: string
    export let data: any
</script>

{#if base === AircraftInfo.base}
    <Aircraft {...data} />
{:else}
    <Link class="block text-black text-center" sveltekit:prefetch href="/">Home</Link>
{/if}

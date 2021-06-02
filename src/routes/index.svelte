<script lang="ts" context="module">
    import { query } from "$lib/scripts/apollo"
    import { FrontPageQuery } from "$lib/queries/frontPage"

    export const load: import("@sveltejs/kit").Load = async ({ session }) => {
        const pageInfo = session.pages.find(page => page.isFrontPage)

        if (!pageInfo)
            return {
                status: 404
            }

        const { id } = pageInfo
        const response = await query(FrontPageQuery, { id })

        return {
            status: 200,
            props: {
                page: response.data.page.contentType.node.contentNodes.edges[0].node
            }
        }
    }
</script>

<script lang="ts">
    import Hero from "./index/_Hero.svelte"
    import Grid from "./index/_Grid.svelte"
    import Why from "./index/_Why.svelte"
    import TriBlurbs from "./index/_TriBlurbs.svelte"
    import Offerings from "./index/_Offerings.svelte"
    import Services from "./index/_Services.svelte"

    export let page: any
</script>

<svelte:head>
    <title>{page.title}</title>
</svelte:head>

<Hero {...page.frontPage.hero} />
<Grid {...page.frontPage.grid} />
<Why {...page.frontPage.why} />
<TriBlurbs {...page.frontPage.triblurbs} />
<Offerings {...page.frontPage.offerings} />
<Services {...page.frontPage.services} />

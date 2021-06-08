<script context="module" lang="ts">
    import { graphql } from "$lib/scripts/apollo"
    import { AcfLinkFragment } from "$lib/queries/utility"
    import { FrontPageFragment } from "$lib/queries/frontPage"
    import { PageFragment } from "$lib/queries/pages"

    export const name = "Home"
    export const Query = graphql`
        query FrontPageQuery($id: ID!, $isPreview: Boolean!) {
            page(id: $id, asPreview: $isPreview) {
                ...FrontPageFragment
            }
        }
        ${AcfLinkFragment}
        ${FrontPageFragment}
        ${PageFragment}
    `
</script>

<script lang="ts">
    import Hero from "./Hero.svelte"
    import Grid from "./Grid.svelte"
    import Why from "./Why.svelte"
    import TriBlurbs from "./TriBlurbs.svelte"
    import Offerings from "./Offerings.svelte"
    import Services from "./Services.svelte"

    export let page: any
</script>

<svelte:head>
    <title>{page.title}</title>
</svelte:head>

<Hero {...page.template.frontPage.hero} />
<Grid {...page.template.frontPage.grid} />
<Why {...page.template.frontPage.why} />
<TriBlurbs {...page.template.frontPage.triblurbs} />
<Offerings {...page.template.frontPage.offerings} />
<Services {...page.template.frontPage.services} />

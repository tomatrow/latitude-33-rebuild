<script context="module" lang="ts">
    import { graphql } from "$lib/scripts/apollo"
    import { AcfLinkFragment } from "$lib/queries/utility"
    import { FrontPageFragment } from "$lib/queries/frontPage"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"

    export const load = loadPage(
        "Home",
        graphql`
            query HomePageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...FrontPageFragment
                }
            }
            ${AcfLinkFragment}
            ${FrontPageFragment}
            ${PageFragment}
        `
    )
</script>

<script lang="ts">
    import { Meta } from "$lib/components"

    import Hero from "./_Hero.svelte"
    import Grid from "./_Grid.svelte"
    import Why from "./_Why.svelte"
    import TriBlurbs from "./_TriBlurbs.svelte"
    import Offerings from "./_Offerings.svelte"
    import Services from "./_Services.svelte"

    export let page: any
</script>

<Meta title={page.title} seo={page.seo} />

<Hero {...page.template.frontPage.hero} />
<Grid {...page.template.frontPage.grid} />
<Why {...page.template.frontPage.why} />
<TriBlurbs {...page.template.frontPage.triblurbs} />
<Offerings {...page.template.frontPage.offerings} />
<Services {...page.template.frontPage.services} />

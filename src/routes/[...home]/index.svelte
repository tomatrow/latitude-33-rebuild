<script context="module" lang="ts">
    import { graphql } from "$lib/scripts/apollo"
    import { AcfLinkFragment, OfferingFragment, MediaItemFragment } from "$lib/queries/utility"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"

    export const load = loadPage(
        "Home",
        graphql`
            query HomePageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Home {
                            frontPage {
                                hero {
                                    brandName
                                    fieldGroupName
                                    youtubeId
                                    title
                                    pageLink {
                                        ...AcfLinkFragment
                                    }
                                    backgroundImage {
                                        ...MediaItemFragment
                                    }
                                }
                                grid {
                                    blurb
                                    link {
                                        ...AcfLinkFragment
                                    }
                                    image {
                                        ...MediaItemFragment
                                    }
                                }
                                singularOffering {
                                    ...OfferingFragment
                                }
                                triBlurbs {
                                    contentHtml
                                    fieldGroupName
                                    title
                                }
                                services {
                                    ...OfferingFragment
                                }
                                duelOfferings {
                                    offering {
                                        ...OfferingFragment
                                    }
                                }
                            }
                        }
                    }
                }
            }
            ${AcfLinkFragment}
            ${PageFragment}
            ${OfferingFragment}
            ${MediaItemFragment}
        `
    )
</script>

<script lang="ts">
    import { Meta, OfferingList, CornerOffering, Offering, FlushOffering } from "$lib/components"

    import Hero from "./_Hero.svelte"
    import Grid from "./_Grid.svelte"
    import TriBlurbs from "./_TriBlurbs.svelte"

    export let page: any
</script>

<Meta title={page.title} seo={page.seo} />

<Hero {...page.template.frontPage.hero} />
<Grid items={page.template.frontPage.grid} />
<OfferingList class="mb-12">
    <CornerOffering
        accent="text-either-gray-blue"
        {...page.template.frontPage.singularOffering.offering}
    />
</OfferingList>

<TriBlurbs items={page.template.frontPage.triBlurbs} />

<OfferingList class="py-32">
    <div slot="left" class="bg-scorpion-tan" />
    {#each page.template.frontPage.services as { offering }}
        <Offering {...offering} />
    {/each}
</OfferingList>

<OfferingList class="bg-either-gray-blue pb-12 text-white">
    <CornerOffering full {...page.template.frontPage.duelOfferings[0].offering.offering} />
    <FlushOffering {...page.template.frontPage.duelOfferings[1].offering.offering} />
</OfferingList>

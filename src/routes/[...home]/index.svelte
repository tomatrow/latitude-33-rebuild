<script context="module" lang="ts">
    import { graphql } from "$lib/scripts/apollo"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"
    import { createFlexiblePsudoFragment } from "$lib/components/FlexibleContent.svelte"

    export const load = loadPage(
        "Home",
        graphql`
            query HomePageQuery($id: ID!, $isPreview: Boolean!) {
                fleet(first:500, where: { status: PUBLISH}) {
                    edges {
                        node {
                            aircraftFields {
                                stats {
                                    maxPassengers
                                }
                            }
                        }
                    }
                }
                airports(first: 250, where: { status: PUBLISH }) {
                    edges {
                        node {
                            id
                            href: uri
                            locationPostFields {
                                name
                            }
                            airportFields {
                               code
                            }
                        }
                    }
                }
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
                                    title: blurb
                                    link {
                                        ...AcfLinkFragment
                                    }
                                    image {
                                        ...MediaItemFragment
                                    }
                                }
                                tripPlanner {
                                    successPageLink {
                                        ...AcfLinkFragment
                                    }
                                }
                            }
                            ${createFlexiblePsudoFragment("Template_Home")}
                        }
                    }
                }
            }
            ${AcfLinkFragment}
            ${PageFragment}
            ${MediaItemFragment}
        `
    )
</script>

<script lang="ts">
    import { Meta, FlexibleContent, CtaBar } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"

    import Hero from "./_Hero.svelte"
    import Grid from "./_Grid.svelte"
    import { Bar } from "$lib/components/TripPlanner"

    export let page: any
    export let airports: any
    export let fleet: any
</script>

<Meta title={page.title} seo={page.seo} />

<Hero {...page.template.frontPage.hero} />
<Grid items={page.template.frontPage.grid} />
<CtaBar>
    <Bar
        class="w-full"
        successPageLink={page.template.frontPage.tripPlanner.successPageLink}
        airports={smoothEdges(airports)}
        {fleet}
    />
</CtaBar>
<FlexibleContent content={page.template.genericPageFields.flexibleContent} />

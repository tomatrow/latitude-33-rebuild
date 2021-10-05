<script context="module" lang="ts">
    import { graphql } from "$lib/scripts/apollo"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"
    import { createFlexiblePsudoFragment } from "$lib/components/FlexibleContent.svelte"
    import { TripPlannerPsuedoFragment } from "$lib/components/TripPlanner/utility"

    export const load = loadPage(
        "Home",
        graphql`
            query HomePageQuery($id: ID!, $isPreview: Boolean!) {
                ${TripPlannerPsuedoFragment}
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
    import { Meta, FlexibleContent } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"

    import Hero from "./_Hero.svelte"
    import { Bar } from "$lib/components/TripPlanner"

    export let page: any
    export let tripFleet: any
    export let tripAirports: any
</script>

<Meta title={page.title} seo={page.seo} />

<Hero {...page.template.frontPage.hero} />
<FlexibleContent content={page.template.genericPageFields.flexibleContent} />
<Bar
    class="bg-sarcastic-orange p-4 md:p-0   "
    successPageLink={page.template.frontPage.tripPlanner.successPageLink}
    airports={smoothEdges(tripAirports)}
    fleet={tripFleet}
/>

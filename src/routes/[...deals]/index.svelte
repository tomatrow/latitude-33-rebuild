<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"
    import { createFlexiblePsudoFragment } from "$lib/components/FlexibleContent.svelte"

    export const load = loadPage(
        "Deals",
        graphql`
            query DealsPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Deals {
                            ${createFlexiblePsudoFragment("Template_Deals")}
                            dealsPageFields {
                                bannerSection {
                                    title
                                    contentHtml
                                    dealsLinkLabel
                                    image {
                                        ...MediaItemFragment
                                    }
                                }
                                dealsSection {
                                    title
                                    subheading
                                    dealLabels {
                                        passengersPrefix
                                        costPostfix
                                        phone {
                                            number 
                                            labelHtml
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                deals(first: 250, where: { status: PUBLISH }) {
                    edges {
                        node {
                            dealFields {
                                cost
                                craft {
                                    ... on Aircraft {
                                        id
                                        title
                                        aircraftFields {
                                            stats {
                                                maxPassengers
                                            }
                                            featuredImage {
                                                ...MediaItemFragment
                                            }
                                        }
                                    }
                                }
                                date
                                end {
                                    ...AirportDealsFragment
                                }
                                start {
                                    ...AirportDealsFragment
                                }
                            }
                        }
                    }
                }
            }
            ${PageFragment}
            ${MediaItemFragment}
            ${AcfLinkFragment}
            fragment AirportDealsFragment on Airport {
                id
                locationPostFields {
                    coordinates {
                        city
                        stateShort
                    }
                }
            }
        `
    )
</script>

<script lang="ts">
    import { Meta, FlexibleContent, SplitBanner } from "$lib/components"
    import DealsGrid from "./_DealsGrid.svelte"

    export let page: any
    export let deals: any
</script>

<Meta title={page.title} seo={page.seo} />

<SplitBanner {...page.template.dealsPageFields.bannerSection} />
<DealsGrid {deals} {...page.template.dealsPageFields.dealsSection} />
<FlexibleContent content={page.template.genericPageFields.flexibleContent} />

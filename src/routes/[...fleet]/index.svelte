<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import {
        createFlexiblePsudoFragment,
        BannerPsudoFragment
    } from "$lib/components/FlexibleContent.svelte"

    export const AircraftFragment = `
        fragment AircraftFragment on Aircraft {
            id
            title
            href: uri
            aircraftFields {
                featuredImage {
                    ...MediaItemFragment
                }
                stats {
                    baggageCapacity
                    maxCruiseSpeed
                    maxPassengers
                    maxRange
                    height 
                    width 
                    length
                }
            }
        }
    `

    export const load = loadPage(
        "Fleet",
        graphql`
            query FleetPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Fleet {
                            fleetArchivePageFields {
                                banner {
                                    ${BannerPsudoFragment}
                                }
                                filter {
                                    ctaBar {
                                        heading
                                        buttonLabel
                                    }
                                    gridLinkLabel
                                }
                            }
                            ${createFlexiblePsudoFragment("Template_Fleet")}
                        }
                    }
                }
                fleet(first: 500) {
                    edges {
                        node {
                           ...AircraftFragment
                        }
                    }
                }
            }
            ${PageFragment}
            ${AcfLinkFragment}
            ${MediaItemFragment}
            ${AircraftFragment}
        `
    )
</script>

<script lang="ts">
    import { Meta, Banner, FlexibleContent } from "$lib/components"
    import FleetFilter from "./_FleetFilter.svelte"

    export let page: any
    export let fleet: any

    const { banner, filter } = page.template.fleetArchivePageFields
</script>

<Meta title={page.title} seo={page.seo} />

<Banner {...banner} />
<FleetFilter {fleet} {...filter} />
<FlexibleContent content={page.template.genericPageFields.flexibleContent} />

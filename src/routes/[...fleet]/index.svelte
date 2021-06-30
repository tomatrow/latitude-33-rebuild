<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import {
        createFlexiblePsudoFragment,
        BannerPsudoFragment
    } from "$lib/components/FlexibleContent.svelte"

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
                            title
                            uri
                            featuredImage {
                                node {
                                    ...MediaItemFragment
                                }
                            }
                            aircraftFields {
                                stats {
                                    baggageCapacity
                                    maxCruiseSpeed
                                    maxPassengers
                                    maxRange
                                }
                            }
                        }
                    }
                }
            }
            ${PageFragment}
            ${AcfLinkFragment}
            ${MediaItemFragment}
        `
    )
</script>

<script lang="ts">
    import { Meta, Banner, FlexibleContent } from "$lib/components"

    import Filter from "./_Filter.svelte"

    export let page: any
    export let fleet: any

    const { banner, filter } = page.template.fleetArchivePageFields
</script>

<Meta title={page.title} seo={page.seo} />

<Banner {...banner} />
<Filter {fleet} {...filter} />
<FlexibleContent content={page.template.genericPageFields.flexibleContent} />

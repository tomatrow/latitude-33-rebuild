<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"
    import {
        AcfLinkFragment,
        MediaItemFragment,
        OfferingFragment,
        BannerFragment
    } from "$lib/queries/utility"

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
                                    ...BannerFragment
                                }
                                filter {
                                    ctaBar {
                                        heading
                                        buttonLabel
                                    }
                                    gridLinkLabel
                                }
                                infoOfferings {
                                    ...OfferingFragment
                                }
                                quoteOffering {
                                    ...OfferingFragment
                                }
                            }
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
            ${OfferingFragment}
            ${MediaItemFragment}
            ${BannerFragment}
        `
    )
</script>

<script lang="ts">
    import {
        Meta,
        Banner,
        Offering,
        CornerOffering,
        FlushOffering,
        OfferingList
    } from "$lib/components"

    import Filter from "./Filter.svelte"

    export let page: any
    export let fleet: any

    const { banner, filter, infoOfferings, quoteOffering } = page.template.fleetArchivePageFields
</script>

<Meta title={page.title} seo={page.seo} />

<Banner {...banner.bannerFields} />
<Filter {...filter} {fleet} />
<OfferingList class="bg-either-gray-blue pb-12 text-white">
    <CornerOffering {...infoOfferings[0].offering} />
    <FlushOffering {...infoOfferings[1].offering} />
</OfferingList>
<OfferingList class="py-32">
    <div slot="left" class="bg-scorpion-tan" />
    <Offering {...quoteOffering.offering} />
</OfferingList>

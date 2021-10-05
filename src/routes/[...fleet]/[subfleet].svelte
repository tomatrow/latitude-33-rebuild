<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { MediaItemFragment } from "$lib/queries/utility"
    import { loadResource } from "$lib/scripts/router"
    import { AircraftFragment } from "./index.svelte"

    export const load = loadResource(
        graphql`
            query SubfleetTaxonomyQuery($id: ID!) {
                subfleet(id: $id) {
                    id
                    name
                    seo {
                        title
                        fullHead
                    }
                    subfleetPageSettings {
                        gallery {
                            ...MediaItemFragment
                            sizes
                            srcset: srcSet
                        }
                        gridHeading
                        contentHtml
                    }
                    fleet {
                        edges {
                            node {
                                ...AircraftFragment
                            }
                        }
                    }
                }
                acfOptionsSubfleets {
                    subfleetOptions {
                        mainContent {
                            subheading
                            bookingCtaLabel
                            galleryLabel
                        }
                        fleetGrid {
                            subheading
                            linkLabel
                        }
                    }
                }
            }
            ${MediaItemFragment}
            ${AircraftFragment}
        `,
        ({ __typename }) => __typename === "Subfleet"
    )
</script>

<script lang="ts">
    import _ from "lodash"
    import { Meta, Link, Button, Gallery, CollectionGrid, GalleryCarousel } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"
    import { fleetFormat } from "./_FleetFilter.svelte"
    import { classes } from "$lib/actions/styles"
    import AircraftInfo from "./_AircraftInfo.svelte"
    import { themes } from "$lib/components/Link.svelte"
    import Heading from "$lib/components/typography/Heading.svelte"

    export let subfleet: any
    export let acfOptionsSubfleets: any

    $: ({ subfleetOptions } = acfOptionsSubfleets)

    $: fleet = smoothEdges(subfleet.fleet).map(aircraft =>
        fleetFormat(aircraft, subfleetOptions.fleetGrid.linkLabel)
    )
</script>

<Meta title={subfleet.name} seo={subfleet.seo} />

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <section class="gap-y-4 flex items-start flex-col px-5 md:pl-12">
        <Heading reverse large subheading={subfleetOptions.mainContent.subheading}
            >{subfleet.name}</Heading
        >

        <div class="injected-content injected-content_subfleet">
            {@html subfleet.subfleetPageSettings.contentHtml}
        </div>
        <Link
            filled
            {...themes.dark("inline-block mx-auto")}
            href="#subfleet-grid"
            >{subfleetOptions.mainContent.bookingCtaLabel}</Link
        >
    </section>

    <GalleryCarousel class="mx-auto md:pr-12 max-w-md h-96 w-full" gallery={subfleet.subfleetPageSettings?.gallery ?? []} />
</div>

<div class="my-12 px-5 sm:px-12 text-center">
    <Heading large reverse subheading={subfleetOptions.fleetGrid.subheading}
        >{subfleet.subfleetPageSettings.gridHeading}</Heading
    >
</div>

<CollectionGrid items={fleet} let:item>
    <AircraftInfo {...item} />
</CollectionGrid>

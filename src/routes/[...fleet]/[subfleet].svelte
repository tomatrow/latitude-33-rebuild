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
    import { Meta, Link, Button, Gallery, CollectionGrid } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"
    import { fleetFormat } from "./_FleetFilter.svelte"
    import { classes } from "$lib/actions/styles"
    import AircraftInfo from "./_AircraftInfo.svelte"
    import Heading from "$lib/components/typography/Heading.svelte"

    export let subfleet: any
    export let acfOptionsSubfleets: any

    const { subfleetOptions } = acfOptionsSubfleets
    $: images = subfleet.subfleetPageSettings.gallery
    $: fleet = smoothEdges(subfleet.fleet).map(aircraft =>
        fleetFormat(aircraft, subfleetOptions.fleetGrid.linkLabel)
    )

    let galleryIndex = 0
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
            shadow
            filled
            color="a-stormy-morning"
            href="#subfleet-grid"
            ease
            class="uppercase font-extralight inline-block mx-auto py-4 px-6 text-white"
            >{subfleetOptions.mainContent.bookingCtaLabel}</Link
        >
    </section>

    <Gallery {images} let:show>
        <section class="mx-auto md:pr-12 max-w-md">
            <div class="flex items-end m-4" use:classes={images.length === 1 ? "h-96" : "h-72"}>
                <!-- svelte-ignore a11y-missing-attribute -->
                <img
                    class="transition duration-200 transform hover:-translate-y-3 mx-auto mb-4 h-full hover:shadow-lg cursor-pointer object-cover"
                    {...images[galleryIndex]}
                    on:click={() => show(galleryIndex)}
                />
            </div>
            {#if images.length > 1}
                <div class="gap-4 flex items-center flex-col lg:flex-row justify-between px-5">
                    <div class="grid gap-4 grid-cols-3">
                        {#each images.slice(0, 6) as image, index}
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <img
                                class="w-full h-16 cursor-pointer object-cover"
                                {...image}
                                on:click={() => (galleryIndex = index)}
                            />
                        {/each}
                    </div>
                    <Button
                        shadow
                        filled
                        border
                        ease
                        color="a-stormy-morning"
                        class="uppercase font-extralight justify-self-end flex-shrink-0 my-auto py-4 px-6 border-2"
                        on:click={() => show(galleryIndex)}
                        >{subfleetOptions.mainContent.galleryLabel}</Button
                    >
                </div>
            {/if}
        </section>
    </Gallery>
</div>

<div class="my-12 px-5 sm:px-12 text-center">
    <Heading large reverse subheading={subfleetOptions.fleetGrid.subheading}
        >{subfleet.subfleetPageSettings.gridHeading}</Heading
    >
</div>

<CollectionGrid items={fleet} let:item>
    <AircraftInfo {...item} />
</CollectionGrid>

<style global lang="postcss">
    .injected-content_subfleet {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            @apply text-a-stormy-morning;
        }
    }
</style>

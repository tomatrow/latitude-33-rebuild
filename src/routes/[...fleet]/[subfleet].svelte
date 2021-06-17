<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { MediaItemFragment } from "$lib/queries/utility"
    import { loadResource } from "$lib/scripts/router"

    export const load = loadResource(
        graphql`
            query SubfleetTaxonomyQuery($id: ID!) {
                subfleet(id: $id) {
                    id
                    name
                    description
                    seo {
                        title
                        fullHead
                    }
                    subfleetPageSettings {
                        gallery {
                            ...MediaItemFragment
                            sizes
                            srcSet
                        }
                        gridHeading
                    }
                    fleet {
                        edges {
                            node {
                                id
                                title
                                uri
                                featuredImage {
                                    node {
                                        ...MediaItemFragment
                                    }
                                }
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
        `,
        ({ __typename }) => __typename === "Subfleet"
    )
</script>

<script lang="ts">
    import _ from "lodash"
    import { Meta, Link, Button, Gallery, RangeFinderCta, Card } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"

    export let subfleet: any
    export let acfOptionsSubfleets: any

    const { subfleetOptions } = acfOptionsSubfleets

    const images = subfleet.subfleetPageSettings.gallery.map(
        ({ sourceUrl, altText, sizes, srcSet }) => ({
            sizes,
            alt: altText,
            src: sourceUrl,
            srcset: srcSet
        })
    )

    const fleet = smoothEdges(subfleet.fleet)

    function isSingular(length: number, chunk: number, index: number) {
        return index === length - 1 && length % chunk === 1
    }

    function classes(index: number) {
        return [
            isSingular(fleet.length, 3, index) && "lg:aspect-w-16 lg:aspect-h-9",
            isSingular(fleet.length, 2, index) && "md:aspect-w-16 md:aspect-h-9"
        ]
            .filter(Boolean)
            .join(" ")
    }

    let galleryIndex = 0
</script>

<Meta title={subfleet.name} seo={subfleet.seo} />

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <section class="space-y-4 flex items-start flex-col px-5">
        <h5 class="font-display text-either-gray-blue font-bold">
            {subfleetOptions.mainContent.subheading}
        </h5>
        <h1 class="font-black text-2xl sm:text-6xl">{subfleet.name}</h1>
        <div class="injected-subfleet-content">{@html subfleet.description}</div>
        <Link
            shadow
            blob
            href="#subfleet-grid"
            class="bg-either-gray-blue inline-block mx-auto py-4 px-6 text-white font-black"
            >{subfleetOptions.mainContent.bookingCtaLabel}</Link
        >
    </section>

    <Gallery {images} let:show>
        <section>
            <div class="h-72 flex items-end m-4">
                <img
                    class="rounded-xl transition duration-200 transform hover:-translate-y-3 mx-auto mb-4 hover:shadow-lg object-cover"
                    {...images[galleryIndex]}
                    on:click={() => show(galleryIndex)}
                />
            </div>
            {#if images.length > 1}
                <div
                    class="space-y-4 md:space-x-2 md:space-y-0 flex items-center flex-col md:flex-row justify-between px-5"
                >
                    <div
                        class="grid gap-2 grid-cols-3 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5"
                    >
                        {#each images.slice(0, 6) as image, index}
                            <img
                                class="w-full h-16 object-cover"
                                {...image}
                                on:click={() => (galleryIndex = index)}
                            />
                        {/each}
                    </div>
                    <Button
                        blob
                        shadow
                        class="border-either-gray-blue text-either-gray-blue justify-self-end flex-shrink-0 my-auto py-4 px-6 border-2"
                        on:click={() => show(galleryIndex)}
                        >{subfleetOptions.mainContent.galleryLabel}</Button
                    >
                </div>
            {/if}
        </section>
    </Gallery>
</div>

<RangeFinderCta class="bg-sarcastic-orange my-12 py-6 px-12" />

<div class="my-12 px-5 text-center">
    <h5 class="font-display text-either-gray-blue font-bold text-xl">
        {subfleetOptions.fleetGrid.subheading}
    </h5>
    <h4 class="sm:text-5.5xl font-display tracking-px text-black font-black text-4xl">
        {subfleet.subfleetPageSettings.gridHeading}
    </h4>
</div>

<section class="grid grid-custom">
    {#each fleet as { title, uri, featuredImage }, index}
        <div class={classes(index)}>
            <Card
                class="h-96"
                {title}
                href={uri}
                linkTitle={subfleetOptions.fleetGrid.linkLabel}
                src={featuredImage?.node.sourceUrl}
            />
        </div>
    {/each}
</section>

<style global lang="postcss">
    .injected-subfleet-content {
        @apply tracking-px font-light text-xl;

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            @apply mt-4 font-bold font-display text-either-gray-blue tracking-normal;
        }
    }
</style>

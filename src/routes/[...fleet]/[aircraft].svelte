<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { FleetTypeOptionsFragment, AircraftFragment } from "$lib/queries/aircraft"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { loadResource, previewVariables } from "$lib/scripts/router"

    export const load = loadResource(
        graphql`
            query AircraftPostQuery($id: ID!, $isPreview: Boolean!) {
                aircraft(id: $id, asPreview: $isPreview) {
                    ...AircraftFragment
                }
                acfOptionsDrillDown {
                    ...FleetTypeOptionsFragment
                }
            }
            ${FleetTypeOptionsFragment}
            ${AircraftFragment}
            ${AcfLinkFragment}
            ${MediaItemFragment}
        `,
        ({ __typename }) => __typename === "Aircraft",
        ({ id }, input) => ({ id, ...previewVariables(input) })
    )
</script>

<script lang="ts">
    import _ from "lodash"
    import {
        Link,
        Meta,
        CheckerItem,
        TestimonialExpose,
        Anchor,
        CtaBar,
        GalleryCarousel,
        Button
    } from "$lib/components"
    import { ChevronRight } from "$lib/svgs"
    import { cssVars } from "$lib/actions/styles"
    import Stat from "./_Stat.svelte"
    import { slideDiag } from "$lib/transitions"

    export let aircraft: any
    export let acfOptionsDrillDown: any
    let showGallery

    // todo: make this more editable
    $: features = _.zip(
        [
            aircraft.aircraftFields.interior,
            aircraft.aircraftFields.amenities,
            aircraft.aircraftFields.avionics
        ],
        [
            {
                title: aircraft.title + " Interior",
                icon: {
                    src: "/icons/blue-chair.png",
                    alt: "blue chair icon"
                }
            },
            {
                title: aircraft.title + " Amenities",
                icon: {
                    src: "/icons/blue-tv.png",
                    alt: "blue tv icon"
                }
            },
            {
                title: aircraft.title + " Avionics",
                icon: {
                    src: "/icons/blue-jet.png",
                    alt: "blue jet icon"
                }
            }
        ]
    ).map(([{ description, image }, fields]) => ({
        ...fields,
        image,
        contentHtml: description
    }))

    $: ({ featuredImage } = aircraft.aircraftFields)

    function idify(key: string) {
        return _.kebabCase(key)
    }
</script>

<Meta title={aircraft.title} seo={aircraft.seo} />

<div
    class="stats sm:bg-a-stormy-morning sm:pt-8 sm:pb-24 sm:pl-5 bg-white sm:bg-center sm:bg-cover sm:bg-no-repeat"
    use:cssVars={{
        bg: featuredImage ? `url(${featuredImage.src})` : ""
    }}
>
    {#if featuredImage}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="sm:hidden w-full" {...featuredImage} />
    {/if}

    <section
        class="bg-opacity-70 sm:rounded-xl sm:px-9 transition-all duration-200 relative sm:p-0 py-6 sm:py-16 px-5 sm:max-w-sm bg-white"
    >
        <h1 class="font-display text-3.5xl leading-9 font-extralight w-3/4 text-black">
            {aircraft.title}
        </h1>

        <Stat label="Max Range">{aircraft.aircraftFields.stats.maxRange} NM</Stat>
        <Stat label="Max Cruise Speed">{aircraft.aircraftFields.stats.maxCruiseSpeed} MPH</Stat>
        <Stat label="Max Passengers">{aircraft.aircraftFields.stats.maxPassengers}</Stat>
        <Stat label="Baggage Capacity"
            >{aircraft.aircraftFields.stats.baggageCapacity} FT<sup>3</sup></Stat
        >
        <!-- todo: use real stat -->
        <Stat label="WiFi">Yes</Stat>

        {#each features as { title }}
            <Link
                raise
                ease
                pill
                class="feature-link flex items-center justify-between my-3 py-4 px-6 bg-white"
                href={`#${idify(title)}`}
            >
                <span class="font-display feature-link-title ease-in-out transition duration-200"
                    >{title}</span
                >
                <ChevronRight class="ml-auto w-6 h-6" />
            </Link>
        {/each}
        {#if aircraft.aircraftFields.gallery}
            <Button
                raise
                ease
                pill
                color="a-stormy-morning"
                filled
                class="hidden sm:flex my-3 py-4 px-6 w-full text-white"
                on:click={() => showGallery(0)}
                >Show Gallery <ChevronRight class="ml-auto w-6 h-6" /></Button
            >
        {/if}
        <Link
            raise
            ease
            pill
            color="a-stormy-morning"
            filled
            class="flex my-3 py-4 px-6 text-white"
            href="/contact"
        >
            Book Your Flight Today
            <ChevronRight class="ml-auto w-6 h-6" />
        </Link>
    </section>
    {#if aircraft.aircraftFields.gallery}
        <div transition:slideDiag class="h-96 sm:hidden mx-auto py-4 px-4">
            <GalleryCarousel
                bind:show={showGallery}
                class="h-full"
                gallery={aircraft.aircraftFields.gallery}
            />
        </div>
    {/if}
</div>

{#each features as item, index (idify(item.title))}
    <Anchor id={idify(item.title)} />
    <CheckerItem invert={index % 2 === 1} swap={index % 2 === 1} {...item} />
{/each}

<!-- todo: make editable  -->
<CtaBar heading="FLY WITH LATITUDE 33" link={{ title: "Book this Aircraft", href: "/contact" }}>
    <p class="mb-4 text-center">
        Latitude 33 Aviation impeccably manages one of the newest and largest fleets of over 30
        light, midsize, super-midsize, and heavy jets in North America.
        <br />
        With a variety of <a href="/experiences">experiences</a>
        and <a href="/one-ways">one-way flights</a> available, Latitude 33 Aviation is sure to elevate
        your private travels.
    </p>
</CtaBar>

<TestimonialExpose {...acfOptionsDrillDown.fleetPostTypeFields} />

<style lang="postcss">
    :global(.feature-link:hover .feature-link-title) {
        @apply text-either-gray-blue;
    }

    @screen sm {
        .stats {
            background-image: var(--bg);
        }
    }
</style>

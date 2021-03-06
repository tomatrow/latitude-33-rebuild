<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { FleetTypeOptionsFragment, AircraftFragment } from "$lib/queries/aircraft"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { loadResource, previewVariables } from "$lib/scripts/router"
    import { TripPlannerPsuedoFragment } from "$lib/components/TripPlanner/utility"

    export const load = loadResource(
        graphql`
            query AircraftPostQuery($id: ID!, $isPreview: Boolean!) {
                aircraft(id: $id, asPreview: $isPreview) {
                    ...AircraftFragment
                }
                acfOptionsDrillDown {
                    ...FleetTypeOptionsFragment
                }
                ${TripPlannerPsuedoFragment}
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
        TestimonialExpose,
        Anchor,
        CtaBar,
        GalleryCarousel,
        Button,
        Banner
    } from "$lib/components"
    import { ChevronRight } from "$lib/svgs"
    import { cssVars } from "$lib/actions/styles"
    import Stat from "./_Stat.svelte"
    import { slideDiag } from "$lib/transitions"
    import { openModal } from "$lib/components/ModalProvider.svelte"
    import BookingModal from "./_BookingModal.svelte"
    import ContentRow, { schemes } from "$lib/components/ContentRow/index.svelte"
    import Heading from "$lib/components/typography/Heading.svelte"

    export let aircraft: any
    export let acfOptionsDrillDown: any
    export let tripFleet: any
    export let tripAirports: any
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

    function handleBooking() {
        openModal(BookingModal, {
            tripFleet,
            tripAirports,
            aircraft
        })
    }
</script>

<Meta title={aircraft.title} seo={aircraft.seo} />

<Banner title={aircraft.title} backgroundImage={featuredImage}>
    <div class="flex flex-col items-start gap-[30px]">
        <Button
            class="flex-shrink-0 py-2 px-4 font-extralight uppercase inline-block"
            ease
            fill="black"
            border
            color="white"
            on:click={handleBooking}
        >
            Charter Now
        </Button>
        {#if aircraft.aircraftFields.gallery}
            <Link
                class="flex-shrink-0 py-2 px-4 font-extralight uppercase inline-block"
                ease
                fill="black"
                border
                color="white"
                href="#gallery"
            >
                Gallery
            </Link>
        {/if}
    </div>
</Banner>

<ContentRow  id="gallery" heading="Overview" scheme={schemes.grey} gallery={aircraft.aircraftFields.gallery}>
    <div class="injected-content">
        <div>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        <ul class="list-disc pl-5">
            <li>Max Range: {aircraft.aircraftFields.stats.maxRange} NM</li>
            <li>Max Cruise Speed: {aircraft.aircraftFields.stats.maxCruiseSpeed} MPH</li>
            <li>Max Passengers: {aircraft.aircraftFields.stats.maxPassengers}</li>
            <li>Baggage Capacity: {aircraft.aircraftFields.stats.baggageCapacity} FT<sup>3</sup></li>
            <li>WiFi: Yes</li>
        </ul>
    </div>
</ContentRow>

{#each features as { image, contentHtml, title, icon }, index (idify(title))}
    <Anchor id={idify(title)} />
    <!-- todo: remove fill that shows off the gallery -->
    <ContentRow line={index < features.length - 1}  gallery={_.fill(Array(index + 1), image)} {contentHtml}>
        <div class="flex gap-4 items-center" slot="heading">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img {...icon} class="h-8 brightness-[100] invert" />
            {title}
        </div>
    </ContentRow>
{/each}

<!-- todo: make editable  -->
<CtaBar heading="FLY WITH LATITUDE 33" link={{ title: "Book this Aircraft", href: "/contact" }}>
    <p class="mb-4 text-center injected-content tracking-px">
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

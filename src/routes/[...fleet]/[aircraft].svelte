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
    import { Link, Meta, CheckerItem, TestimonialExpose, Anchor } from "$lib/components"
    import { ChevronRight } from "$lib/svgs"
    import { cssVars } from "$lib/actions/styles"

    export let aircraft: any
    export let acfOptionsDrillDown: any

    const features = _.zip(
        [
            aircraft.aircraftFields.interior,
            aircraft.aircraftFields.amenities,
            aircraft.aircraftFields.avionics
        ],
        [
            {
                title: "Interior",
                icon: {
                    src: "/icons/blue-chair.png",
                    alt: "blue chair icon"
                }
            },
            {
                title: "Amenities",
                icon: {
                    src: "/icons/blue-tv.png",
                    alt: "blue tv icon"
                }
            },
            {
                title: "Avionics",
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

    const { featuredImage } = aircraft.aircraftFields

    function idify(key: string) {
        return _.kebabCase(key)
    }
</script>

<Meta title={aircraft.title} seo={aircraft.seo} />

<div
    class="stats bg-either-gray-blue sm:pb-44 sm:pt-8 sm:pl-5 bg-white sm:bg-center sm:bg-cover sm:bg-no-repeat"
    use:cssVars={{
        bg: featuredImage ? `url(${featuredImage.src})` : ""
    }}
>
    {#if featuredImage}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="sm:hidden w-full" {...featuredImage} />
    {/if}

    <section
        class="bg-opacity-70 sm:rounded-xl sm:px-9 relative sm:p-0 py-6 sm:py-16 px-5 sm:max-w-sm bg-white"
    >
        <h1 class="font-display text-3.5xl leading-9 w-3/4 text-black font-black">
            {aircraft.title}
        </h1>

        <h5 class="font-display text-either-gray-blue mt-3 font-bold text-xl">Max Range</h5>
        <span>{aircraft.aircraftFields.stats.maxRange} NM</span>

        <h5 class="font-display text-either-gray-blue mt-3 font-bold text-xl">Max Cruise Speed</h5>
        <span>{aircraft.aircraftFields.stats.maxCruiseSpeed} MPH</span>

        <h5 class="font-display text-either-gray-blue mt-3 font-bold text-xl">Max Passengers</h5>
        <span>{aircraft.aircraftFields.stats.maxPassengers}</span>

        <h5 class="font-display text-either-gray-blue mt-3 font-bold text-xl">Baggage Capacity</h5>
        <span>{aircraft.aircraftFields.stats.baggageCapacity} FT<sup>3</sup></span>

        {#each features as { title }}
            <Link
                raise
                ease
                pill
                class="feature-link flex items-center justify-between my-3 py-4 px-6 bg-white"
                href={`#${idify(title)}`}
            >
                <span
                    class="font-display feature-link-title ease-in-out transition duration-200 font-black"
                    >{title}</span
                >
                <ChevronRight class="ml-auto w-6 h-6" />
            </Link>
        {/each}
        <Link raise ease pill class="bg-either-gray-blue flex my-3 py-4 px-6 text-white" href="#">
            Book Your Flight Today
            <ChevronRight class="ml-auto w-6 h-6" />
        </Link>
    </section>
</div>

{#each features as item, index}
    <Anchor id={idify(item.title)} />
    <CheckerItem float reverse={index % 2 === 1} {...item} />
{/each}

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

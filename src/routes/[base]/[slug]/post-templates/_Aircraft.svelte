<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { FleetTypeOptionsFragment, AircraftFragment } from "$lib/queries/aircraft"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"

    export const base = "fleet"
    export const Query = graphql`
        query AircraftPostQuery($id: ID!) {
            aircraft(id: $id) {
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
    `
</script>

<script lang="ts">
    import _ from "lodash"
    import { Link } from "$lib/components"
    import { IconChevronRight } from "$lib/svgs"
    import { cssVars } from "$lib/actions/styles"

    export let aircraft: any
    export let acfOptionsDrillDown: any

    const { testimonialProof, socialProofSummary } = acfOptionsDrillDown.fleetPostTypeFields
    const { proof } = testimonialProof
    console.log({ testimonialProof, socialProofSummary })

    const features = [
        {
            title: "Interior",
            icon: {
                src: "/icons/blue-chair.png",
                alt: "blue chair icon"
            },
            ...aircraft.aircraftFields.interior
        },
        {
            title: "Amenities",
            icon: {
                src: "/icons/blue-tv.png",
                alt: "blue tv icon"
            },
            ...aircraft.aircraftFields.amenities
        },
        {
            title: "Avionics",
            icon: {
                src: "/icons/blue-jet.png",
                alt: "blue jet icon"
            },
            ...aircraft.aircraftFields.avionics
        }
    ]

    function idify(key: string) {
        return _.kebabCase(key)
    }
</script>

<svelte:head>
    <title>{aircraft.title}</title>
</svelte:head>

<div
    class="stats bg-shark space-y-6 sm:space-y-0 sm:pb-44 sm:pt-8 pb-6 sm:pl-5 sm:bg-center sm:bg-cover sm:bg-no-repeat"
    use:cssVars={{ bg: `url(${aircraft.featuredImage.node.sourceUrl})` }}
>
    {#if aircraft.featuredImage}
        <img
            class="sm:hidden w-full"
            src={aircraft.featuredImage.node.sourceUrl}
            alt={aircraft.featuredImage.node.altText}
        />
    {/if}

    <section class="rounded-xl sm:px-9 sm:p-0 pt-6 sm:py-16 px-5 sm:max-w-sm">
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
                <IconChevronRight class="ml-auto w-6 h-6" />
            </Link>
        {/each}
        <Link raise ease pill class="bg-either-gray-blue flex my-3 py-4 px-6 text-white" href="#">
            Book Your Flight Today
            <IconChevronRight class="ml-auto w-6 h-6" />
        </Link>
    </section>
</div>

{#each features as { title, icon, description, image }, index}
    <section
        class="{index % 2 === 1
            ? 'bg-either-gray-blue text-white lg:grid-flow-col-dense'
            : ''} pb-24 sm:px-5  sm:py-44 lg:py-0   lg:px-0 sm:relative space-y-6 sm:space-y-0 lg:static lg:grid lg:grid-cols-2"
        id={idify(title)}
    >
        <img
            class="sm:transform sm:rounded-3xl sm:-translate-y-1/2 sm:max-h-64 lg:transform-none lg:max-w-none sm:absolute lg:static top-0 left-0 sm:ml-5 lg:ml-0 sm:max-w-sm lg:max-h-full lg:w-full lg:h-full lg:rounded-none lg:object-cover"
            src={image.sourceUrl}
            alt={image.altText}
        />
        <div
            class:lg:col-start-1={index % 2 === 1}
            class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-5 s mx-5 sm:mx-auto lg:p-4 sm:max-w-lg"
        >
            <h3
                class="sm:col-span-full font-display text-3.5xl lg:mt-auto sm:text-center font-black"
            >
                {title}
            </h3>
            <img
                class="sm:col-start-1 h-18 w-18 sm:self-start"
                style="filter: brightness({index % 2 === 1 ? 100 : 0})"
                {...icon}
            />
            <p
                class="sm:col-start-2 sm:col-span-4 tracking-px whitespace-pre-line font-thin text-lg"
            >
                {description}
            </p>
        </div>
    </section>
{/each}

<section
    class="bg-either-gray-blue justify-items-center py-18 grid grid-cols-1 lg:grid-cols-2 gap-18 px-5 text-white"
>
    <div
        class="py-9 rounded-3xl lg:justify-self-end md:px-14 md:py-24 px-6 max-w-xl border border-white"
    >
        <h5 class="font-display font-bold text-xl">{socialProofSummary.title}</h5>
        <div class="font-display" style="font-size: 3.375rem">{socialProofSummary.rating}</div>
        <p class="mb-4">{socialProofSummary.blurb}</p>
        <div class="space-x-4">
            {#each socialProofSummary.links.map(item => item.link) as { url, title, target }}
                <Link
                    class="transition ease-in-out hover:text-pre-coffee-sky-blue font-display py-2 px-4 border border-white rounded hover:bg-white text-white font-bold text-sm"
                    href={url}
                    style="transition-duration: 0.425s"
                    {target}>{title}</Link
                >
            {/each}
        </div>
    </div>

    <div class="lg:justify-self-start max-w-lg">
        <h4 class="font-display leading-9 text-3.5xl font-black">{testimonialProof.title}</h4>
        <p>{testimonialProof.blurb}</p>
        <div
            class="border-the-girl-is-looking-at-the-sky rounded-xl mt-11 relative p-6 pt-12 border bg-white"
        >
            <img
                class="h-18 w-18 transform -translate-y-1/2 translate-x-1/3 absolute top-0 left-0 rounded-full"
                src={proof.featuredImage.node.sourceUrl}
                alt={proof.featuredImage.node.altText}
            />
            <p class="text-tinted-rear-window text-xl">{proof.testimonialPostFields.quote}</p>
            <div class="mt-4 text-black text-sm">
                {proof.testimonialPostFields.name}, {proof.testimonialPostFields.position}
            </div>
        </div>
    </div>
</section>

<style lang="postcss">
    :global(.feature-link:hover .feature-link-title) {
        @apply text-either-gray-blue;
    }

    @screen sm {
        .stats {
            background-image: var(--bg);
            section {
                background-color: rgba(255, 255, 255, 0.67);
            }
        }
    }
</style>

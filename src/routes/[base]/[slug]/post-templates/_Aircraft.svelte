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

{#if aircraft.featuredImage}
    <img
        class="w-full"
        src={aircraft.featuredImage.node.sourceUrl}
        alt={aircraft.featuredImage.node.altText}
    />
{/if}

<section class="bg-shark py-6 px-5">
    <h1 class="font-display text-3.5xl leading-9 w-3/4 text-black font-black">{aircraft.title}</h1>

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

{#each features as { title, icon, description, image }, index}
    <section
        class="{index % 2 === 1 ? 'bg-either-gray-blue text-white' : ''} pb-18 space-y-4"
        id={idify(title)}
    >
        <img src={image.sourceUrl} alt={image.altText} />
        <div class="flex items-start flex-col px-5">
            <h3 class="font-display text-3.5xl font-black">
                {title}
            </h3>
            <img
                class="h-18 w-18"
                style="filter: brightness({index % 2 === 1 ? 100 : 0})"
                {...icon}
            />
        </div>
        <p class="tracking-px px-5 whitespace-pre-line font-thin text-lg">{description}</p>
    </section>
{/each}

<section class="bg-either-gray-blue py-18 space-y-18 px-5 text-white">
    <div class="py-9 rounded-3xl px-6 border border-white">
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

    <div>
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
</style>

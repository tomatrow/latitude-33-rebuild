<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"

    export const load = loadPage(
        "Range Finder",
        graphql`
            query RangeFinderPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_RangeFinder {
                            rangeMapPageFields {
                                tripPlannerPage {
                                    ...AcfLinkFragment
                                }
                            }
                        }
                    }
                }
                fleet(first: 250, where: { status: PUBLISH }) {
                    edges {
                        node {
                            id
                            title
                            href: uri
                            aircraftFields {
                                featuredImage {
                                    ...MediaItemFragment
                                }
                                stats {
                                    maxRange
                                    maxCruiseSpeed
                                    baggageCapacity
                                    maxPassengers
                                    wifi
                                }
                            }
                            subfleets {
                                edges {
                                    node {
                                        id
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
                airports(first: 250, where: { status: PUBLISH }) {
                    edges {
                        node {
                            id
                            href: uri
                            locationPostFields {
                                name
                                coordinates {
                                    city
                                    latitude
                                    longitude
                                }
                            }
                            airportFields {
                                code
                            }
                        }
                    }
                }
            }
            ${PageFragment}
            ${MediaItemFragment}
            ${AcfLinkFragment}
        `
    )
</script>

<script lang="ts">
    import { fade } from "svelte/transition"
    import Colors from "$lib/data/colors.json"
    import { smoothEdges } from "$lib/scripts/utility"
    import { Meta, CtaBar, Banner, CollectionItem } from "$lib/components"
    import { MapsSdkLoader, isMapsLoaded, Map, Marker, Circle } from "$lib/svelte-google-maps"
    import Select from "./_Select.svelte"
    import Stat from "./_Stat.svelte"
    import { slideHorizontal } from "$lib/transitions"
    import { METERS_PER_NAUTICAL_MILE, L33_COORDINATES } from "$lib/data/constants"
    import { Bar } from "$lib/components/TripPlanner"

    export let page: any
    export let airports: any
    export let fleet: any

    let map: google.maps.Map = undefined

    const locations = smoothEdges(airports).map(({ id, href, locationPostFields }) => ({
        id,
        href,
        ...locationPostFields.coordinates,
        name: locationPostFields.name
    }))
    const planes: any[] = smoothEdges(fleet).sort(
        (left: any, right: any) =>
            left.aircraftFields.stats.maxRange - right.aircraftFields.stats.maxRange
    )

    let selectedLocation: any
    let selectedPlane: any

    const key = import.meta.env.VITE_RANGE_FINDER_MAPS_API_KEY as string

    $: console.log({ selectedLocation })

    $: if (selectedLocation) {
        map?.setCenter({
            lat: selectedLocation.latitude,
            lng: selectedLocation.longitide
        })
    }
</script>

<Meta title={page.title} seo={page.seo} />
<MapsSdkLoader {key} />

<Banner
    title={page.title}
    backgroundImage={{ src: "/images/Bombarder-Challenger-300-Type-2.jpeg" }}
>
    <p class="tracking-px font-extralight">
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nullam quis risus eget urna
        mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
        eget lacinia odio sem nec elit. Nullam id dolor id nibh ultricies vehicula ut id elit.
        Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula
        ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit.
    </p>
    <p class="font-thin text-xs">
        Based on zero winds, ISA conditions, 85% of long range cruise, 4 passengers and NBAA fuel
        and weather reserves at destination. This tool is for comparison purposes only, not for
        flight planning. Specs change without notice.
    </p>
</Banner>

<section class="md:h-[80vh] flex flex-col-reverse md:flex-row">
    {#if selectedPlane}
        <div
            transition:slideHorizontal
            class="gap-y-4 flex md:overflow-y-scroll flex-col flex-shrink-0 md:h-auto"
        >
            <CollectionItem
                class="w-full"
                title={selectedPlane.title}
                image={selectedPlane.aircraftFields.featuredImage}
                link={{ href: selectedPlane.href, title: "View Details", target: "_blank" }}
            />
            <div class="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 mx-auto p-4 max-w-md">
                <h3 class="font-display text-ripe-blueberry-indentation col-span-full text-xl">
                    Aircraft Stats
                </h3>
                <Stat label="Max Range">{selectedPlane.aircraftFields.stats.maxRange} NM</Stat>
                <Stat label="Max Cruise Speed"
                    >{selectedPlane.aircraftFields.stats.maxCruiseSpeed} MPH</Stat
                >
                <Stat label="Max Passengers"
                    >{selectedPlane.aircraftFields.stats.maxPassengers}</Stat
                >
                <Stat label="Baggage Capacity"
                    >{selectedPlane.aircraftFields.stats.baggageCapacity} FT<sup>3</sup></Stat
                >
                <Stat label="WiFi">{selectedPlane.aircraftFields.stats.wifi ? "Yes" : "No"}</Stat>
            </div>
        </div>
    {/if}

    {#if $isMapsLoaded}
        <div transition:fade class="h-96 relative w-full md:h-full">
            <Map
                bind:map
                class="w-full h-full"
                mapOptions={{
                    zoom: 5,
                    zoomControl: true,
                    center: L33_COORDINATES,
                    mapId: "df9fea49e0c79ec6",
                    fullscreenControl: false,
                    streetViewControl: false,
                    mapTypeControl: false
                }}
            >
                <div class="gap-4 absolute top-0 left-0 z-30 flex flex-col p-4">
                    <Select detailsText="Airport Details" bind:value={selectedLocation}>
                        <option value={null}>Select Airport</option>
                        {#each locations as value}
                            <option {value}>{value.name}</option>
                        {/each}
                    </Select>
                    <Select detailsText="Full Aircraft Details" bind:value={selectedPlane}>
                        <option value={null}>Select Aircraft</option>
                        {#each planes as value}
                            <option {value}>{value.title}</option>
                        {/each}
                    </Select>
                </div>
                {#each locations as location}
                    {#if !selectedLocation || selectedLocation?.id === location.id}
                        <Marker
                            center
                            options={{
                                cursor: "pointer",
                                position: { lat: location.latitude, lng: location.longitude }
                            }}
                            on:click={() => (selectedLocation = location)}
                        />
                    {/if}
                {/each}

                {#key selectedLocation || selectedPlane}
                    {#if selectedLocation && selectedPlane}
                        <Circle
                            options={{
                                strokeColor: Colors["pre-coffee-sky-blue"],
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: Colors["pre-coffee-sky-blue"],
                                fillOpacity: 0.35,
                                center: {
                                    lat: selectedLocation?.latitude,
                                    lng: selectedLocation?.longitude
                                },
                                radius:
                                    METERS_PER_NAUTICAL_MILE *
                                    (selectedPlane?.aircraftFields.stats.maxRange ?? 0)
                            }}
                        />
                    {/if}
                {/key}
            </Map>
        </div>
    {/if}
</section>

<CtaBar>
    <span class="text-xl">Trip Planner</span>
    <Bar
        class="w-full"
        successPageLink={page.template.rangeMapPageFields.tripPlannerPage}
        airports={smoothEdges(airports)}
        {fleet}
    />
</CtaBar>

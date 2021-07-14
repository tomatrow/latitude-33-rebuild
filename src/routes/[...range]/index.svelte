<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"

    export const load = loadPage(
        "Range Finder",
        graphql`
            query RangeFinderPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                }
                fleet(first: 250, where: { status: PUBLISH }) {
                    edges {
                        node {
                            id
                            title
                            href: uri
                            aircraftFields {
                                stats {
                                    maxRange
                                    maxCruiseSpeed
                                    baggageCapacity
                                    maxPassengers
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
                            airportFields {
                                coordinates {
                                    city
                                    latitude
                                    longitude
                                }
                            }
                        }
                    }
                }
            }
            ${PageFragment}
        `
    )
</script>

<script lang="ts">
    import { fade } from "svelte/transition"
    import Colors from "$lib/data/colors.json"
    import { smoothEdges } from "$lib/scripts/utility"
    import { Meta, Link, Arrow } from "$lib/components"
    import { MapsSdkLoader, isMapsLoaded, Map, Marker, Circle } from "$lib/svelte-google-maps"
    import Select from "./_Select.svelte"
    import Stat from "./_Stat.svelte"

    export let page: any
    export let airports: any
    export let fleet: any

    const locations = smoothEdges(airports).map(({ id, href, airportFields }) => ({
        id,
        href,
        ...airportFields.coordinates
    }))
    const planes: any[] = smoothEdges(fleet).sort(
        (left: any, right: any) =>
            left.aircraftFields.stats.maxRange - right.aircraftFields.stats.maxRange
    )

    let selectedLocation: any
    let selectedPlane: any

    const key = import.meta.env.VITE_RANGE_FINDER_MAPS_API_KEY as string
    const METERS_PER_NAUTICAL_MILE = 1852

    $: console.log({ selectedLocation, locations })
</script>

<Meta title={page.title} seo={page.seo} />

<h1
    class="font-display text-either-gray-blue text-3.5xl md:text-5.5xl tracking-px p-4 text-center font-extrabold"
>
    {page.title}
</h1>

<MapsSdkLoader {key} />
<section class="md:h-[80vh] flex flex-col md:flex-row">
    <div
        class="space-y-4 flex md:overflow-y-scroll items-start flex-col flex-shrink-0 p-4 md:h-auto"
    >
        <Select label="Airport:" bind:value={selectedLocation}>
            {#each locations as value}
                <option class="text-red-500" {value}>{value.city}</option>
            {/each}
        </Select>
        <Select label="Aircraft:" bind:value={selectedPlane}>
            {#each planes as value}
                <option {value}>{value.title}</option>
            {/each}
        </Select>

        <Stat label="Max Range">{selectedPlane?.aircraftFields.stats.maxRange} NM</Stat>
        <Stat label="Max Cruise Speed"
            >{selectedPlane?.aircraftFields.stats.maxCruiseSpeed} MPH</Stat
        >
        <Stat label="Max Passengers">{selectedPlane?.aircraftFields.stats.maxPassengers}</Stat>
        <Stat label="Baggage Capacity"
            >{selectedPlane?.aircraftFields.stats.baggageCapacity} FT<sup>3</sup></Stat
        >
    </div>

    {#if $isMapsLoaded}
        <div transition:fade class="h-96 w-full md:h-full">
            <Map class="w-full h-full" mapOptions={{ zoom: 2, center: { lat: 0, lng: 0 } }}>
                {#each locations as location}
                    <Marker
                        center
                        options={{
                            cursor: "pointer",
                            position: { lat: location.latitude, lng: location.longitude }
                        }}
                        on:click={() => (selectedLocation = location)}
                    />
                {/each}

                {#key selectedLocation || selectedPlane}
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
                {/key}
            </Map>
        </div>
    {/if}
</section>

<script context="module" lang="ts">
    import { graphql } from "$lib/scripts/apollo"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"
    import type { Load } from "@sveltejs/kit"
    import type { Trip } from "$lib/components/TripPlanner/index.type"
    import { previewVariables, matchResource, createPageMatcher } from "$lib/scripts/router"

    const TripPlannerAirportFragment = `
        fragment TripPlannerAirportFragment on Airport {
            id
            airportFields {
                featuredImage {
                    ...MediaItemFragment
                }
            }
            locationPostFields {
                coordinates {
                    latitude
                    longitude
                }
            }
        }
    `

    export const load: Load = async input => {
        const resource = matchResource(input, createPageMatcher("Planner"))

        if (!resource) return

        const variables = {
            departureAirportId: "",
            arrivalAirportId: "",
            skip: true
        }

        let trip: Trip
        exit: try {
            const rawTrip = input.page.query.get("trip")
            if (!rawTrip) break exit
            trip = JSON.parse(rawTrip)
            if (!trip?.departure?.airportId || !trip?.arrival?.airportId) break exit
            variables.departureAirportId = trip.departure.airportId
            variables.arrivalAirportId = trip.arrival.airportId
            variables.skip = false
        } catch (error) {
            console.error(error)
        }

        const _load = loadPage(
            "Planner",
            graphql`
                query TripPlannerPageQuery(
                    $id: ID!
                    $isPreview: Boolean!
                    $departureAirportId: ID!
                    $arrivalAirportId: ID!
                    $skip: Boolean!
                ) {
                    fleet(first: 500, where: { status: PUBLISH }) {
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
                                        maxPassengers
                                    }
                                }
                            }
                        }
                    }
                    departure: airport(id: $departureAirportId) @skip(if: $skip) {
                        ...TripPlannerAirportFragment
                    }
                    arrival: airport(id: $arrivalAirportId) @skip(if: $skip) {
                        ...TripPlannerAirportFragment
                    }
                    page(id: $id, asPreview: $isPreview) {
                        ...PageFragment
                    }
                }
                ${PageFragment}
                ${MediaItemFragment}
                ${TripPlannerAirportFragment}
            `,
            variables
        )

        const result = await _load(input)

        result.props.trip = trip

        return result
    }

    function getDistance(lat1, lon1, lat2, lon2) {
        console.log({ lat1, lon1, lat2, lon2 })
        const p = 0.017453292519943295 // Math.PI / 180
        const c = Math.cos
        const a =
            0.5 -
            c((lat2 - lat1) * p) / 2 +
            (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2

        return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
    }
</script>

<script lang="ts">
    import { CollectionGrid, CtaBar } from "$lib/components"
    import { Meta, FlexibleContent } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"
    import { METERS_PER_NAUTICAL_MILE } from "$lib/data/constants"

    export let page: any
    export let fleet: any
    export let departure: any
    export let arrival: any
    export let trip: Trip

    function getCoords(airport) {
        const { latitude, longitude } = airport.locationPostFields.coordinates
        return [latitude, longitude]
    }

    let notFound = false

    function mapAircraft({ title, aircraftFields, href }) {
        return {
            title,
            image: aircraftFields.featuredImage,
            link: {
                title: "View Now",
                href
            }
        }
    }

    function filterFleet(departure, arrival, fleet) {
        const distance = getDistance(...getCoords(departure), ...getCoords(arrival))
        const all = smoothEdges(fleet)
        const filtered = all.filter(
            ({ aircraftFields }) =>
                distance < aircraftFields.stats.maxRange * METERS_PER_NAUTICAL_MILE &&
                trip.passengers <= aircraftFields.stats.maxPassengers
        )

        return {
            all: all.map(mapAircraft),
            filtered: filtered.map(mapAircraft)
        }
    }

    let items: any[]
    $: {
        const { all, filtered } = filterFleet(departure, arrival, fleet)
        notFound = filtered.length === 0
        items = notFound ? all : filtered
    }
</script>

<Meta title={page.title} seo={page.seo} />

<h1 class="font-display my-4 text-center text-2xl">
    {#if notFound}
        Browse our collection:
        <!-- todo: something better  -->
    {:else}
        Here's what we found:
    {/if}
</h1>

<CollectionGrid {items} />

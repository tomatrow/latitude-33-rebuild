<script context="module" lang="ts">
    import { graphql } from "$lib/scripts/apollo"
    import { MediaItemFragment } from "$lib/queries/utility"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"
    import type { Load } from "@sveltejs/kit"
    import type { Trip } from "$lib/components/TripPlanner/index.type"
    import { matchResource, createPageMatcher } from "$lib/scripts/router"
    import { DealsPseduoFragment, AirportDealsFragment } from "$lib/queries/deals"
    import { browser } from "$app/env"

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
            if (!browser) break exit
            const rawTrip = input.page.query.get("trip")
            if (!rawTrip) break exit
            trip = JSON.parse(rawTrip)

            if (!trip?.departureAirportId || !trip?.arrivalAirportId) break exit
            variables.departureAirportId = trip.departureAirportId
            variables.arrivalAirportId = trip.arrivalAirportId
            variables.skip = false
        } catch (error) {
            console.error(error)
        }

        console.log({ trip })

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
                    ${DealsPseduoFragment}
                }
                ${PageFragment}
                ${MediaItemFragment}
                ${TripPlannerAirportFragment}
                ${AirportDealsFragment}
            `,
            variables
        )

        const result = await _load(input)

        result.props.trip = trip

        return result
    }

    function getDistance(lat1, lon1, lat2, lon2) {
        if ([lat1, lon1, lat2, lon2].some(x => !x && x !== 0)) return undefined

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
    import { CollectionGrid, Meta, DealsGrid } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"
    import { METERS_PER_NAUTICAL_MILE } from "$lib/data/constants"

    export let page: any
    export let fleet: any
    export let departure: any
    export let arrival: any
    export let trip: Trip
    export let deals: any[]
    let items: any[]
    let notFound: boolean

    function getCoords(airport) {
        const { latitude, longitude } = airport.locationPostFields.coordinates
        return [latitude, longitude]
    }

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
        console.log({ TTT: trip })
        const all = fleet ? smoothEdges(fleet) : []
        let filtered = []
        if (departure && arrival && trip) {
            const distance = getDistance(...getCoords(departure), ...getCoords(arrival))
            filtered = all.filter(
                ({ aircraftFields }) =>
                    distance < aircraftFields.stats.maxRange * METERS_PER_NAUTICAL_MILE &&
                    trip.passengers <= aircraftFields.stats.maxPassengers
            )
        }

        return {
            all: all.map(mapAircraft),
            filtered: filtered.map(mapAircraft)
        }
    }

    $: {
        const { all, filtered } = filterFleet(departure, arrival, fleet)
        notFound = filtered.length === 0
        items = notFound ? all : filtered
    }

    const labels = {
        title: "Featured One-Way Deals",
        subheading:
            "Thank you for submitting your request, our team will reach out to you shortly.",
        dealLabels: {
            passengersPrefix: "Seats",
            costPostfix: "(+tax)",
            phone: {
                number: "100",
                labelHtml: "Call 1-800-840-0310 to Reserve Your Flight"
            }
        }
    }
</script>

<Meta title={page.title} seo={page.seo} />

{#if trip}
    <DealsGrid {deals} {...labels} />
{/if}

<strong class="font-display text-tinted-rear-window block mt-8 text-center text-base"
    >Here's what we found:</strong
>
<h2 class="font-display text-a-stormy-morning mt-8 mb-12 text-center font-light text-5xl">
    Featured Aircraft with capacity for at least {trip?.passengers ?? 1} passengers
</h2>

<CollectionGrid {items} />

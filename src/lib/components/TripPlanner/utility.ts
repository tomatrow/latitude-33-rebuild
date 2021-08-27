import type { Trip } from "./index.type"
import { browser } from "$app/env"

export function getTripUrl(trip: Trip, successHref: string) {
    if (!browser || !trip) return
    try {
        const url = new URL(successHref, window.location.href)
        const rawTrip = JSON.stringify(trip)
        url.searchParams.append("trip", rawTrip)
        return url.toString()
    } catch (error) {
        console.error(error)
    }
}

   export const getMaxPassengers = fleet => fleet.edges.reduce(
        (acc: number, { node }) => Math.max(acc, node.aircraftFields.stats.maxPassengers),
        1
    )

export const TripPlannerPsuedoFragment = `
    tripFleet: fleet(first: 500, where: { status: PUBLISH}) {
        edges {
            node {
                aircraftFields {
                    stats {
                        maxPassengers
                    }
                }
            }
        }
    }
    tripAirports: airports(first: 250, where: { status: PUBLISH }) {
        edges {
            node {
                id
                href: uri
                locationPostFields {
                    name
                }
                airportFields {
                   code
                }
            }
        }
    }
`

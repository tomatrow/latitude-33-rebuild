<script lang="ts">
    import numeral from "numeral"
    import { Link } from "$lib/components"

    export let cost: number
    export let craft: any
    export let date: string
    export let end: any
    export let start: any

    function formatAirport(port: any) {
        const { city, stateShort } = port.airportFields.coordinates
        return city + ", " + stateShort
    }
</script>

<div class="bg-either-gray-blue rounded-md p-2">
    <div class="sm:p-9 space-y-2 flex items-start flex-col p-4 h-full rounded-lg bg-white">
        <div class="bg-either-gray-blue inline-flex items-center justify-center rounded-full">
            <img class="w-18 h-18 brightness-[100]" alt="plane" src="/icons/blue-plane.png" />
        </div>
        <h2 class="font-display text-either-gray-blue font-bold text-3xl">
            {date}: {formatAirport(start)} — {formatAirport(end)}
        </h2>
        <strong class="text-sm">{"$" + numeral(cost).format("0,0")} (+tax)</strong>
        <strong class="text-sm" style="margin-bottom: 1rem"
            >{craft.title} - Seats {craft.aircraftFields.stats.maxPassengers}</strong
        >
        <Link
            filled
            pill
            style="margin-top: auto"
            class="font-display inline-block mx-auto py-3 px-6 text-center font-bold text-sm"
            color="a-taste-of-blueberries"
            href="tel:1-800-840-0310 ">Call 1-800-840-0310 <br /> to Reserve Your Flight</Link
        >
    </div>
</div>

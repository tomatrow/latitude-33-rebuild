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

<div>
    {date}: {formatAirport(start)} -> {formatAirport(end)}
    <br />
    {"$" + numeral(cost).format("0,0")}
    <br />
    <Link href="tel:1-800-840-0310 ">Call 1-800-840-0310 to Reserve Your Flight</Link>
</div>

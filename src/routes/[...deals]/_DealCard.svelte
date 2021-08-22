<script lang="ts">
    import numeral from "numeral"
    import { Link } from "$lib/components"

    export let cost: number
    export let craft: any
    export let date: string
    export let end: any
    export let start: any

    export let passengersPrefix: string
    export let costPostfix: string
    export let phone: { labelHtml: string; number: string }

    function formatAirport(port: any) {
        const { city, stateShort } = port.locationPostFields.coordinates
        return city + ", " + stateShort
    }
</script>

<div class="sm:p-9 space-y-2 flex items-start flex-col p-4 rounded-lg bg-white shadow-xl">
    <div class="bg-a-stormy-morning inline-flex items-center justify-center rounded-full">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="w-18 h-18 rounded-full object-cover" {...craft.aircraftFields.featuredImage} />
    </div>
    <h2 class="font-display text-a-stormy-morning text-3xl">
        {date} <br />
        {formatAirport(start)} — {formatAirport(end)}
    </h2>
    <span class="text-sm"
        >{craft.title} - {passengersPrefix} {craft.aircraftFields.stats.maxPassengers}</span
    >
    <span style="margin-bottom: 2rem" class="font-display text-lg"
        >{"$" + numeral(cost).format("0,0")} {costPostfix}</span
    >
    <Link
        filled
        pill
        style="margin-top: auto"
        class="font-display inline-block mx-auto py-3 px-6 text-center text-sm"
        color="velours-bleu"
        href="tel:{phone.number}">{@html phone.labelHtml}</Link
    >
</div>

<script lang="ts">
    import numeral from "numeral"
    import ContentCard from "$lib/components/ContentCard/index.svelte"

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

<ContentCard
    class="min-h-[500px]"
    image={end.airportFields.featuredImage}
    link={{ href: "tel:{phone.number}", title: `${phone.labelHtml}` }}
>
    <svelte:fragment slot="heading">
        {formatAirport(start)} — <br />
        {formatAirport(end)}
    </svelte:fragment>
    <div class="flex flex-col text-tiny font-display uppercase tracking-2px gap-[10px]">
        <span>{"$" + numeral(cost).format("0,0")} {costPostfix}</span>
        <span class="font-extralight">
            {date} <br />
            {craft.title} — <br />
            {passengersPrefix}
            {craft.aircraftFields.stats.maxPassengers}
        </span>
    </div>
    <svelte:fragment slot="link">
        {@html phone.labelHtml}
    </svelte:fragment>
</ContentCard>

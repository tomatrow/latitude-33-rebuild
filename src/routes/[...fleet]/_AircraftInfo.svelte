<script lang="ts">
    export let title: string 
    export let stats: Record<string, any>

    function inches(length: number) {
        const feet = Math.floor(length)
        const inches = Math.round((length - feet) * 12)
        return `${feet}″` + (inches !== 0 ? ` ${inches}′` : '')
    }
</script>

<span class="tracking-2px font-extralight font-display uppercase text-engineer-black text-tiny">The {title} is the ultimate combination of elegance and efficiency.</span>
<ul class="list-disc pl-6 text-sm font-thin text-dark-charcoal mb-[20px]">
    <li>Max Passengers: {stats.maxPassengers}</li>
    <li>Max Range: {stats.maxRange} NM</li>
    <li>Baggage Capacity: {stats.baggageCapacity} ft<sup>3</sup></li>
    <li>Cabin Dimensions: {inches(stats.height)}H x {inches(stats.width)}W x {inches(stats.length)}L</li>
</ul>
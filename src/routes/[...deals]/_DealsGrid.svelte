<script lang="ts">
    import { smoothEdges } from "$lib/scripts/utility"
    import DealCard from "./_DealCard.svelte"

    export let deals: any[]
</script>

<section class="flex items-center flex-col py-8 sm:py-12 px-5 sm:px-6">
    <strong class="font-display text-tinted-rear-window text-sm">Need a Quick Getaway?</strong>
    <h2 class="font-display text-either-gray-blue mt-8 mb-12 text-center font-bold text-5xl">
        Available One-Way Flights
    </h2>

    <div class="grid grid-custom gap-6">
        {#each smoothEdges(deals) as { dealFields }}
            <DealCard {...dealFields} />
        {/each}
    </div>
</section>

<script lang="ts">
    import { smoothEdges } from "$lib/scripts/utility"
    import DealCard from "./DealCard.svelte"

    export let title: string
    export let subheading: string
    export let deals: any[]
    export let dealLabels: any
</script>

<section class="flex items-center flex-col py-8 sm:py-12 px-5 sm:px-6">
    <strong class="font-display text-tinted-rear-window text-base">{subheading}</strong>
    <h2 class="font-display text-a-stormy-morning mt-8 mb-12 text-center font-light text-5xl">
        {title}
    </h2>

    <div class="grid grid-custom gap-4 w-full">
        {#each smoothEdges(deals) as { dealFields }}
            <DealCard {...{ ...dealFields, ...dealLabels }} />
        {/each}
    </div>
</section>

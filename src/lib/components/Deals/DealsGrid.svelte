<script lang="ts">
    import { smoothEdges } from "$lib/scripts/utility"
    import DealCard from "./DealCard.svelte"
    import Heading, { increment } from "$lib/components/typography/Heading.svelte"

    increment()

    export let title: string
    export let subheading: string
    export let deals: any[]
    export let dealLabels: any
</script>

<section class="flex items-center flex-col py-8 sm:py-12 px-5 sm:px-6">
    <span class="font-display text-tinted-rear-window text-base">{subheading}</span>
    <Heading large class="text-a-stormy-morning my-[10px]">{title}</Heading>

    <div class="grid grid-custom gap-4 w-full">
        {#each smoothEdges(deals) as { dealFields }}
            <DealCard {...{ ...dealFields, ...dealLabels }} />
        {/each}
    </div>
</section>

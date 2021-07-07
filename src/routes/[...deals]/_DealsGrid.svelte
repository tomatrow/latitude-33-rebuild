<script lang="ts">
    import { smoothEdges } from "$lib/scripts/utility"
    import DealCard from "./_DealCard.svelte"

    export let deals: any[]
</script>

<section class="grid grid-custom">
    {#each smoothEdges(deals) as { dealFields }}
        <DealCard {...dealFields} />
    {/each}
</section>

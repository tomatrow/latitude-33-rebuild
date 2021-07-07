<script lang="ts">
    import numeral from "numeral"
    import Pill from "./_Pill.svelte"

    export let title: string
    export let labels: any[]
    export let stats: any[]
</script>

<section class="bg-either-gray-blue py-18 space-y-8 lg:py-24 px-6">
    <h2 class="font-display text-4.5xl text-white font-bold">{title}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each Object.entries(stats).filter(([key]) => key !== "__typename") as [key, value]}
            <Pill class="py-4.5 text-either-gray-blue px-4 bg-white">
                <svelte:fragment slot="label">{labels[key]}</svelte:fragment>
                {#if typeof value === "number"}
                    {numeral(value).format("0,0")}
                {:else}
                    {value}
                {/if}
            </Pill>
        {/each}
    </div>
</section>

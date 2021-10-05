<script lang="ts">
    import numeral from "numeral"
    import ContentRow from "$lib/components/ContentRow/index.svelte"

    export let title: string
    export let labels: any[]
    export let stats: any[]
</script>

<ContentRow heading={title}>
    <div class="injected-content">
        <div>Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</div>
        <ul class="pl-5 list-disc">
            {#each Object.entries(stats).filter(([key]) => key !== "__typename") as [key, value]}
                <li>
                    {labels[key]}:
                    {#if typeof value === "number"}
                        {numeral(value).format("0,0")}
                    {:else}
                        {value}
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
</ContentRow>

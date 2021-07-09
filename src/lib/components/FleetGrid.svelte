<script lang="ts">
    import Grid from "./16x9Grid.svelte"
    import { prefetch } from "$app/navigation"
    import Card from "./Card.svelte"

    export let fleet = []
    export let linkTitle: string
</script>

<Grid let:containerClasses length={fleet.length} let:createChildClasses>
    <section class={containerClasses} {...$$restProps}>
        {#each fleet as { title, href, aircraftFields }, index}
            <div class={createChildClasses(index)} on:mouseover={() => prefetch(href)}>
                <Card
                    class="h-[32rem]"
                    {title}
                    {href}
                    {linkTitle}
                    src={aircraftFields.featuredImage?.src}
                />
            </div>
        {/each}
    </section>
</Grid>

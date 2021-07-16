<script lang="ts">
    import Grid from "$lib/components/16x9Grid.svelte"
    import CollectionItem from "$lib/components/CollectionItem.svelte"
    import type { AcfImage, AcfLink } from "$lib/index.type"

    let clazz = ""
    export { clazz as class }

    export let items: { title: string; image?: AcfImage; link: AcfLink }[] = []
</script>

<Grid let:containerClasses length={items.length} let:createChildClasses>
    {#if items.length > 0}
        <section class="{containerClasses} {clazz}" {...$$restProps}>
            {#each items as item, index}
                <div class="{createChildClasses(index)} h-[32rem]">
                    <CollectionItem {...item} />
                </div>
            {/each}
        </section>
    {:else}
        <slot name="empty" />
    {/if}
</Grid>

<script lang="ts">
    import { smoothEdges } from "$lib/scripts/utility"
    import { CollectionGrid, CtaBar, Filter, NumberFieldset } from "$lib/components"
    import { filterRanges } from "../[...fleet]/_FleetFilter.svelte"

    export let properties = []
    export let ctaBar: any
    export let gridLinkLabel: string
    export let noResultsLabel: string
    export let landingsLabel: string
    export let ttafLabel: string

    function filter(filterSettings: any, items: any[]) {
        const result = smoothEdges(items)

        return result
            .filter(({ propertyFields }) =>
                filterRanges({ item: propertyFields.stats, ranges: filterSettings })
            )
            .map(({ href, propertyFields }) => ({
                title: propertyFields.info.name,
                image: propertyFields.info.featuredImage,
                link: {
                    href,
                    title: gridLinkLabel
                }
            }))
    }
</script>

<Filter {filter} items={properties} let:filtered let:show>
    <svelte:fragment slot="fields">
        <NumberFieldset name="landings">{landingsLabel}</NumberFieldset>
        <NumberFieldset name="ttaf">{ttafLabel}</NumberFieldset>
    </svelte:fragment>

    <CollectionGrid items={filtered}>
        <div
            class="sm:py-18 font-display py-8 px-5 text-black text-center font-bold text-2xl"
            slot="empty"
        >
            {noResultsLabel}
        </div>
    </CollectionGrid>
    <CtaBar {...ctaBar} on:click={show} />
</Filter>

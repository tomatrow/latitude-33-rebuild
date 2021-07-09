<script lang="ts">
    import { smoothEdges } from "$lib/scripts/utility"
    import { CollectionGrid, CtaBar, Filter, NumberFieldset } from "$lib/components"
    import { filterRanges } from "../[...fleet]/_FleetFilter.svelte"

    export let properties = []
    export let ctaBar: any
    export let gridLinkLabel: string

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
        <NumberFieldset name="landings">Landings</NumberFieldset>
        <NumberFieldset name="ttaf">TTAF</NumberFieldset>
    </svelte:fragment>

    <CtaBar {...ctaBar} on:click={show} />
    <CollectionGrid items={filtered}>
        <div
            class="sm:py-18 font-display py-8 px-5 text-black text-center font-bold text-2xl"
            slot="empty"
        >
            We have “0” aircraft matching your filters
        </div>
    </CollectionGrid>
</Filter>

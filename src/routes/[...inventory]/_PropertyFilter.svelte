<script lang="ts">
    import { smoothEdges } from "$lib/scripts/utility"
    import { CollectionGrid, CtaBar, Filter, NumberFieldset } from "$lib/components"

    export let properties = []
    export let ctaBar: any
    export let gridLinkLabel: string

    function filter(filterSettings: any, items: any[]) {
        const result = smoothEdges(items)

        return result
            .filter(({ propertyFields }) => {
                return Object.entries(filterSettings).every(([key, { min, max }]) => {
                    const value = propertyFields.stats[key]

                    if (min !== undefined && value < min) return false
                    if (max !== undefined && value > max) return false

                    return true
                })
            })
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
    <CollectionGrid items={filtered} />
</Filter>

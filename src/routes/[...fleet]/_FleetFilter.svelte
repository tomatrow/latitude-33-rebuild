<script lang="ts" context="module">
    export function fleetFormat({ title, href, aircraftFields }: any, gridLinkLabel: string) {
        return {
            title,
            image: aircraftFields.featuredImage,
            link: {
                title: gridLinkLabel,
                href
            }
        }
    }

    export function filterRanges({ item, ranges }) {
        return Object.entries(ranges).every(([key, { min, max }]) => {
            const value = item[key]

            if (min !== undefined && value < min) return false
            if (max !== undefined && value > max) return false

            return true
        })
    }
</script>

<script lang="ts">
    import { smoothEdges } from "$lib/scripts/utility"
    import { CollectionGrid, CtaBar, Filter, NumberFieldset, Anchor } from "$lib/components"

    export let fleet = []
    export let ctaBar: any
    export let gridLinkLabel: string

    function filter(filterSettings: any, fleet: any[]) {
        let result = smoothEdges(fleet)
        if (!filterSettings) return result

        return result
            .filter(({ aircraftFields }) =>
                filterRanges({ item: aircraftFields.stats, ranges: filterSettings })
            )
            .map(aircraft => fleetFormat(aircraft, gridLinkLabel))
    }
</script>

<Filter {filter} items={fleet} let:filtered let:show>
    <svelte:fragment slot="fields">
        <!-- todo: make these prefixes editable -->
        <NumberFieldset name="maxPassengers">Passenger Capacity</NumberFieldset>
        <NumberFieldset name="baggageCapacity">
            Baggage Capacity FT<sup>3</sup>
        </NumberFieldset>
    </svelte:fragment>

    <Anchor id="fleet" />
    <CollectionGrid items={filtered}>
        <div
            class="sm:py-18 font-display py-8 px-5 text-black text-center font-bold text-2xl"
            slot="empty"
        >
            <!-- todo: make this message editable -->
            We have “0” aircraft matching your filters
        </div>
    </CollectionGrid>
    <CtaBar {...ctaBar} on:click={show} />
</Filter>

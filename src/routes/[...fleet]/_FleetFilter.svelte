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
            .filter(({ aircraftFields }) => {
                return Object.entries(filterSettings).every(([key, { min, max }]) => {
                    const value = aircraftFields.stats[key]

                    if (min !== undefined && value < min) return false
                    if (max !== undefined && value > max) return false

                    return true
                })
            })
            .map(aircraft => fleetFormat(aircraft, gridLinkLabel))
    }
</script>

<Filter {filter} items={fleet} let:filtered let:show>
    <svelte:fragment slot="fields">
        <NumberFieldset name="maxRange">Range NM</NumberFieldset>
        <NumberFieldset name="maxCruiseSpeed">Cruise Speed MPH</NumberFieldset>
        <NumberFieldset name="maxPassengers">Passenger Capacity</NumberFieldset>
        <NumberFieldset name="baggageCapacity">
            Baggage Capacity FT<sup>3</sup>
        </NumberFieldset>
    </svelte:fragment>

    <CtaBar {...ctaBar} on:click={show} />
    <Anchor id="#fleet" />
    <CollectionGrid items={filtered} />
</Filter>

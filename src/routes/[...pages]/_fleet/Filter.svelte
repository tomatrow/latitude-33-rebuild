<script lang="ts">
    import { createForm } from "felte"
    import { fly } from "svelte/transition"
    import { onMount, tick } from "svelte"
    import { smoothEdges } from "$lib/scripts/utility"
    import { Button, FleetGrid } from "$lib/components"
    import { Cross } from "$lib/svgs"
    import Fieldset from "./Fieldset.svelte"

    export let fleet = []
    export let ctaBar
    export let gridLinkLabel: string

    const { form, data, reset, setFields } = createForm({})

    function filterByStats(filterSettings) {
        let result = smoothEdges(fleet)
        if (!filterSettings) return result

        return result.filter(({ aircraftFields }) => {
            return Object.entries(filterSettings).every(([key, { min, max }]) => {
                const value = aircraftFields.stats[key]

                if (min !== undefined && value < min) return false
                if (max !== undefined && value > max) return false

                return true
            })
        })
    }

    $: filteredFleet = filterByStats($data)

    let filtering = false
    let persistedData

    async function show() {
        filtering = true
        await tick()
        setFields(persistedData)
    }

    function hide() {
        persistedData = $data
        filtering = false
    }
</script>

{#if filtering}
    <section
        class="space-y-2 bg-either-gray-blue fixed top-0 left-0 z-50 overflow-y-scroll p-4 w-full h-screen max-w-lg max-h-screen sm:w-auto text-white"
        transition:fly={{
            delay: 0,
            duration: 500,
            x: -600,
            y: 0
        }}
    >
        <Button shadow on:click={hide}>
            <Cross
                class="absolute top-0 right-0 m-4 w-10 h-10 text-white fill-current"
                fill="currentColor"
                strokeWidth={1}
            />
        </Button>
        <form use:form class="space-y-4">
            <Fieldset name="maxRange">Range NM</Fieldset>
            <Fieldset name="maxCruiseSpeed">Cruise Speed MPH</Fieldset>
            <Fieldset name="maxPassengers">Passenger Capacity</Fieldset>
            <Fieldset name="baggageCapacity">
                Baggage Capacity FT<sup>3</sup>
            </Fieldset>

            <Button class="py-2 px-4 border border-white" on:click={reset}>Reset</Button>
        </form>
    </section>
{/if}

<section class="font-display bg-sarcastic-orange space-y-4 py-10 px-12 text-white text-center">
    <h5 class="tracking-px font-bold text-xl">{ctaBar.heading}</h5>
    <Button
        ease
        shadow
        blob
        class="py-4 px-16 border-2 border-white font-semibold text-2xl"
        on:click={show}>{ctaBar.buttonLabel}</Button
    >
</section>

<FleetGrid id="#fleet" fleet={filteredFleet} linkTitle={gridLinkLabel} />

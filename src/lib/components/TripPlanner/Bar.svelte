<script lang="ts">
    import { createForm } from "felte"
    import { createValidator } from "@felte/validator-superstruct"
    import { object, string, size, refine, number } from "superstruct"
    import reporter from "@felte/reporter-cvapi"
    import { Button } from "$lib/components"
    import LocationFieldSet from "./LocationFieldSet.svelte"
    import { goto } from "$app/navigation"
    import { parse } from "date-fns"
    import { trip } from "./stores"
    import type { AcfLink } from "$lib/index.type"
    import type { Trip } from "./index.type"

    const DateInput = refine(string(), "DateInput", value => {
        const inputFormat = "yyyy-MM-dd"
        if (value?.length !== inputFormat.length) return false
        try {
            parse(value, inputFormat, new Date())
            return true
        } catch (error) {
            return false
        }
    })

    let clazz = ""
    export { clazz as class }
    export let airports: any[]
    export let fleet: any[]
    export let successPageLink: AcfLink

    const maxPassengers = fleet.edges.reduce(
        (acc, { node }) => Math.max(acc, node.aircraftFields.stats.maxPassengers),
        1
    )

    const { form, data } = createForm<Trip>({
        extend: [createValidator(() => "Enter a value"), reporter],
        validateStruct: object({
            departure: object({
                airportId: size(string(), 1, Infinity),
                date: DateInput
            }),
            arrival: object({
                airportId: size(string(), 1, Infinity),
                date: DateInput
            }),
            passengers: size(number(), 1, maxPassengers)
        }),

        async onSubmit(submission) {
            try {
                const urlString = getTripUrl(submission)
                if (urlString) await goto(urlString)
            } catch (error) {
                console.error(error)
            }
        }
    })

    function getTripUrl(trip: Trip) {
        try {
            const url = new URL(successPageLink.href, window.location.href)
            const rawTrip = JSON.stringify(trip)
            url.searchParams.append("trip", rawTrip)
            return url.toString()
        } catch (error) {
            console.error(error)
        }
    }

    function separate(data: any) {
        const departureId = data.departure?.airportId
        let arrivalId = data.arrival?.airportId

        if (arrivalId === departureId)
            arrivalId = airports.find(airport => airport.id !== departureId)?.id

        const filterAirports = (id: string) => airports.filter(airport => airport.id !== id)

        return { departure: filterAirports(arrivalId), arrival: filterAirports(departureId) }
    }

    $: availableAirports = separate($data)
    $: if ($data) {
        const urlString = getTripUrl($data)
        if (urlString) console.log({ urlString, data: $data })
    }
</script>

<form use:form id="trip-planner-form" class="{clazz} grid grid-cols-1 lg:grid-cols-2 gap-4">
    <label class="col-span-full flex items-start flex-col sm:flex-row rounded">
        <span class="w-32 font-light">Passengers</span>
        <input
            class="bg-opacity-20 p-2 rounded bg-white text-white"
            type="number"
            name="passengers"
            min="1"
            value={1}
            placeholder="Passengers"
            max={maxPassengers}
        />
    </label>

    <LocationFieldSet
        name="departure"
        title="Departure"
        airports={availableAirports.departure}
        max={$data.arrival?.date}
    />

    <LocationFieldSet
        name="arrival"
        title="Arrival"
        airports={availableAirports.arrival}
        min={$data.departure?.date}
    />

    <Button
        shadow
        border
        ease
        pill
        class="col-span-full justify-self-center py-2 px-4 font-light"
        type="submit"
        title="Submit"
    />
</form>

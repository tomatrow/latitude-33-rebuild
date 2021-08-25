<script lang="ts" context="module">
    const textStyle = {
        rootProps: { class: "flex items-start flex-col" },
        class: "bg-opacity-20 p-2 rounded bg-white text-white placeholder-white placeholder-opacity-50"
    }
</script>

<script lang="ts">
    import { createForm } from "felte"
    import { createValidator } from "@felte/validator-superstruct"
    import { object, string, size, refine, number } from "superstruct"
    import reporter from "@felte/reporter-cvapi"
    import { Button, Field } from "$lib/components"
    import AirportSelect from "./AirportSelect.svelte"
    import { goto } from "$app/navigation"
    import { parse } from "date-fns"
    import { trip } from "./stores"
    import type { AcfLink } from "$lib/index.type"
    import type { Trip } from "./index.type"
    import { browser } from "$app/env"
    import { format } from "date-fns"

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
    const nonEmptyString = size(string(), 1, Infinity)

    const { form, data } = createForm<Trip>({
        extend: [createValidator(() => "Enter a value"), reporter],
        validateStruct: object({
            departureAirportId: nonEmptyString,
            arrivalAirportId: nonEmptyString,
            departureDate: DateInput,
            passengers: size(number(), 1, maxPassengers),
            name: nonEmptyString,
            email: nonEmptyString,
            phone: nonEmptyString
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
        if (!browser || !trip) return
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
        const departureId = data.departureAirportId
        let arrivalId = data.arrivalAirportId

        if (arrivalId === departureId)
            arrivalId = airports.find(airport => airport.id !== departureId)?.id

        const filterAirports = (id: string) => airports.filter(airport => airport.id !== id)

        return { departure: filterAirports(arrivalId), arrival: filterAirports(departureId) }
    }

    $: availableAirports = separate($data)
    $: urlString = getTripUrl($data)
</script>

<div
    class="{clazz} grid grid-cols-1 place-content-center md:grid-cols-2 gap-18 items-center justify-center"
>
    <h3 class="md:col-start-2 col-span-full text-center md:text-left text-3xl">Trip Planner</h3>

    <!-- svelte-ignore a11y-missing-attribute -->
    <img
        class="rounded-2xl border-opacity-80 mx-auto md:mr-0 w-full max-w-sm border border-white"
        src="/images/08-Minimizing-Costs.jpeg"
    />

    <form use:form id="trip-planner-form" class="gap-4 flex items-start flex-col mx-auto md:ml-0">
        <Field {...textStyle} required type="text" placeholder="Name" name="name">
            <span class="font-light">Name:</span>
        </Field>
        <Field {...textStyle} required type="email" placeholder="Contact Email" name="email">
            <span class="font-light">Contact Email:</span>
        </Field>
        <Field {...textStyle} required type="tel" placeholder="Contact Phone" name="phone">
            <span class="font-light">Contact Phone:</span>
        </Field>

        <h4 class="font-light text-lg">Trip Details</h4>

        <Field
            {...textStyle}
            required
            type="number"
            name="passengers"
            min={1}
            value={1}
            placeholder="Passengers"
            max={maxPassengers}
        >
            <span class="font-light">Passengers:</span>
        </Field>

        <Field
            required
            type="date"
            name="departureDate"
            placeholder="YYYY-MM-DD"
            value={format(new Date(), "yyyy-MM-dd")}
            {...textStyle}
        >
            <span class="font-light">Departure Date:</span>
        </Field>

        <AirportSelect
            label="Departure Airport:"
            name="departureAirportId"
            airports={availableAirports.departure}
        />

        <AirportSelect
            label="Arrival Airport:"
            name="arrivalAirportId"
            airports={availableAirports.arrival}
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
</div>

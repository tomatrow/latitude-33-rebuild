<script lang="ts" context="module">
    const baseStyle = {
        class: "bg-opacity-20 p-2 rounded bg-white text-white placeholder-white placeholder-opacity-50"
    }
    const textStyle = {
        ...baseStyle,
        rootProps: { class: "flex flex-col w-full" },
    }
    const nonTextStyle = {
        ...baseStyle,
        rootProps: { class: "flex flex-col items-start" },
    }
    
    export const key = Symbol("Form Key")
</script>

<script lang="ts">
    import { createForm } from "felte"
    import { createValidator } from "@felte/validator-superstruct"
    import { object,  size, number } from "superstruct"
    import reporter from "@felte/reporter-cvapi"
    import { Button, Field } from "$lib/components"
    import AirportSelects from "./AirportSelects.svelte"
    import { goto } from "$app/navigation"
    import type { AcfLink } from "$lib/index.type"
    import type { Trip } from "./index.type"
    
    import { format } from "date-fns"
    import { DateInput, nonEmptyString } from "./felte"
    import { getTripUrl, getMaxPassengers } from "./utility"
    

    let clazz = ""
    export { clazz as class }
    export let airports: any[]
    export let fleet: any
    export let successPageLink: AcfLink

    const maxPassengers = getMaxPassengers(fleet)
    
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
                const urlString = getTripUrl(submission, successPageLink.href)
                if (urlString) await goto(urlString)
            } catch (error) {
                console.error(error)
            }
        }
    })

    export let id: string
</script>

<form use:form {id} class="text-white gap-4 flex items-start flex-col {clazz}">
    <slot name="title">
        <h3 class="md:col-start-2 col-span-full text-center md:text-left text-3xl">Trip Planner</h3>
    </slot>
    
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
        {...nonTextStyle}
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
        {...nonTextStyle}
    >
        <span class="font-light">Departure Date:</span>
    </Field>

    <AirportSelects {airports}
            bind:departureAirportId={$data.departureAirportId}
            bind:arrivalAirportId={$data.arrivalAirportId}
        selectProps={{ selectClass:"bg-opacity-20 overflow-ellipsis overflow-hidden py-2 px-4 w-full max-w-full sm:w-auto bg-white text-white appearance-none",
        rootClass:"flex w-full flex-col",
        labelClass:"font-light" }} />
        
    <slot />

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
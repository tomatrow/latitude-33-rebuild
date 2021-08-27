<script lang="ts">
    import AirportSelect from "./AirportSelect.svelte"
    
    export let airports
    let departureAirportId
    let arrivalAirportId

    function separate(departureAirportId, arrivalAirportId, airports: any[]) {
        const departureId = departureAirportId
        let arrivalId = arrivalAirportId

        if (arrivalId === departureId)
            arrivalId = airports.find(airport => airport.id !== departureId)?.id

        const filterAirports = (id: string) => airports.filter(airport => airport.id !== id)

        return { departure: filterAirports(arrivalId), arrival: filterAirports(departureId) }
    }

    $: availableAirports = separate(departureAirportId, arrivalAirportId, airports)
    
    export let selectProps = {}
</script>

<AirportSelect
    label="Departure Airport:"
    name="departureAirportId"
    airports={availableAirports.departure}
    {...selectProps}
/>

<AirportSelect
    label="Arrival Airport:"
    name="arrivalAirportId"
    airports={availableAirports.arrival}
    {...selectProps}
/>
<script lang="ts">
    import Form from "$lib/components/TripPlanner/Form.svelte"
    import ModalWrapper from "$lib/components/ModalWrapper.svelte"
    import { smoothEdges } from "$lib/scripts/utility"

    export let tripFleet
    export let tripAirports
    export let aircraft
    
    console.log({ aircraft })
</script>

<ModalWrapper>
    <Form class="bg-sarcastic-orange px-4 py-16 overflow-y-scroll max-h-full rounded w-full sm:w-auto" successPageLink={{ href: "/trip-planner-success"}} fleet={(tripFleet)} airports={smoothEdges(tripAirports)} >
        <div slot="title" class="font-light">
            <h3 class="text-3xl">Trip Planner</h3>
            <span class="text-lg ">
                for <span class="italic">{aircraft.title} </span>
            </span>
        </div>
    </Form>
</ModalWrapper>
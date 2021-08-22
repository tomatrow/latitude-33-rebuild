<script lang="ts">
    import { format } from "date-fns"

    let clazz = ""
    export { clazz as class }
    export let title: string
    export let name: string
    export let airports: any[]
    export let min: string = undefined
    export let max: string = undefined
</script>

<fieldset {name} class="{clazz} gap-3 flex flex-col">
    <legend class="h-auto text-lg">{title}:</legend>
    <label class="flex items-start flex-col">
        <span class="sm:w-32 font-light">Airport:</span>
        <select
            required
            class="bg-opacity-20 overflow-ellipsis overflow-hidden py-2 px-4 w-full max-w-full sm:w-auto bg-white text-white appearance-none"
            name="airportId"
            placeholder="Airport"
        >
            {#each airports as { id, airportFields, locationPostFields } (id)}
                <option class="overflow-ellipsis" value={id}
                    >{airportFields.code} - {locationPostFields.name}</option
                >
            {/each}
        </select>
    </label>
    <label class="flex items-start flex-col">
        <span class="sm:w-32 font-light">Date:</span>
        <input
            required
            class="bg-opacity-10 p-1 rounded bg-white text-white"
            {min}
            {max}
            type="date"
            name="date"
            placeholder="YYYY-MM-DD"
            value={format(new Date(), "yyyy-MM-dd")}
        />
    </label>
</fieldset>

<style lang="postcss">
    input[type="date"]:invalid::-webkit-datetime-edit {
        /* background-color: green; */
        /* color: rgba(0, 0, 0, 1) !important; */
        /* opacity: 1 !important; */
    }
    /* input[type="date"]:invalid::-webkit-datetime-edit-month-field {
        color: blue !important;
        
        background-color: green;
    } */

    /* input[type="date"] {
        color: red !important;
        &::-webkit-datetime-edit {
            color: white;
        }

        &::-webkit-datetime-edit-fields-wrapper {
            color: white;
        }

        &:invalid {
            color: white;
            opacity: 1;
        }
        &:valid {
            color: white;
            opacity: 1;
        }
    } */
</style>

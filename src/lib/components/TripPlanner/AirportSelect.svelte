<script lang="ts">
    export let label: string
    export let name: string
    export let airports: any[]
</script>

<label class="flex items-start flex-col">
    <span class="font-light">{label}</span>
    <select
        class="bg-opacity-20 overflow-ellipsis overflow-hidden py-2 px-4 w-full max-w-full sm:w-auto bg-white text-white appearance-none"
        required
        type="select"
        {name}
    >
        {#each airports as { id, airportFields, locationPostFields } (id)}
            <option class="overflow-ellipsis" value={id}
                >{airportFields.code} - {locationPostFields.name}</option
            >
        {/each}
    </select>
</label>

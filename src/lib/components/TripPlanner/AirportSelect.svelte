<script lang="ts">
    export let label: string
    export let name: string
    export let airports: any[]
    
    export let rootClass: string
    export let labelClass: string
    export let selectClass: string
</script>

<label class={rootClass}>
    <span class={labelClass}>{label}</span>
    <select
        class={selectClass}
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

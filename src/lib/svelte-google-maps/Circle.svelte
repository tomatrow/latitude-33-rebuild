<script lang="ts">
    import { getContext } from "./Map.svelte"
    import { onMount } from "svelte"

    const { map, maps } = getContext().getAll()

    export let options: google.maps.CircleOptions = {}

    onMount(() => {
        try {
            const circle = new maps.Circle({
                ...options,
                map
            })
            return () => circle.setMap(null)
        } catch (error) {
            console.error(error)
        }
    })
</script>

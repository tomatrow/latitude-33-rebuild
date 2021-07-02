<script lang="ts" strictEvents>
    import type { MarkerDetail } from "./index.type"
    import { getContext } from "./Map.svelte"
    import { onMount, createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher<{ click: MarkerDetail }>()
    const { map, clusterer, maps } = getContext().getAll()

    export let id: string = undefined
    export let cluster = false
    export let center = false
    export let options: google.maps.MarkerOptions = {}

    onMount(() => {
        try {
            const marker = new maps.Marker({
                ...options,
                map
            })

            const clickListener = maps.event.addListener(marker, "click", () =>
                dispatch("click", { marker, id })
            )

            if (cluster) clusterer.addMarker(marker)
            if (center) map.setCenter(options.position)

            return () => {
                marker.setMap(null)
                if (cluster) clusterer.removeMarker(marker)
                clickListener.remove()
            }
        } catch (error) {
            console.error(error)
        }
    })
</script>

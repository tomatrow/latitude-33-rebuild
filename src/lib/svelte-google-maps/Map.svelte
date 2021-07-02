<script lang="ts" context="module">
    import { getContext as _getContext, setContext as _setContext } from "svelte"

    const key = Symbol("map-context-key")

    export interface MapContext {
        getMap: () => google.maps.Map
        getClusterer: () => MarkerClusterer
        getMaps: () => typeof google.maps
        getAll: () => {
            map: google.maps.Map
            clusterer: MarkerClusterer
            maps: typeof google.maps
        }
    }

    export function setContext(context: MapContext) {
        _setContext(key, context)
    }

    export function getContext() {
        return _getContext(key) as MapContext
    }

    export const clustererImagePath =
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
</script>

<script lang="ts">
    import MarkerClusterer from "@googlemaps/markerclustererplus"
    import type { MarkerClustererOptions } from "@googlemaps/markerclustererplus"
    import { onMount } from "svelte"

    export let container: HTMLElement = undefined
    export let mapOptions: google.maps.MapOptions = undefined
    export let clustererOptions: MarkerClustererOptions = undefined
    export let map: google.maps.Map = undefined
    export let maps: typeof google.maps = undefined
    export let clusterer: MarkerClusterer = undefined
    export let center: google.maps.LatLng = undefined
    export let cluster = false

    setContext({
        getMap() {
            return map
        },
        getClusterer() {
            return clusterer
        },
        getMaps() {
            return maps
        },
        getAll() {
            return {
                map: this.getMap(),
                maps: this.getMaps(),
                clusterer: this.getClusterer()
            }
        }
    })

    onMount(() => {
        maps = window.google.maps
        map = new maps.Map(container, mapOptions)
        map.addListener("center_changed", () => (center = map.getCenter()))
        clusterer = new MarkerClusterer(map, [], clustererOptions)
    })

    $: if (center && !center.equals(map.getCenter())) {
        map.setCenter(center)
    }
</script>

<div bind:this={container} {...$$restProps}>
    {#if map && ((cluster && clusterer) || true)}
        <slot {map} {maps} {clusterer} />
    {/if}
</div>

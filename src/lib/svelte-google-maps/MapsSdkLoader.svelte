<script lang="ts" context="module">
    import { writable } from "svelte/store"
    export const isMapsLoaded = writable(false)
    export const isMapsLoading = writable(false)
</script>

<script lang="ts">
    import { Loader } from "@googlemaps/js-api-loader"
    import type { LoaderOptions } from "@googlemaps/js-api-loader"
    import { onMount, createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    export let key: string
    export let libraries: LoaderOptions["libraries"] = []

    function onReady() {
        dispatch("ready")
    }

    $: $isMapsLoaded && onReady()

    onMount(async () => {
        if ($isMapsLoaded) {
            onReady()
            return
        }

        if ($isMapsLoading) return
        $isMapsLoading = true

        const loader = new Loader({
            apiKey: key,
            version: "weekly",
            libraries
        })

        await loader.load()

        $isMapsLoaded = true
    })
</script>

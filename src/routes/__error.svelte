<script context="module" lang="ts">
    export function load({ error, status }) {
        console.error(`${status}: ${error.message}`)

        return {}
    }
</script>

<script lang="ts">
    import Error from "./_Error.svelte"
</script>

<Error />

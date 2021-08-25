<script context="module" lang="ts">
    export function load({ error }) {
        console.error(error)
        return {}
    }
</script>

<script lang="ts">
    import Error from "./_Error.svelte"
</script>

<Error />

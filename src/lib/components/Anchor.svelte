<script lang="ts">
    export let id: string
    export let offset = "2rem"
</script>

<div {id} class="relative" style="top: calc(-1 * (var(--nav-h) + {offset}))" />

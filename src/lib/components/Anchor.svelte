<script lang="ts">
    export let id: string
</script>

<div {id} class="relative" />

<style lang="postcss">
    div {
        top: calc(-1 * (var(--offset, 0rem)));
    }
    @screen full-nav {
        div {
            top: calc(-1 * (var(--nav-h) + var(--offset, 0rem)));
        }
    }
</style>
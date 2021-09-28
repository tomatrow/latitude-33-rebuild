<script lang="ts">
    export let id: string
</script>

{#if id}
    <div {id} class="relative" />
{/if}

<style lang="postcss">
    div {
        top: calc(-1 * (var(--offset, 0rem)));
    }
    @screen full-nav {
        div {
            top: calc(-1 * (var(--nav-h, 0rem) + var(--offset, 0rem)));
        }
    }
</style>

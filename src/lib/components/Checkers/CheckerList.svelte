<script lang="ts">
    import CheckerItem from "./CheckerItem.svelte"
    export let checkers = []
</script>

{#each checkers as item, index}
    <CheckerItem {...item} swap={index % 2 === 1} invert={index % 2 === 1} />
{/each}

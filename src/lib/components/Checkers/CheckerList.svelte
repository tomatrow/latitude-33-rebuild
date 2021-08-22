<script lang="ts">
    import CheckerItem from "./CheckerItem.svelte"
    import Anchor from "$lib/components/Anchor.svelte"

    export let checkers = []
    export let anchorId: string = undefined
</script>

<Anchor id={anchorId} />
{#each checkers as item, index}
    <CheckerItem {...item} swap={index % 2 === 1} invert={index % 2 === 1} />
{/each}

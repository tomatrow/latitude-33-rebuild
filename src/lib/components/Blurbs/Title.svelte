<script lang="ts">
    import type { AcfLink } from "$lib/index.type"
    import Link from "$lib/components/Link.svelte"

    export let title: string
    export let link: AcfLink = undefined
</script>

<h6 class="font-display flex py-2 text-white text-xl">
    {#if link}
        <Link line={{ color: "white" }} {...link} {title} />
    {:else}
        {title}
    {/if}
</h6>

<script lang="ts">
    import Link, { themes } from "$lib/components/Link.svelte"
    import { smoothEdges } from "$lib/scripts/utility"

    let clazz = ""
    export { clazz as class }
    export let taxonomies: any[]
</script>

<nav class="{clazz} gap-3 sm:gap-6 flex items-center flex-wrap text-sm">
    {#each smoothEdges(taxonomies) as { name, href }}
        <Link
            sveltekit:prefetch
            {...themes.dark()}
            {href}>{name}</Link
        >
    {/each}
</nav>

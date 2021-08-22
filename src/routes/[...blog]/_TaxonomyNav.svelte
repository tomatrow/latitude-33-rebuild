<script lang="ts">
    import { Link } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"

    let clazz = ""
    export { clazz as class }
    export let taxonomies: any[]
</script>

<nav class="{clazz} gap-3 sm:gap-6 flex items-center flex-wrap text-sm">
    {#each smoothEdges(taxonomies) as { name, href }}
        <Link
            sveltekit:prefetch
            shadow
            blob
            ease
            border
            filled
            color="pre-coffee-sky-blue"
            class="p-2 font-bold"
            {href}>{name}</Link
        >
    {/each}
</nav>

<script lang="ts">
    import { Link } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"
    export let label: string
    export let classes: any
    let clazz = ""
    export { clazz as class }
</script>

<nav class="{clazz} space-x-3 sm:space-x-6 flex flex-wrap text-sm">
    <h5 class="font-display font-black">{label}</h5>
    {#each smoothEdges(classes) as { name, href }}
        <Link class="text-pre-coffee-sky-blue font-bold" {href}>{name}</Link>
    {/each}
</nav>

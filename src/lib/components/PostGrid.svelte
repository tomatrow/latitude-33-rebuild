<script lang="ts">
    import { smoothEdges } from "$lib/scripts/utility"
    import PostCard from "./PostCard.svelte"

    let clazz = ""

    export { clazz as class }
    export let posts: any
</script>

<section class="{clazz} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
    {#each smoothEdges(posts) as post}
        <PostCard class="w-full" {...post} />
    {/each}
</section>

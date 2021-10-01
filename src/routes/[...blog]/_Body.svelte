<script lang="ts">
    import { PostCard, PostGrid } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"
    import EmailForm from "./_EmailForm.svelte"
    import Heading from "$lib/components/typography/Heading.svelte"

    export let noPostsMessage: string
    export let gridHeading: string
    export let emailForm: any
    export let posts: any[]

    const [firstPost] = smoothEdges(posts)
</script>

{#if firstPost}
    <PostCard layered {...firstPost} class="my-12 mx-auto px-5 max-w-5xl" />

    <Heading class="mt-18 my-5 mx-5 text-center">
        {gridHeading}
    </Heading>

    <PostGrid class="mb-36 mt-18 px-5" {posts} />
{:else}
    <h4 class="font-display text-2.5xl font-extralight my-5 text-center">{noPostsMessage}</h4>
{/if}

<EmailForm class="mx-auto p-6 max-w-6xl" {...emailForm} />

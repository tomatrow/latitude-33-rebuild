<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { MediaItemFragment, TermFragment } from "$lib/queries/utility"
    import { loadResource, previewVariables } from "$lib/scripts/router"

    export const load = loadResource(
        graphql`
            query BlogPostQuery($id: ID!, $isPreview: Boolean!) {
                post(id: $id, asPreview: $isPreview) {
                    id
                    slug
                    title
                    excerpt
                    dateGmt
                    seo {
                        title
                        fullHead
                    }
                    tags {
                        edges {
                            node {
                                ...TermFragment
                            }
                        }
                    }
                    categories {
                        edges {
                            node {
                                ...TermFragment
                            }
                        }
                    }
                    date
                    videoPostFields {
                        youtubeId
                    }
                    postFields {
                        contentHtml
                        featuredImage {
                            ...MediaItemFragment
                        }
                        class {
                            slug
                            href: uri
                            ...TermFragment
                            postClassFields {
                                singularLabel
                                color
                                isMedia
                            }
                        }
                    }
                }
                acfOptionsPosts {
                    postOptions {
                        jumpLabel
                    }
                }
            }
            ${MediaItemFragment}
            ${TermFragment}
        `,
        ({ __typename }) => __typename === "Post",
        ({ id }, input) => ({ id, ...previewVariables(input) })
    )
</script>

<script lang="ts">
    import { YouTube } from "$lib/svgs"
    import { openModal } from "$lib/components/ModalProvider.svelte"
    import { Meta, PostInfo, Anchor, EmbeddedVideoModal } from "$lib/components"
    import Link, { themes } from "$lib/components/Link.svelte"
    import Colors from "$lib/data/colors.json"
    import { cssVars, classes } from "$lib/actions/styles"
    import Heading from "$lib/components/typography/Heading.svelte"

    export let post: any
    export let acfOptionsPosts: any

    function handleClick() {
        console.log(post.postFields.class, post.postFields.videoPostFields)
        if (!post.postFields.class?.postClassFields.isMedia) return

        const id = post.videoPostFields?.youtubeId

        if (id)
            openModal(EmbeddedVideoModal, {
                title: "youtube",
                src: `https://www.youtube.com/embed/${id}?autoplay=1`
            })
    }
</script>

<Meta title={post.title} seo={post.seo} />

<div class="space-y-3 md:space-y-6 flex items-start flex-col mt-8 mx-auto px-5 max-w-4xl">
    <Heading large>
        {post.title}
    </Heading>
    <div class="tracking-px font-light">
        {@html post.excerpt}
    </div>
    <Link
        filled
        {...themes.dark("block text-sm")}
        href="#post">{acfOptionsPosts.postOptions.jumpLabel}</Link
    >
    <PostInfo {...post} />
</div>

<div
    on:click={handleClick}
    use:classes={[
        "rounded-2xl my-9 relative block mx-auto px-6 max-w-5xl",
        post.postFields.class.postClassFields.isMedia &&
            "cursor-pointer transition duration-200 ease-in-out transform sm:hover:-translate-y-3"
    ]}
>
    {#if post.postFields.class?.postClassFields.isMedia}
        <YouTube
            class="transition-none stroke-0 bg-opacity-10 h-1/6 absolute inset-0 m-auto z-10 w-1/6 rounded-lg bg-black text-white fill-current"
        />
    {/if}
    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="w-full h-full object-cover" {...post.postFields.featuredImage} />
</div>

<Anchor id="post" />
<section
    class="injected-content injected-content_post mx-auto p-5 max-w-6xl"
    use:cssVars={{ injectedLinkColor: Colors["disappointment-blue"] }}
>
    {@html post.postFields.contentHtml}
</section>

<style global lang="postcss">
    .injected-content_post img {
        @screen md {
            max-width: 60%;
        }
    }
</style>

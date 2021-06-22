<script lang="ts" context="module">
    import { graphql, query } from "$lib/scripts/apollo"
    import { MediaItemFragment, TermFragment } from "$lib/queries/utility"
    import { loadResource, previewVariables } from "$lib/scripts/router"
    import type { Load } from "@sveltejs/kit"

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
    import { Meta, Link, PostInfo } from "$lib/components"
    export let post: any
    export let acfOptionsPosts: any
</script>

<Meta title={post.title} seo={post.seo} />

<div class="space-y-3 md:space-y-6 flex items-start flex-col mt-8 mx-auto px-5 max-w-4xl">
    <h1 class="font-display leading-10 tracking-px text-3.5xl md:text-5.5xl font-black">
        {post.title}
    </h1>
    <div class="tracking-px font-light">
        {@html post.excerpt}
    </div>
    <Link
        blob
        ease
        border
        filled
        shadow
        color="pre-coffee-sky-blue"
        class="block py-4 px-6 font-black text-sm"
        href="#post">{acfOptionsPosts.postOptions.jumpLabel}</Link
    >
    <PostInfo {...post} />
</div>

<div class="my-9 mx-auto px-6 max-w-5xl">
    <img class="rounded-2xl" {...post.postFields.featuredImage} />
</div>

<section id="post" class="injected-content post mx-auto p-5 max-w-6xl">
    {@html post.postFields.contentHtml}
</section>

<style global lang="postcss">
    .injected-content.post {
        a {
            @apply text-disappointment-blue font-semibold;
        }
        img {
            @screen md {
                max-width: 60%;
            }
        }
    }
</style>

<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment, ContactPageFragment } from "$lib/queries/pages"
    import { MediaItemFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"

    export const load = loadPage(
        "Blog",
        graphql`
            query BlogPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Blog {
                            blogFields {
                                classNavLabel
                                gridHeading
                                emailForm {
                                    subheading
                                    heading
                                    placeholder
                                    submitLabel
                                    termsNotice
                                }
                            }
                        }
                    }
                }
                classes {
                    edges {
                        node {
                            id
                            href: uri
                            name
                            postClassFields {
                                singularLabel
                            }
                        }
                    }
                }
                posts(first: 12) {
                    edges {
                        node {
                            id
                            dateGmt
                            title
                            href: uri
                            postFields {
                                class {
                                    href: uri
                                    postClassFields {
                                        singularLabel
                                        color
                                        isMedia
                                    }
                                }
                                featuredImage {
                                    ...MediaItemFragment
                                }
                            }
                        }
                    }
                }
            }

            ${PageFragment}
            ${MediaItemFragment}
        `
    )
</script>

<script lang="ts">
    import { Meta, PostCard, PostGrid } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"
    import EmailForm from "./_EmailForm.svelte"
    import ClassNav from "./_ClassNav.svelte"

    export let page: any
    export let classes: any
    export let posts: any

    const { classNavLabel, gridHeading, emailForm } = page.template.blogFields
    const [firstPost] = smoothEdges(posts)
</script>

<Meta title={page.title} seo={page.seo} />

<ClassNav label={classNavLabel} {classes} class="m-6" />

{#if firstPost}
    <PostCard layered {...firstPost} class="my-12 mx-auto px-5 max-w-5xl" />

    <h4 class="font-display text-4.5xl mt-18 my-5 mx-5 text-center font-black">{gridHeading}</h4>

    <PostGrid class="mb-36 mt-18 px-5" {posts} />
{:else}
    <h4 class="font-display text-4.5xl my-5 text-center font-black">No posts yet!</h4>
{/if}

<EmailForm class="mx-auto p-6 max-w-6xl" {...emailForm} />

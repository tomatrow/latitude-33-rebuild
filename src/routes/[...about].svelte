<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"
    import { BannerPsudoFragment } from "$lib/components/FlexibleContent.svelte"

    export const load = loadPage(
        "About",
        graphql`
            query AboutPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_About {
                            aboutPageFields {
                                banner {
                                    ${BannerPsudoFragment}
                                }
                                vimeo {
                                    title
                                    vimeoId
                                    previewImage {
                                        ...MediaItemFragment
                                    }
                                }
                            }
                        }
                    }
                }
            }
            ${PageFragment}
            ${AcfLinkFragment}
            ${MediaItemFragment}
        `
    )
</script>

<script lang="ts">
    import { Meta, Banner } from "$lib/components"

    export let page: any

    const { banner, vimeo } = page.template.aboutPageFields
</script>

<Meta title={page.title} seo={page.seo} />

<div class="relative">
    <Banner {...banner}>
        <div class="lg:absolute lg:inset-0 flex items-center justify-end pointer-events-none">
            <div class="w-full lg:w-5/12 xl:w-1/2">
                <div class="aspect-w-16 aspect-h-9 my-4 mr-4 ml-auto w-full bg-black">
                    <iframe
                        title="Vimeo"
                        src={`https://player.vimeo.com/video/${vimeo.vimeoId}?autoplay=0&title=0&byline=0&portrait=false&transparent=true&pip=true`}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        class="pointer-events-auto"
                    />
                </div>
            </div>
        </div>
    </Banner>
</div>

<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"
    import { BannerPsudoFragment } from "$lib/components/FlexibleContent.svelte"

    export const load = loadPage(
        "Careers",
        graphql`
            query AboutPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Careers {
                            careersFields {
                                banner {
                                    title
                                    contentHtml
                                    featuredImage {
                                        ...MediaItemFragment
                                    }
                                    pill {
                                        title
                                        icon {
                                            ...MediaItemFragment
                                        }
                                    }
                                }
                                layeredSection {
                                    title
                                    subheading
                                    contentHtml
                                    image {
                                        ...MediaItemFragment
                                    }
                                }
                                positionList {
                                    title
                                    subheading
                                    positions {
                                        ... on Position {
                                            id
                                            title
                                            positionFields {
                                                position
                                                location
                                                descriptionHtml
                                                applyLink {
                                                    ...AcfLinkFragment
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            ${PageFragment}
            ${MediaItemFragment}
            ${AcfLinkFragment}
        `
    )
</script>

<script lang="ts">
    import { Meta } from "$lib/components"
    import Banner from "./_Banner.svelte"
    import LayeredSection from "./_LayeredSection.svelte"
    import PositionList from "./_PositionList.svelte"

    export let page: any
    const { banner, layeredSection, positionList } = page.template.careersFields
</script>

<Meta title={page.title} seo={page.seo} />

<div class="py-9 px-5 sm:px-6">
    <Banner class="max-w-screen-xl mx-auto" {...banner} />
</div>

<div class="bg-sarcastic-orange py-18 px-4.5">
    <LayeredSection class="mx-auto" {...layeredSection} />
</div>

<div class="bg-pre-coffee-sky-blue py-18 lg:py-24 px-5 lg:px-16">
    <PositionList {...positionList} />
</div>

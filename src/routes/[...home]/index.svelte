<script context="module" lang="ts">
    import { graphql } from "$lib/scripts/apollo"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"
    import { createFlexiblePsudoFragment } from "$lib/components/FlexibleContent.svelte"

    export const load = loadPage(
        "Home",
        graphql`
            query HomePageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Home {
                            frontPage {
                                hero {
                                    brandName
                                    fieldGroupName
                                    youtubeId
                                    title
                                    pageLink {
                                        ...AcfLinkFragment
                                    }
                                    backgroundImage {
                                        ...MediaItemFragment
                                    }
                                }
                                grid {
                                    blurb
                                    link {
                                        ...AcfLinkFragment
                                    }
                                    image {
                                        ...MediaItemFragment
                                    }
                                }
                            }
                            ${createFlexiblePsudoFragment("Template_Home")}
                        }
                    }
                }
            }
            ${AcfLinkFragment}
            ${PageFragment}
            ${MediaItemFragment}
        `
    )
</script>

<script lang="ts">
    import { Meta, FlexibleContent } from "$lib/components"

    import Hero from "./_Hero.svelte"
    import Grid from "./_Grid.svelte"

    export let page: any
</script>

<Meta title={page.title} seo={page.seo} />

<Hero {...page.template.frontPage.hero} />
<Grid items={page.template.frontPage.grid} />
<FlexibleContent content={page.template.genericPageFields.flexibleContent} />

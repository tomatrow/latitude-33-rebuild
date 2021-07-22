<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { createFlexiblePsudoFragment } from "$lib/components/FlexibleContent.svelte"

    export const load = loadPage(
        "Properties",
        graphql`
            query PropertiesPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Properties {
                            propertiesPageFields {
                                gridLinkLabel
                                ctaBar {
                                    buttonLabel
                                    heading
                                }
                                filter {
                                    noResultsLabel
                                    landingsLabel
                                    ttafLabel
                                }
                            }
                            ${createFlexiblePsudoFragment("Template_Properties")}
                        }
                    }
                }
                properties(first: 250, where: {status:PUBLISH}) {
                    edges {
                        node {
                            href: link
                            propertyFields {
                                info {
                                    name
                                    featuredImage {
                                        ...MediaItemFragment
                                    }
                                }
                                stats {
                                    landings
                                    ttaf
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
    import { Meta, FlexibleContent } from "$lib/components"
    import PropertyFilter from "./_PropertyFilter.svelte"

    export let page: any
    export let properties: any[]
</script>

<Meta title={page.title} seo={page.seo} />

<FlexibleContent content={page.template.genericPageFields.flexibleContent}>
    <svelte:fragment slot="after" let:index>
        {#if index === 0}
            <PropertyFilter
                ctaBar={page.template.propertiesPageFields.ctaBar}
                {properties}
                gridLinkLabel={page.template.propertiesPageFields.gridLinkLabel}
                {...page.template.propertiesPageFields.filter}
            />
        {/if}
    </svelte:fragment>
</FlexibleContent>

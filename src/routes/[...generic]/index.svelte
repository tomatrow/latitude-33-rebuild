<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"
    import { createFlexiblePsudoFragment } from "$lib/components/FlexibleContent.svelte"

    export const load = loadPage(
        "Generic",
        graphql`
            query GenericPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Generic {
                            ${createFlexiblePsudoFragment("Template_Generic")}
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
    import { Meta, FlexibleContent } from "$lib/components"

    export let page: any
</script>

<Meta title={page.title} seo={page.seo} />

{#key page}
    <FlexibleContent content={page.template.genericPageFields.flexibleContent} />
{/key}

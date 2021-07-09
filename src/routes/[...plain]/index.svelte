<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"

    export const load = loadPage(
        "Plain",
        graphql`
            query PlainPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Plain {
                            plainFields {
                                contentHtml
                            }
                        }
                    }
                }
            }
            ${PageFragment}
        `
    )
</script>

<script lang="ts">
    import { cssVars } from "$lib/actions/styles"
    import Colors from "$lib/data/colors"
    import { Meta } from "$lib/components"

    export let page: any
</script>

<Meta title={page.title} seo={page.seo} />

<section
    class="injected-content mx-auto p-5 max-w-6xl"
    use:cssVars={{ injectedLinkColor: Colors["disappointment-blue"] }}
>
    {@html page.template.plainFields.contentHtml}
</section>

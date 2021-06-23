<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    // import { AcfLinkFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"
    export const load = () => {}

    // export const load = loadPage(
    //     "Contact",
    //     graphql`
    //         query ContactPageQuery($id: ID!, $isPreview: Boolean!) {
    //             page(id: $id, asPreview: $isPreview) {
    //                 ...PageFragment
    //                 template {
    //                     ... on Template_Generic {
    //                         templateName
    //                         genericPageFields {
    //                             content {
    //                                 __typename
    //                                 ... on Template_Generic_Genericpagefields_Content_B {
    //                                     fieldGroupName
    //                                     test
    //                                 }
    //                                 ... on Template_Generic_Genericpagefields_Content_A {
    //                                     fieldGroupName
    //                                     test
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //         ${PageFragment}
    //     `
    // )
</script>

<script lang="ts">
    import { session } from "$app/stores"
    import { Meta } from "$lib/components"

    export let page
    const { title, template } = page

    const fields = template.genericPageFields

    console.log({ session: $session, fields })
</script>

<Meta {title} seo={page.seo} />

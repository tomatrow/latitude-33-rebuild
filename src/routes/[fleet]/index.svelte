<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { loadPage } from "$lib/scripts/router"

    export const load = loadPage(
        "Fleet",
        graphql`
            query FleetPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                }
                fleet(first: 100) {
                    edges {
                        node {
                            title
                            uri
                        }
                    }
                }
            }
            ${PageFragment}
        `
    )
</script>

<script lang="ts">
    import { Link, Meta } from "$lib/components"

    console.log("fleet index page")

    export let page: any
    export let fleet: any
</script>

<Meta title={page.title} seo={page.seo} />

<h1>{page.title}</h1>

<div class="divide-y-black divide-y">
    {#each fleet.edges.map(edge => edge.node) as { uri, title }}
        <Link sveltekit:prefetch href={uri}>{title}</Link>
    {/each}
</div>

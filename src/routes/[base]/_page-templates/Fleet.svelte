<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { Meta } from "$lib/components"

    export const name = "Fleet"
    export const Query = graphql`
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
</script>

<script lang="ts">
    import { Link } from "$lib/components"

    export let page: any
    export let fleet: any
</script>

<Meta post={page} />

<h1>{page.title}</h1>

<div class="divide-y-black divide-y">
    {#each fleet.edges.map(edge => edge.node) as { uri, title }}
        <Link sveltekit:prefetch href={uri}>{title}</Link>
    {/each}
</div>

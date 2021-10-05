<script lang="ts" context="module">
    import { MediaItemFragment } from "$lib/queries/utility"
    import { ResourceTypes, loadResource } from "$lib/scripts/router"
    import { graphql } from "$lib/scripts/apollo"
    import { options, createTaxonomyPsuedoFragment, PostFragment } from "./_common"

    export const load = loadResource(
        ({ __typename }) => {
            let plural: string
            switch (__typename) {
                case ResourceTypes.Tag:
                    plural = "tags"
                    break
                case ResourceTypes.Category:
                    plural = "categories"
                    break
                case ResourceTypes.Class:
                    plural = "classes"
                    break
            }
            return graphql`
            query ${__typename}TaxonomyQuery($id: ID!) {
                ${options}
                taxonomy: ${__typename.toLowerCase()}(id: $id) {
                    name
                    seo {
                        fullHead
                    }
                    posts {
                        edges {
                            node {
                                ...PostFragment
                            }
                        }
                    }
                }
                ${createTaxonomyPsuedoFragment(plural)}
            }
            ${MediaItemFragment}
            ${PostFragment}
        `
        },
        ({ __typename }) => {
            const taxonomies = [ResourceTypes.Tag, ResourceTypes.Class, ResourceTypes.Category]
            return taxonomies.includes(__typename as ResourceTypes)
        }
    )
</script>

<script lang="ts">
    import { session } from "$app/stores"
    import { Meta } from "$lib/components"
    import Link, { themes } from "$lib/components/Link.svelte"
    import Body from "./_Body.svelte"
    import TaxonomyNav from "./_TaxonomyNav.svelte"

    export let acfOptionsTaxonomies: any
    export let others: any
    export let taxonomy: any
</script>

<Meta title={taxonomy.name} seo={taxonomy.seo} />

<div class="flex items-center px-4">
    {#if $session.postsPage}
        <Link
            sveltekit:prefetch
            filled
            {...themes.dark()}
            href={$session.postsPage.href}
            >{acfOptionsTaxonomies.postsTaxonomyFields.allPostsLabel}</Link
        >
    {/if}

    <TaxonomyNav taxonomies={others} class="m-6" />
</div>

{#key taxonomy.posts}
    <Body posts={taxonomy.posts} {others} {...acfOptionsTaxonomies.postsTaxonomyFields} />
{/key}

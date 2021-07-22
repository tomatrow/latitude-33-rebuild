<script lang="ts" context="module">
    import { PageFragment } from "$lib/queries/pages"
    import { MediaItemFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"
    import { graphql } from "$lib/scripts/apollo"
    import { options, PostFragment } from "./_common"

    export const load = loadPage("Blog", graphql`
        query BlogPageQuery($id: ID!, $isPreview: Boolean!) {
            page(id: $id, asPreview: $isPreview) {
                ...PageFragment
            }
            ${options}            
            classes {
                edges {
                    node {
                        id
                        name
                        href: uri 
                    }
                }
            }
            tags {
                edges {
                    node {
                        id
                        name
                        href: uri 
                    }
                }
            }
            categories {
                edges {
                    node {
                        id
                        name
                        href: uri 
                    }
                }
            }
            posts(first: 12) {
                edges {
                    node {
                        ...PostFragment
                    }
                }
            }
        }

        ${PageFragment}
        ${MediaItemFragment}
        ${PostFragment}
    `)
</script>

<script lang="ts">
    import { slide } from "svelte/transition"
    import { TabControl, TabControlItem } from "renderless-svelte"
    import { Meta, Button } from "$lib/components"
    import Body from "./_Body.svelte"
    import { ChevronDown } from "$lib/svgs"
    import TaxonomyNav from "./_TaxonomyNav.svelte"


    export let page: any
    export let acfOptionsTaxonomies: any
    export let classes: any
    export let tags: any
    export let categories: any
    export let posts: any
    
    const postsPageLabel = "All"
    const missingPostsBlurb = "No posts yet!"
    
    let setTab: any
</script>

<Meta title={page.title} seo={page.seo} />

<div class="pt-8 flex-col m-4 min-h-[2rem]">
    <TabControl bind:setTab>
        <div slot="tabs" let:tabs class="space-x-6 flex">        
            {#each tabs as { active, payload, select }}
                <Button class="font-display font-black flex items-center text-either-gray-blue" on:click={() => active ?  setTab(null) : select()}>
                    {payload} 
                    <ChevronDown class="{active ? 'rotate-180' : ''} transition duration-400 w-6 h-6" strokeWidth={4} />
                </Button>
            {/each}
        </div>
        <TabControlItem id="classes" payload="Classes">
            <div transition:slide class="p-4">
                <TaxonomyNav taxonomies={classes} />
            </div>
        </TabControlItem>
        <TabControlItem id="tags" payload="Tags">
            <div transition:slide class="p-4">
                <TaxonomyNav taxonomies={tags}  />
            </div>
        </TabControlItem>
        <TabControlItem id="categories" payload="Categories">
            <div transition:slide class="p-4">
                <TaxonomyNav taxonomies={categories}  />
            </div>
        </TabControlItem>
    </TabControl>
</div>

{#key posts}
    <Body {posts} {missingPostsBlurb} {postsPageLabel} {...acfOptionsTaxonomies.postsTaxonomyFields} />
{/key}

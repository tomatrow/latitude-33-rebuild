<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { AcfLinkFragment, MediaItemFragment, EmployeeFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"
    import { BannerPsudoFragment } from "$lib/components/FlexibleContent.svelte"

    export const load = loadPage(
        "Team",
        graphql`
            query AboutPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Team {
                            teamFields {
                                banner {
                                    subheading
                                    ${BannerPsudoFragment}
                                }
                                normalEmployees {
                                    ...EmployeeFragment
                                }
                                emphasizedEmployees {
                                    ...EmployeeFragment
                                }
                            }
                        }
                    }
                }
            }
            ${PageFragment}
            ${AcfLinkFragment}
            ${MediaItemFragment} 
            ${EmployeeFragment}
        `
    )
    function normalizeEmployee({ name, employeeFields }) {
        return {
            name,
            ...employeeFields
        }
    }
</script>

<script lang="ts">
    import { Meta, Banner, CheckerItem } from "$lib/components"
    import BioCard from "./_BioCard.svelte"

    export let page: any
    const { banner, normalEmployees, emphasizedEmployees } = page.template.teamFields

    console.log({ banner, normalEmployees, emphasizedEmployees })
</script>

<Meta title={page.title} seo={page.seo} />

<Banner smallTitle {...banner} />

{#each emphasizedEmployees.map(normalizeEmployee) as { name, bio, position, image }, index}
    <CheckerItem
        title={name}
        {image}
        subheading={position}
        contentHtml={bio}
        expandContent
        bgColor="disappointment-blue"
        fullImage={false}
        invert={index % 2 === 1}
    />
{/each}
<div class="mx-auto">
    <section class="grid grid-custom gap-6 sm:mx-9 lg:mx-18 my-24 mx-5 max-w-5xl">
        {#each normalEmployees.map(normalizeEmployee) as employee}
            <div>
                <BioCard {...employee} />
            </div>
        {/each}
    </section>
</div>

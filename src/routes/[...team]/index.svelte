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
                                footer {
                                    blurb 
                                    link {
                                        ...AcfLinkFragment
                                    }
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
    import _ from "lodash"
    import { IconArrowRight } from "$lib/svgs"
    import { Meta, Banner, CheckerItem, Link } from "$lib/components"
    import BioCard from "./_BioCard.svelte"
    import { AccordionGroup } from "renderless-svelte"

    export let page: any
    const { banner, normalEmployees, emphasizedEmployees, footer } = page.template.teamFields
</script>

<Meta title={page.title} seo={page.seo} />

<Banner {...banner} />

{#each emphasizedEmployees.map(normalizeEmployee) as { name, bio, position, image, quote }, index}
    <CheckerItem
        title={name}
        image={{ ...image, caption: quote }}
        subheading={position}
        contentHtml={bio}
        expandContent
        bgColor="disappointment-blue"
        fullImage={false}
        invert={index % 2 === 1}
    />
{/each}

<div class="flex justify-center mx-auto">
    <AccordionGroup>
        <section class="gap-6 sm:mx-9 lg:mt-18 flex flex-col mt-24 mx-5 max-w-5xl">
            {#each _.chunk(normalEmployees.map(normalizeEmployee), 3) as employees}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {#each employees as employee}
                        <div>
                            <BioCard {...employee} />
                        </div>
                    {/each}
                </div>
            {/each}
        </section>
    </AccordionGroup>
</div>

<div class="space-x-5 flex items-center justify-center mt-8 mb-24 text-lg">
    <h6 class="">{footer.blurb}</h6>
    <Link
        class="text-sarcastic-orange tracking-px space-x-2 flex items-center font-black"
        href={footer.link.href}
        target={footer.link.target}
    >
        <span>{footer.link.title}</span>
        <IconArrowRight class="w-4 h-4" />
    </Link>
</div>

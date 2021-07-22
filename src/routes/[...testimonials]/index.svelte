<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"
    import { createFlexiblePsudoFragment } from "$lib/components/FlexibleContent.svelte"
    import { FleetTypeOptionsFragment } from "$lib/queries/aircraft"

    export const load = loadPage(
        "Testimonials",
        graphql`
            query TestimonialsPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Testimonials {
                            ${createFlexiblePsudoFragment("Template_Testimonials")}
                            testimonialsPageFields {
                                gridTitle
                                testimonies {
                                    ... on Testimonial {
                                        id
                                        testimonialPostFields {
                                            name
                                            position
                                            quote
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                acfOptionsDrillDown {
                    ...FleetTypeOptionsFragment
                }
            }
            ${PageFragment}
            ${AcfLinkFragment}
            ${MediaItemFragment}
            ${FleetTypeOptionsFragment}
        `
    )
</script>

<script lang="ts">
    import { Meta, FlexibleContent, TestimonialExpose } from "$lib/components"
    import TestimonialGrid from "./_TestimonialGrid.svelte"

    export let page: any
    export let acfOptionsDrillDown: any
</script>

<Meta title={page.title} seo={page.seo} />

<FlexibleContent content={page.template.genericPageFields.flexibleContent} />

<TestimonialExpose class="sm:mt-18 mt-12" {...acfOptionsDrillDown.fleetPostTypeFields} />

<TestimonialGrid
    title={page.template.testimonialsPageFields.gridTitle}
    testimonies={page.template.testimonialsPageFields.testimonies}
/>

<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"

    const LocationPsuedoFragment = `
        href: uri
        locationPostFields {
            name
            blurb
        }
    `

    export const load = loadPage(
        "Locations",
        graphql`
            query AirportsPageQuery($id: ID!, $isPreview: Boolean!) {
                featured: visibility(id: "featured", idType: SLUG) {
                    airports(first: 500) {
                        edges {
                            node {
                                ${LocationPsuedoFragment}
                                airportFields {
                                    code
                                    featuredImage {
                                        ...MediaItemFragment
                                    }
                                }
                            }
                        } 
                    }
                    destinations(first: 500) {
                        edges {
                            node {
                                ${LocationPsuedoFragment}
                                destinationPostFields {
                                    featuredImage {
                                        ...MediaItemFragment
                                    }
                                }
                            }
                        }
                    }
                }
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_Locations {
                            locationsPageFields {
                                banner {
                                    title
                                    contentHtml
                                    image {
                                        ...MediaItemFragment
                                    }
                                }
                                destinations {
                                    title 
                                    subheading                                    
                                }
                                airports {
                                    title 
                                    subheading
                                }   
                            }
                        }
                    }
                }
            }
            ${PageFragment}
            ${MediaItemFragment}
        `
    )
</script>

<script lang="ts">
    import { Meta, CollectionGrid, SplitBanner } from "$lib/components"
    import LocationsSection from "./_LocationsSection.svelte"
    import { smoothEdges } from "$lib/scripts/utility"

    export let page: any
    export let featured: any

    function getItems({ airports, destinations }) {
        return {
            airportItems: smoothEdges(airports).map(
                ({ href, airportFields, locationPostFields }) => {
                    return {
                        title: locationPostFields.name,
                        blurb: locationPostFields.blurb,
                        image: airportFields.featuredImage,
                        link: {
                            href
                        }
                    }
                }
            ),
            destinationItems: smoothEdges(destinations).map(
                ({ href, destinationPostFields, locationPostFields }) => {
                    return {
                        title: locationPostFields.name,
                        blurb: locationPostFields.blurb,
                        image: destinationPostFields.featuredImage,
                        link: {
                            href
                        }
                    }
                }
            )
        }
    }

    $: ({ airportItems, destinationItems } = getItems(featured))

    $: console.log({ airportItems, destinationItems, page })
</script>

<Meta title={page.title} seo={page.seo} />

<SplitBanner {...page.template.locationsPageFields.banner} />

{#if destinationItems.length > 0}
    <LocationsSection
        items={destinationItems}
        {...page.template.locationsPageFields.destinations}
    />
{/if}

{#if airportItems.length > 0}
    <LocationsSection items={airportItems} {...page.template.locationsPageFields.airports} />
{/if}

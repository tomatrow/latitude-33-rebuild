<script lang="ts" context="module">
    import { graphql, query } from "$lib/scripts/apollo"
    import { MediaItemFragment } from "$lib/queries/utility"
    import type { LoadInput } from "@sveltejs/kit"
    import { matchPath } from "$lib/scripts/router"
    import type { Route } from "$lib/scripts/router"

    const SubfleetTaxonomyQuery = graphql`
        query SubfleetTaxonomyQuery($id: ID!) {
            subfleet(id: $id) {
                id
                name
                description
                seo {
                    title
                    fullHead
                }
                subfleetPageSettings {
                    gallery {
                        ...MediaItemFragment
                    }
                    gridHeading
                }
                fleet {
                    edges {
                        node {
                            id
                            title
                            uri
                            featuredImage {
                                node {
                                    altText
                                    sourceUrl
                                }
                            }
                        }
                    }
                }
            }
            acfOptionsSubfleets {
                subfleetOptions {
                    mainContent {
                        subheading
                        bookingCtaLabel
                        galleryLabel
                    }
                    fleetGrid {
                        subheading
                        linkLabel
                    }
                }
            }
        }
        ${MediaItemFragment}
    `

    export const load: Load = async ({ page, session }) => {
        const item = session.subfleets.find(matchPath(page.path))

        if (!item) return

        const { id } = item

        const { data } = await query(SubfleetTaxonomyQuery, {
            id
        })

        return {
            status: 200,
            props: data
        }
    }
</script>

<script lang="ts">
    import { Meta, Link } from "$lib/components"
    import { smoothEdges } from "$lib/scripts/utility"

    export let subfleet: any
    export let acfOptionsSubfleets: any

    const { subfleetOptions } = acfOptionsSubfleets

    console.log({ subfleet, acfOptionsSubfleets })
</script>

<!-- /fleet/turboprop-private-aircraft -->
<Meta title={subfleet.name} seo={subfleet.seo} />

<h5>{subfleetOptions.mainContent.subheading}</h5>
<h1>{subfleet.name}</h1>
<div>{@html subfleet.description}</div>
<Link>{subfleetOptions.mainContent.bookingCtaLabel}</Link>

<div>
    {#each subfleet.subfleetPageSettings.gallery as { sourceUrl, altText }}
        <div>{sourceUrl} : {altText}</div>
    {/each}
</div>

<Link>{subfleetOptions.mainContent.galleryLabel}</Link>

<h5>{subfleetOptions.fleetGrid.subheading}</h5>
<h4>{subfleet.subfleetPageSettings.gridHeading}</h4>

<div>
    {#each smoothEdges(subfleet.fleet) as { title, uri, featuredImage }}
        <div style="background-image: {featuredImage?.sourceUrl}">
            <div>
                <h3>{title}</h3>
                <Link href={uri}>{subfleetOptions.fleetGrid.linkLabel}</Link>
            </div>
        </div>
    {/each}
</div>

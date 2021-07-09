<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { loadResource, previewVariables } from "$lib/scripts/router"
    import { createFlexiblePsudoFragment } from "$lib/components/FlexibleContent.svelte"

    export const load = loadResource(
        graphql`
            query AirportQuery($id: ID!, $isPreview: Boolean!) {
                airport(id: $id, asPreview: $isPreview) {
                    id
                    slug
                    title
                    seo {
                        title
                        fullHead
                    }
                    airportFields {
                        coordinates {
                            lat: latitude
                            lng: longitude
                            streetAddress
                        }
                    }
                    ${createFlexiblePsudoFragment("Airport")}
                }
            }
            ${MediaItemFragment}
            ${AcfLinkFragment}
        `,
        ({ __typename }) => __typename === "Airport",
        ({ id }, input) => ({ id, ...previewVariables(input) })
    )
</script>

<script lang="ts">
    import { Meta, FlexibleContent } from "$lib/components"
    import { MapsSdkLoader, isMapsLoaded, Map, Marker } from "$lib/svelte-google-maps"

    export let airport: any

    const key = import.meta.env.VITE_RANGE_FINDER_MAPS_API_KEY as string

    console.log({ airport })
    const position = airport.airportFields.coordinates
</script>

<Meta title={airport.title} seo={airport.seo} />

<MapsSdkLoader {key} />

<FlexibleContent content={airport.genericPageFields.flexibleContent}>
    <svelte:fragment slot="after" let:index>
        {#if index === 0 && $isMapsLoaded}
            <Map class="h-96 w-full" mapOptions={{ zoom: 8, center: position }}>
                <Marker center options={{ position }} />
            </Map>
        {/if}
    </svelte:fragment>
</FlexibleContent>

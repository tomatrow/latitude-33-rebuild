<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { AcfLinkFragment, MediaItemFragment } from "$lib/queries/utility"
    import { loadResource, previewVariables } from "$lib/scripts/router"
    import { createFlexiblePsudoFragment } from "$lib/components/FlexibleContent.svelte"

    export const load = loadResource(
        graphql`
            query DestinationQuery($id: ID!, $isPreview: Boolean!) {
                destination(id: $id, asPreview: $isPreview) {
                    id
                    slug
                    title
                    seo {
                        title
                        fullHead
                    }
                    locationPostFields {
                        coordinates {
                            lat: latitude
                            lng: longitude
                            streetAddress
                        }
                    }
                    ${createFlexiblePsudoFragment("Destination")}
                }
            }
            ${MediaItemFragment}
            ${AcfLinkFragment}
        `,
        ({ __typename }) => __typename === "Destination",
        ({ id }, input) => ({ id, ...previewVariables(input) })
    )
</script>

<script lang="ts">
    import { Meta, FlexibleContent } from "$lib/components"
    import { MapsSdkLoader, isMapsLoaded, Map, Marker } from "$lib/svelte-google-maps"

    export let destination: any

    const key = import.meta.env.VITE_RANGE_FINDER_MAPS_API_KEY as string

    const position = destination.locationPostFields.coordinates
</script>

<Meta title={destination.title} seo={destination.seo} />

<MapsSdkLoader {key} />

<FlexibleContent content={destination.genericPageFields.flexibleContent}>
    <svelte:fragment slot="after" let:index>
        {#if index === 0 && $isMapsLoaded}
            <Map class="h-96 w-full" mapOptions={{ zoom: 12, center: position }}>
                <Marker center options={{ position }} />
            </Map>
        {/if}
    </svelte:fragment>
</FlexibleContent>

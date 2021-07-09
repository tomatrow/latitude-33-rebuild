<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { MediaItemFragment } from "$lib/queries/utility"
    import { loadResource, previewVariables } from "$lib/scripts/router"

    export const load = loadResource(
        graphql`
            query PropertyQuery($id: ID!, $isPreview: Boolean!) {
                property(id: $id, asPreview: $isPreview) {
                    id
                    slug
                    title
                    seo {
                        title
                        fullHead
                    }
                    propertyFields {
                        info {
                            name
                            featuredImage {
                                ...MediaItemFragment
                            }
                            descriptionHtml
                            engines {
                                name
                                serialNumber
                                hoursSinceNew
                                cyclesSinceNew
                            }
                        }
                        stats {
                            serialNumber
                            registrationNumber
                            ttaf
                            landings
                        }
                        details {
                            engine
                            maintenance
                            avionics
                            additionalEquipment
                            interior
                            exterior
                        }
                        media {
                            gallery {
                                ...MediaItemFragment
                            }
                            secondaryImage {
                                ...MediaItemFragment
                            }
                            matterportId
                            youtubeId
                        }
                        files {
                            label
                            file {
                                href: link
                            }
                        }
                    }
                }
                acfOptionsProperties {
                    propertyOptions {
                        overviewSection {
                            title
                            labels {
                                landings
                                registrationNumber
                                serialNumber
                                ttaf
                            }
                        }
                        detailsSection {
                            title
                            subheading
                            labels {
                                engine
                                maintenance
                                avionics
                                additionalEquipment
                                interior
                                exterior
                            }
                        }
                        filesSection {
                            title
                            subheading
                            downloadLabel
                            backgroundImage {
                                ...MediaItemFragment
                            }
                        }
                    }
                }
            }
            ${MediaItemFragment}
        `,
        ({ __typename }) => __typename === "Property",
        ({ id }, input) => ({ id, ...previewVariables(input) })
    )
</script>

<script lang="ts">
    import { Banner, Meta, Link } from "$lib/components"
    import Overview from "./_Overview.svelte"
    import Details from "./_Details/index.svelte"
    import Files from "./_Files.svelte"
    import ModalButtons from "./_ModalButtons.svelte"

    export let property: any
    export let acfOptionsProperties: any

    const { overviewSection, detailsSection, filesSection } = acfOptionsProperties.propertyOptions
    const { info, stats, details, media, files } = property.propertyFields
</script>

<Meta title={property.title} seo={property.seo} />

<Banner title={info.name} contentHtml={info.descriptionHtml} backgroundImage={info.featuredImage}>
    <Link
        blob
        filled
        outline
        shadow
        ease
        border
        color="calm-summer-horizon"
        class="inline-block mr-4 py-2 px-4"
        href="#details">Details</Link
    >
    <Link
        blob
        filled
        outline
        shadow
        ease
        border
        color="calm-summer-horizon"
        class="inline-block py-2 px-4"
        href="#gallery">Gallery</Link
    >
</Banner>

<Overview {stats} {...overviewSection} />

<Details {details} {...media} {...detailsSection} engines={info.engines}>
    <div slot="accordionFooter" class="space-x-4 flex">
        <ModalButtons {...media} />
    </div>
</Details>

<Files {files} {...filesSection} />

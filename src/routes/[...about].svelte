<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment } from "$lib/queries/pages"
    import { AcfLinkFragment, BannerFragment, MediaItemFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"

    export const load = loadPage(
        "About",
        graphql`
            query AboutPageQuery($id: ID!, $isPreview: Boolean!) {
                page(id: $id, asPreview: $isPreview) {
                    ...PageFragment
                    template {
                        ... on Template_About {
                            aboutPageFields {
                                banner {
                                    ...BannerFragment
                                }
                                vimeo {
                                    title
                                    vimeoId
                                    previewImage {
                                        ...MediaItemFragment
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
            ${BannerFragment}
        `
    )
</script>

<script lang="ts">
    import { Link, Button, EmbeddedVideoModal, Meta, Banner } from "$lib/components"
    import { openModal } from "$lib/components/ModalProvider.svelte"

    export let page

    const { banner, vimeo } = page.template.aboutPageFields
</script>

<Meta title={page.title} seo={page.seo} />

<Banner {...banner.bannerFields}>
    <Button
        class="flex items-center flex-col sm:flex-row mx-auto sm:mx-0 rounded-lg bg-white"
        on:click={() =>
            openModal(EmbeddedVideoModal, {
                title: "vimeo",
                src: `https://player.vimeo.com/video/${vimeo.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`
            })}
    >
        <div class="relative flex items-center justify-center">
            <img
                class="sm:w-36 w-full rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none object-cover"
                {...vimeo.previewImage}
            />
            <img
                class="transform hover:scale-125 transition-transform duration-200 absolute w-12 h-12"
                src="/icons/play.png"
            />
        </div>
        <div class="text-tinted-rear-window p-6 sm:py-0 font-bold text-sm">{vimeo.title}</div>
    </Button>
</Banner>

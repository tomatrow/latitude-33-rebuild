<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { PageFragment, AboutPageFragment } from "$lib/queries/pages"
    import { AcfLinkFragment } from "$lib/queries/utility"

    export const name = "About"
    export const Query = graphql`
        query AboutPageQuery($id: ID!, $isPreview: Boolean!) {
            page(id: $id, asPreview: $isPreview) {
                ...PageFragment
                template {
                    ...AboutPageFragment
                }
            }
        }
        ${PageFragment}
        ${AboutPageFragment}
        ${AcfLinkFragment}
    `
</script>

<script lang="ts">
    import { cssVars } from "$lib/actions/styles"
    import { Link, Button, EmbeddedVideoModal } from "$lib/components"
    import { openModal } from "$lib/components/ModalProvider.svelte"
    import { onMount } from "svelte"
    import { Meta } from "$lib/components"

    export let page
    const { id, slug, title, template } = page

    const { contentHtml, footer, vimeo } = template.aboutPageFields
</script>

<Meta post={page} />

<section
    class="bg-cover bg-no-repeat text-white"
    use:cssVars={{
        url: "url(/images/Cessna-Citation-Sovereign-Super-Midsize-Aircraft-For-Charter.jpeg)"
    }}
>
    <div class="space-y-6 mx-5 md:mx-10 py-24" style="max-width: 32rem">
        <h1 class="font-display md:text-7xl font-black text-4xl">{title}</h1>
        <div class="about-section-injected-content airy-copy text-base md:text-xl">
            {@html contentHtml}
        </div>
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
                    src={vimeo.previewImage.mediaItemUrl}
                    alt={vimeo.previewImage.altText}
                />
                <img
                    class="transform hover:scale-125 transition-transform duration-200 absolute w-12 h-12"
                    src="/icons/play.png"
                />
            </div>
            <div class="text-tinted-rear-window p-6 sm:py-0 font-bold text-sm">{vimeo.title}</div>
        </Button>
    </div>
    <hr class="bg-white opacity-25" />
    <div
        class="space-y-4 md:space-x-12 md:space-y-0 flex items-center flex-col md:flex-row justify-between py-12 px-10"
    >
        <span class="airy-copy text-center md:text-left">{footer.blurb}</span>
        <Link
            class="bg-pre-coffee-sky-blue border-pre-coffee-sky-blue flex-shrink-0 py-4 px-6 border-2"
            blob
            shadow
            href={footer.link.url}
            target={footer.link.target}>{footer.link.title}</Link
        >
    </div>
</section>

<style lang="postcss">
    section {
        background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), var(--url);
    }
    :global {
        .about-section-injected-content {
            a {
                @apply text-disappointment-blue font-semibold;
            }
        }
    }
</style>

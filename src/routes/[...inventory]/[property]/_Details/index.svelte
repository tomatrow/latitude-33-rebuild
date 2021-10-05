<script lang="ts">
    // import Gallery from "./Gallery.svelte"
    import Colors from "$lib/data/colors"
    import DetailsAccordionGroup from "./DetailsAccordionGroup.svelte"
    import { Anchor, GalleryCarousel } from "$lib/components"
    import type { AcfImage } from "$lib/index.type"
    import Heading from "$lib/components/typography/Heading.svelte"

    export let title: string
    export let subheading: string
    export let labels: Record<string, string> = {}
    export let details: Record<string, string> = {}
    export let gallery: AcfImage[] = []
    export let secondaryImage: AcfImage = undefined
    export let engines: any[] = []
    export let specsTitle: string
    export let engineSpecLabels: Record<string, string>
</script>

<section class="grid grid-cols-1 md:grid-cols-2 gap-6 py-18 items-center justify-center px-5">
    <DetailsAccordionGroup
        {details}
        {labels}
        {engines}
        {specsTitle}
        {engineSpecLabels}
        class="bg-sarcastic-orange mx-auto p-3 w-full sm:max-w-md text-white"
        --injected-link-color={Colors["a-stormy-morning"]}
    >
        <header slot="header">
            <Anchor id="details" --offset="2rem" />
            <Heading reverse {subheading}>{title}</Heading>
        </header>
        <slot name="accordionFooter" slot="footer" />
    </DetailsAccordionGroup>

    <div class="space-y-4">
        <Anchor id="gallery" --offset="1rem" />
        <GalleryCarousel class="h-96 w-full max-w-xl" {gallery} />
        {#if secondaryImage}
            <!-- svelte-ignore a11y-missing-attribute  -->
            <img {...secondaryImage} />
        {/if}
    </div>
</section>

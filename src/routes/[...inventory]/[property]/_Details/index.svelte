<script lang="ts">
    import Gallery from "./Gallery.svelte"
    import Colors from "$lib/data/colors"
    import DetailsAccordionGroup from "./DetailsAccordionGroup.svelte"
    import { Anchor } from "$lib/components"
    import type { AcfImage } from "$lib/index.type"

    export let title: string
    export let subheading: string
    export let labels: Record<string, string> = {}
    export let details: Record<string, string> = {}
    export let gallery: AcfImage[] = []
    export let secondaryImage: AcfImage = undefined
    export let engines: any[] = []
</script>

<section class="grid grid-cols-1 md:grid-cols-2 gap-6 py-18 items-center justify-center px-5">
    <DetailsAccordionGroup
        {details}
        {labels}
        {engines}
        class="bg-sarcastic-orange rounded-xl mx-auto p-3 w-full sm:max-w-md text-white"
        --injected-link-color={Colors["either-gray-blue"]}
    >
        <header class="font-display space-y-2 relative" slot="header">
            <Anchor id="details" />
            <p class="font-extrabold text-sm">{subheading}</p>
            <h2 class="text-4.5xl font-bold">{title}</h2>
        </header>
        <slot name="accordionFooter" slot="footer" />
    </DetailsAccordionGroup>

    <div class="space-y-4">
        <Anchor id="gallery" />
        <Gallery {gallery} />
        {#if secondaryImage}
            <!-- svelte-ignore a11y-missing-attribute  -->
            <img class="rounded-xl" {...secondaryImage} />
        {/if}
    </div>
</section>

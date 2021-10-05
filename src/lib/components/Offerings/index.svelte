<script lang="ts" context="module">
    import type { AcfImage, AcfLink } from "$lib/index.type"

    interface OfferingFields {
        image: AcfImage
        subheading: string
        title: string
        contentHtml: string
        link: AcfLink
    }
</script>

<script lang="ts">
    import Anchor from "$lib/components/Anchor.svelte"
    import ContentRow, { schemes } from "$lib/components/ContentRow/index.svelte"

    export let offerings: OfferingFields[]
    export let anchorId: string = undefined
</script>

<Anchor id={anchorId} />
{#each offerings as { image, subheading, title, contentHtml, link }, index}
    <ContentRow
        scheme={index === offerings.length - 1 ? schemes.grey : schemes.light}
        heading={title}
        {subheading}
        {contentHtml}
        gallery={[image]}
        links={link ? [link] : []}
        line={index < offerings.length - 2}
    />
{/each}

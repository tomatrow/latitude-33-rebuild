<script lang="ts">
    import type { AcfImage } from "$lib/index.type"
    import Link from "./Link.svelte"
    import Anchor from "$lib/components/Anchor.svelte"
    import Heading, { increment } from "$lib/components/typography/Heading.svelte"
    import Video from "$lib/components/Video/index.svelte"
    // import Content from "$lib/components/ContentRow/Content.svelte"

    increment()

    export let title: string
    export let subheading = ""
    // export let contentHtml = ""
    export let backgroundImage: AcfImage
    export let footer: any = undefined
    export let anchorId: string = undefined

    let clazz = ""
    export { clazz as class }

    const bgClasses = "z-[-1] absolute inset-0 w-full h-full"
</script>

<section class="text-white relative {clazz}">
    <Anchor id={anchorId} />
    <div
        class="px-5 md:px-[3.75rem] flex items-center justify-start w-full min-h-[500px]"
        style="background-image: linear-gradient(rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32))"
    >
        <div class="space-y-6 w-full">
            <Heading large {subheading}>
                {title}
            </Heading>
            <slot>
                <!-- <Content {contentHtml} /> -->
            </slot>
            {#if footer?.link}
                <Link
                    class="flex-shrink-0 py-2 px-4 font-extralight uppercase inline-block"
                    ease
                    fill="black"
                    border
                    color="white"
                    {...footer.link}
                />
            {/if}
        </div>
    </div>
    {#if $$slots.sources}
        <Video
            autoplay
            loop
            muted
            playsinline
            class="object-cover {bgClasses}"
            poster={backgroundImage}
        >
            <slot name="sources" />
        </Video>
    {:else if backgroundImage}
        <div
            class="bg-fixed bg-cover bg-center {bgClasses}"
            style="background-image: url({backgroundImage?.src})"
        />
    {/if}
</section>

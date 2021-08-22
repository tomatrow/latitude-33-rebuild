<script lang="ts">
    import type { AcfImage, AcfLink } from "$lib/index.type"
    import Link from "$lib/components/Link.svelte"
    import type { OfferingColorSchemes } from "./index.svelte"
    import Content from "./Content.svelte"

    export let image: AcfImage
    export let subheading: string
    export let title: string
    export let contentHtml: string
    export let link: AcfLink

    export let full = false
    export let schemes: OfferingColorSchemes

    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} grid grid-cols-1 md:grid-cols-2" class:md:gap-x-8={!full}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
        {...image}
        class:max-w-2xl={!full}
        class="md:max-h-[90%] rounded-2xl md:order-last my-4 md:my-0 mx-auto md:mr-0 w-full md:rounded-tl-none md:rounded-tr-none md:rounded-br-none"
    />
    <div class="my-4 md:my-0 mx-auto md:pt-24 md:pr-5 md:pl-6 max-w-lg lg:max-w-xl">
        <div class="text-{schemes.mobile.foreground} space-y-3 my-4 md:my-8 mx-auto">
            <Content {subheading} {title} {contentHtml} {schemes} />
        </div>
        {#if link}
            <Link
                shadow
                pill
                ease
                filled
                color={schemes.mobile.button}
                class="inline-block mt-4 py-4 px-6 text-white text-sm"
                {...link}
            />
        {/if}
    </div>
</section>

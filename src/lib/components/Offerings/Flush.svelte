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
    export let schemes: OfferingColorSchemes

    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} grid grid-cols-1 md:grid-cols-2">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
        {...image}
        class="rounded-2xl md:order-last my-4 md:my-8 mx-auto md:mr-6 lg:mr-auto max-w-xl lg:max-w-4xl w-11/12"
    />
    <div
        class="text-{schemes.mobile
            .foreground} space-y-3 mx-auto md:pr-5 pb-12 md:pl-6 max-w-lg lg:max-w-xl"
    >
        <Content {subheading} {title} {contentHtml} {schemes} />
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

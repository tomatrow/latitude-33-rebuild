<script lang="ts">
    import type { AcfImage, AcfLink } from "$lib/index.type"
    import type { OfferingColorSchemes } from "./index.svelte"
    import { classes } from "$lib/actions/styles"
    import Link from "$lib/components/Link.svelte"
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

<section class="{clazz} grid grid-cols-1 md:grid-cols-2 md:gap-x-18">
    <div class="my-4 md:my-8 mx-auto md:mr-0 md:pl-5">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img
            class="rounded-xl ease-in-out hover:shadow-card transform transition duration-200 hover:-translate-y-3 z-10 w-full max-w-lg"
            {...image}
        />
    </div>

    <div
        class="text-{schemes.mobile.foreground} my-4 md:my-8 mx-auto md:ml-0 pb-12 max-w-xl"
        use:classes={schemes.desktop && `md:text-${schemes.desktop.foreground}`}
    >
        <Content {subheading} {title} {contentHtml} {schemes} />
        {#if link}
            <Link
                shadow
                blob
                outline
                ease
                filled
                border
                color={schemes.mobile.button}
                class="inline-block mt-4 py-4 px-6 text-white text-sm"
                {...link}
            />
        {/if}
    </div>
</section>

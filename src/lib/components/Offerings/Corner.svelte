<script lang="ts">
    import type { AcfImage, AcfLink, ColorScheme } from "$lib/index.type"
    import Link from "$lib/components/Link.svelte"

    export let image: AcfImage
    export let subheading: string
    export let title: string
    export let contentHtml: string
    export let link: AcfLink

    export let full = false
    export let scheme: ColorScheme

    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} grid grid-cols-1 md:grid-cols-2" class:md:gap-x-8={!full}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
        {...image}
        class:max-w-xl={!full}
        class="rounded-2xl md:order-last my-4 md:my-0 mx-auto md:mr-0 w-full md:rounded-tl-none md:rounded-tr-none md:rounded-br-none"
    />
    <div class="my-4 md:my-0 mx-auto md:pt-24 md:pr-5 md:pl-6 max-w-full">
        <div class="text-{scheme.foreground} space-y-3 mx-auto max-w-lg lg:max-w-xl">
            {#if subheading}
                <h5 class="text-{scheme.accent} font-display font-bold md:text-xl">
                    {subheading}
                </h5>
            {/if}
            <h4 class="font-display md:pr-18 font-black text-3xl md:text-5xl">{title}</h4>
            <div class="injected-content injected-content_large">
                {@html contentHtml}
            </div>
        </div>
        {#if link}
            <Link
                shadow
                pill
                ease
                filled
                color={scheme.button}
                class="inline-block mt-4 py-4 px-6 text-white font-black text-sm"
                {...link}
            />
        {/if}
    </div>
</section>

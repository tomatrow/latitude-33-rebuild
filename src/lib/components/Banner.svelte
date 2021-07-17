<script lang="ts">
    import type { AcfImage } from "$lib/index.type"
    import { cssVars } from "$lib/actions/styles"
    import Colors from "$lib/data/colors.json"
    import Link from "./Link.svelte"

    export let smallTitle = false

    export let title: string
    export let subheading = ""
    export let contentHtml = ""
    export let backgroundImage: AcfImage
    export let footer: any = undefined
</script>

<section
    class="bg-cover bg-no-repeat text-white"
    use:cssVars={{
        url: `url(${backgroundImage.src})`
    }}
>
    <div class="space-y-6 mx-5 md:mx-10 py-24 max-w-lg">
        {#if subheading}
            <h5 class="font-display mb-2.5 text-white font-extrabold text-sm">{subheading}</h5>
        {/if}
        <h1
            class="{smallTitle
                ? 'md:text-5.5xl text-3.5xl'
                : 'md:text-7xl text-4xl'} font-display font-black "
        >
            {title}
        </h1>
        <div
            class="injected-content injected-content_large mt-6"
            use:cssVars={{
                injectedLinkColor: Colors["disappointment-blue"]
            }}
        >
            {@html contentHtml}
        </div>
        <slot />
    </div>
    {#if footer?.link || footer?.blurb}
        <hr class="bg-white opacity-25" />
        <div
            class="space-y-4 md:space-x-12 md:space-y-0 flex items-center flex-col md:flex-row justify-between py-12 px-10"
        >
            {#if footer.blurb}
                <span class="airy-copy text-center md:text-left">{footer.blurb}</span>
            {/if}
            {#if footer.link}
                <Link
                    class="bg-pre-coffee-sky-blue border-pre-coffee-sky-blue flex-shrink-0 py-4 px-6 border-2"
                    blob
                    shadow
                    ease
                    {...footer.link}
                />
            {/if}
        </div>
    {/if}
</section>

<style lang="postcss">
    section {
        background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), var(--url);
    }
</style>

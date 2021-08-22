<script lang="ts">
    import type { AcfImage } from "$lib/index.type"
    import { cssVars } from "$lib/actions/styles"
    import Colors from "$lib/data/colors.json"
    import Link from "./Link.svelte"
    import Anchor from "$lib/components/Anchor.svelte"

    export let title: string
    export let subheading = ""
    export let contentHtml = ""
    export let backgroundImage: AcfImage
    export let footer: any = undefined
    export let anchorId: string = undefined
</script>

<section
    class="bg-cover bg-no-repeat text-white"
    use:cssVars={{
        url: `url(${backgroundImage.src})`
    }}
>
    <Anchor id={anchorId} />
    <div class="space-y-6 py-14 mx-5 md:mx-10 max-w-lg">
        {#if subheading}
            <h5 class="font-display mb-2.5 text-white text-lg">{subheading}</h5>
        {/if}
        <h1 class="text-3.5xl font-display font-light">
            {title}
        </h1>
        <div
            class="injected-content injected-content_large mt-6"
            use:cssVars={{
                injectedLinkColor: Colors["pre-coffee-sky-blue"]
            }}
        >
            {@html contentHtml}
        </div>
        <slot />
    </div>
    {#if footer?.link || footer?.blurb}
        <div
            class="space-y-4 md:space-x-12 md:space-y-0 flex items-center flex-col md:flex-row justify-start py-12 px-10"
        >
            {#if footer.blurb}
                <span class="airy-copy text-center md:text-left">{footer.blurb}</span>
            {/if}
            {#if footer.link}
                <Link
                    class="flex-shrink-0 py-4 px-6 border-2"
                    blob
                    shadow
                    ease
                    filled
                    border
                    color="velours-bleu"
                    {...footer.link}
                />
            {/if}
        </div>
    {/if}
</section>

<style lang="postcss">
    section {
        background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--url);
    }
</style>

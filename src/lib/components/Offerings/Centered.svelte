<script lang="ts">
    import type { AcfImage, AcfLink } from "$lib/index.type"
    import type { OfferingColorSchemes } from "./index.svelte"
    import { classes, cssVars } from "$lib/actions/styles"
    import Colors from "$lib/data/colors.json"
    import Link from "$lib/components/Link.svelte"

    export let image: AcfImage
    export let subheading: string
    export let title: string
    export let contentHtml: string
    export let link: AcfLink

    export let schemes: OfferingColorSchemes

    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} grid grid-cols-1 md:grid-cols-2 gap-y-9 md:gap-y-0 md:gap-x-18">
    <div class="mx-auto md:mr-0 md:pl-5">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img
            class="rounded-xl ease-in-out hover:shadow-card transform transition duration-200 hover:-translate-y-3 z-10 w-full max-w-lg"
            {...image}
        />
    </div>

    <div
        class="text-{schemes.mobile.foreground} mx-auto md:ml-0 pb-12 max-w-xl"
        use:classes={schemes.desktop && `md:text-${schemes.desktop.foreground}`}
    >
        {#if subheading}
            <h5
                class="text-{schemes.mobile.accent} font-display font-bold md:text-xl"
                use:classes={schemes.desktop && `md:text-${schemes.desktop.accent}`}
            >
                {subheading}
            </h5>
        {/if}
        <h4 class="font-display md:pr-18 mt-2 mb-6 font-black text-2xl md:text-5xl">
            {title}
        </h4>
        <div
            class="injected-content injected-content_large"
            use:cssVars={{
                injectedLinkColorDesktop: Colors[schemes.desktop?.link]
            }}
        >
            {@html contentHtml}
        </div>
        {#if link}
            <Link
                shadow
                blob
                outline
                ease
                filled
                border
                color={schemes.mobile.button}
                class="inline-block mt-4 py-4 px-6 text-white font-black text-sm"
                {...link}
            />
        {/if}
    </div>
</section>

<style lang="postcss">
    @screen md {
        .injected-content {
            --injected-link-color: var(--injected-link-color-desktop);
        }
    }
</style>

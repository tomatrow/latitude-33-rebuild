<script lang="ts">
    import type { OfferingColorSchemes } from "./index.svelte"
    import { classes, cssVars } from "$lib/actions/styles"
    import Colors from "$lib/data/colors.json"

    export let schemes: OfferingColorSchemes
    export let subheading: string = undefined
    export let title: string
    export let contentHtml: string
</script>

{#if subheading}
    <h5
        class="text-{schemes.mobile.accent} font-display text-lg"
        use:classes={schemes.desktop && `md:text-${schemes.desktop.accent}`}
    >
        {subheading}
    </h5>
{/if}
<h4 class="font-display md:pr-18 mt-2 mb-6 text-3.5xl font-light">
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

<style lang="postcss">
    @screen md {
        .injected-content {
            --injected-link-color: var(--injected-link-color-desktop);
        }
    }
</style>

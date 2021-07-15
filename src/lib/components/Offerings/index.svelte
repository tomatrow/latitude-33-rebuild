<script lang="ts" context="module">
    import type { ColorScheme, PrimaryColor, AcfImage, AcfLink } from "$lib/index.type"

    export interface OfferingColorScheme extends ColorScheme {
        background: PrimaryColor
        foreground: PrimaryColor
        accent: PrimaryColor
        button: PrimaryColor
        link: PrimaryColor
    }

    export interface OfferingColorSchemes {
        mobile: OfferingColorScheme
        desktop?: OfferingColorScheme
    }

    interface OfferingFields {
        image: AcfImage
        subheading: string
        title: string
        contentHtml: string
        link: AcfLink
    }

    export const standardSchemes: Record<string, OfferingColorScheme> = {
        light: {
            accent: "either-gray-blue",
            background: "white",
            foreground: "black",
            button: "pre-coffee-sky-blue",
            link: "either-gray-blue"
        },
        dark: {
            accent: "white",
            background: "either-gray-blue",
            foreground: "white",
            button: "pre-coffee-sky-blue",
            link: "the-girl-is-looking-at-the-sky"
        },
        tan: {
            accent: "either-gray-blue",
            background: "scorpion-tan",
            foreground: "black",
            button: "pre-coffee-sky-blue",
            link: "either-gray-blue"
        }
    }
</script>

<script lang="ts">
    import Colors from "$lib/data/colors.json"
    import { cssVars, classes } from "$lib/actions/styles"
    import CornerOffering from "./Corner.svelte"
    import CenteredOffering from "./Centered.svelte"
    import FlushOffering from "./Flush.svelte"

    export let offerings: OfferingFields[]
    export let style: any
    export let isFlush: any

    const verticalPadding =
        style.backgroundColor === "white"
            ? ""
            : style.hasCorner
            ? "py-12 md:pt-0 md:pb-18"
            : style.layout === "centered"
            ? "py-12 md:py-24"
            : style.layout === "flush"
            ? "py-12 md:py-18"
            : ""

    let scheme: OfferingColorScheme
    switch (style.backgroundColor as PrimaryColor) {
        case "either-gray-blue":
            scheme = standardSchemes.dark
            break
        case "white":
            scheme = standardSchemes.light
            break
        case "scorpion-tan":
            scheme = standardSchemes.tan
            break
        default:
            scheme = standardSchemes.dark
            break
    }
</script>

<section
    class="{verticalPadding} bg-{scheme.background} space-y-9 md:space-y-18 px-5 md:px-0"
    class:corner={style.hasCorner}
    use:classes={[!isFlush.top && "mt-12 md:mt-24", !isFlush.bottom && "mb-12 md:mb-24"]}
    use:cssVars={{
        injectedLinkColor: Colors[scheme.link],
        halfBgColor: `${Colors[scheme.background]} 50%`
    }}
>
    {#each offerings as fields, index}
        {#if index === 0 && style.hasCorner}
            <CornerOffering full={style.largeCornerImage} {scheme} {...fields} />
        {:else if style.layout === "centered"}
            <CenteredOffering
                schemes={{
                    mobile: scheme,
                    desktop: style.hasCorner ? null : standardSchemes.light
                }}
                {...fields}
            />
        {:else if style.layout === "flush"}
            <FlushOffering {scheme} {...fields} />
        {/if}
    {/each}
</section>

<style lang="postcss">
    @screen md {
        :global(#svelte) section {
            background-image: linear-gradient(90deg, var(--half-bg-color), transparent 50%);
            &:not(.corner) {
                @apply bg-transparent;
            }
        }
    }
</style>

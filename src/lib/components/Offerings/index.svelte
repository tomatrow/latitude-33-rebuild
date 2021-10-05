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
            accent: "velours-bleu",
            background: "white",
            foreground: "black",
            button: "velours-bleu",
            link: "velours-bleu"
        },
        dark: {
            accent: "white",
            background: "a-stormy-morning",
            foreground: "white",
            button: "velours-bleu",
            link: "sarcastic-orange"
        },
        tan: {
            accent: "a-stormy-morning",
            background: "scorpion-tan",
            foreground: "black",
            button: "velours-bleu",
            link: "velours-bleu"
        }
    }
</script>

<script lang="ts">
    import Colors from "$lib/data/colors.json"
    import { cssVars, classes } from "$lib/actions/styles"
    import Anchor from "$lib/components/Anchor.svelte"
    import ContentRow, { schemes } from "$lib/components/ContentRow/index.svelte"
    import type { ResponsiveContentRowScheme } from "$lib/components/ContentRow/index.svelte"

    export let offerings: OfferingFields[]
    export let style: any
    export let anchorId: string = undefined

    let scheme: ResponsiveContentRowScheme
    switch (style.backgroundColor as PrimaryColor) {
        case "either-gray-blue":
            scheme = schemes.dark
            break
        case "white":
            scheme = schemes.light
            break
        case "scorpion-tan":
            scheme = schemes.grey
            break
        default:
            scheme = schemes.dark
            break
    }
</script>

<Anchor id={anchorId} />
{#each offerings as { image, subheading, title, contentHtml, link }, index}
    <ContentRow
        {scheme}
        heading={title}
        {subheading}
        {contentHtml}
        gallery={[image]}
        links={link ? [link] : []}
        line={0 < index && index < offerings.length - 1}
    />
{/each}

<script lang="ts" context="module">
    import type { ColorScheme, ResponsiveScheme, PrimaryColor } from "$lib/index.type"

    export interface ContentRowScheme extends ColorScheme {
        accent: PrimaryColor
        background: PrimaryColor
        midground: PrimaryColor
        foreground: PrimaryColor
        link: PrimaryColor
        button: PrimaryColor
    }

    export type ResponsiveContentRowScheme = ResponsiveScheme<ContentRowScheme>

    export const schemes: Record<string, ResponsiveContentRowScheme> = {
        light: {
            mobile: {
                accent: "sarcastic-orange",
                background: "white",
                midground: "white",
                foreground: "black",
                link: "velours-bleu",
                button: "either-gray-blue"
            }
        },
        dark: {
            mobile: {
                accent: "sarcastic-orange",
                background: "a-stormy-morning",
                midground: "new-farah-hotel",
                foreground: "white",
                link: "velours-bleu",
                button: "either-gray-blue"
            }
        },
        grey: {
            mobile: {
                accent: "sarcastic-orange",
                background: "white",
                midground: "new-farah-hotel",
                foreground: "black",
                link: "velours-bleu",
                button: "either-gray-blue"
            }
        }
    }
</script>

<script lang="ts">
    import type { AcfImage, AcfLink } from "$lib/index.type"
    import Heading, { increment } from "$lib/components/typography/Heading.svelte"
    import Colors from "$lib/data/colors.json"
    import Link from "$lib/components/Link.svelte"
    import GalleryCarousel from "$lib/components/GalleryCarousel.svelte"
    import Content from "./Content.svelte"

    increment()

    export let heading: string = undefined
    export let subheading: string = undefined
    export let contentHtml: string = undefined
    export let gallery: AcfImage[] = []
    export let links: AcfLink[] = []
    export let scheme: ResponsiveContentRowScheme = schemes.light

    export let line: boolean = undefined

    function descheme(config: Record<string, keyof ContentRowScheme> = {}) {
        return Object.entries(config)
            .map(
                ([clazz, key]) =>
                    `${clazz}-${scheme.mobile[key]}` +
                    (scheme.desktop ? ` sm:${clazz}-${scheme.desktop[key]}` : "")
            )
            .join(" ")
    }

    const galleryClasses = "md:max-w-[31%] w-full self-start flex-shrink-0 ml-auto"
</script>

<section class="relative px-5 py-4 sm:px-[60px] sm:py-[30px]">
    <div
        class="z-[-1] absolute left-0 top-0 bottom-0 w-full md:w-[70%] {descheme({
            bg: 'midground'
        })}"
    />
    <div class="flex flex-col-reverse md:flex-row gap-4">
        <div class="mt-[20px] space-y-[10px]">
            <Heading {subheading}>
                <slot name="heading">
                    {heading}
                </slot>
            </Heading>
            <div class="w-full sm:w-[60%] space-y-4">
                <slot>
                    <Content
                        class="content-row-injection"
                        {contentHtml}
                        --mobile={Colors[scheme.mobile.link]}
                        --desktop={Colors[scheme.desktop?.link] ?? Colors[scheme.mobile.link]}
                    />
                </slot>
                {#if links.length > 0}
                    {#each links as link}
                        <Link
                            border
                            ease
                            class="text-sm font-extralight bg-{scheme.mobile
                                .button} hover:bg-white text-white hover:text-{scheme.mobile
                                .button} px-4 py-2 inline-block"
                            color={scheme.mobile.button}
                            {...link}
                        />
                    {/each}
                {/if}
            </div>
        </div>
        {#if gallery.length === 1}
            <!-- svelte-ignore a11y-missing-attribute -->
            <img class={galleryClasses} {...gallery[0]} />
        {:else if gallery.length > 1}
            <GalleryCarousel class="h-44 {galleryClasses}" {gallery} />
        {/if}
    </div>
    {#if line}
        <div
            class="absolute h-px w-full max-w-[225px] left-[3%] bottom-0 {descheme({
                bg: 'accent'
            })}"
        />
    {/if}
</section>

<style lang="postcss" global>
    .content-row-injection {
        --injected-link-color: var(--mobile);
    }
    @screen md {
        .content-row-injection {
            --injected-link-color: var(--desktop);
        }
    }
</style>

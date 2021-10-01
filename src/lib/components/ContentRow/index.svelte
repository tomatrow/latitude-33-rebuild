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
    import { cssVars } from "$lib/actions/styles"
    import Colors from "$lib/data/colors.json"
    import Link from "$lib/components/Link.svelte"
    
    increment()

    export let heading: string 
    export let subheading: string = undefined
    export let contentHtml: string = undefined
    export let gallery: AcfImage[] = []
    export let links: AcfLink[] = []
    export let scheme: ResponsiveContentRowScheme = schemes.light
    
    export let line: boolean = undefined
    
    function descheme(config: Record<string, keyof ContentRowScheme> = {}) {
        return Object.entries(config)
        .map(([clazz, key]) => `${clazz}-${scheme.mobile[key]}` + (scheme.desktop ? ` sm:${clazz}-${scheme.desktop[key]}` :''))
        .join(" ")
    }
</script>

<section class="relative px-5 py-4 sm:px-[60px] sm:py-[30px]">
    <div class="z-[-1] absolute left-0 top-0 bottom-0 sm:w-[70%] {descheme({ 'bg': 'midground' })}"/>
    <div class="flex flex-col-reverse sm:flex-row gap-4">
        <div class="mt-[20px] space-y-[10px]">
            <Heading {subheading}>{heading}</Heading>
            <div class="w-full sm:w-[60%] space-y-4">
                <slot>
                    {#if contentHtml}
                        <div class="injected-content" use:cssVars={{ mobile: Colors[scheme.mobile.link], desktop: Colors[scheme.desktop?.link] ?? Colors[scheme.mobile.link] }}>
                            {@html contentHtml}
                        </div>
                    {/if}
                </slot>
                {#if links.length > 0}
                    {#each links as link}
                        <Link border ease class="text-sm font-extralight bg-{scheme.mobile.button} hover:bg-white text-white hover:text-{scheme.mobile.button} px-4 py-2 inline-block" color={scheme.mobile.button}  {...link}/>
                    {/each}
                {/if}
            </div>
        </div>
        {#if gallery.length > 0}
            <!-- svelte-ignore a11y-missing-attribute -->
            <img class="sm:max-w-[31%] max-h-full w-full object-contain self-start" {...gallery[0]} />
        {/if}
    </div>
    {#if line}
        <div class="absolute h-px w-full max-w-[225px] left-[3%] bottom-0 {descheme({ 'bg': 'accent' })}" />
    {/if}
</section>

<style lang="postcss">
    .injected-content {
        --injected-link-color: var(--mobile);
    }
    @screen md {
        .injected-content {
            --injected-link-color: var(--desktop);
        }
    }
</style>

<script lang="ts">
    import type { AcfImage, AcfLink } from "$lib/index.type"
    import Heading, { increment } from "$lib/components/typography/Heading.svelte"
    import { cssVars } from "$lib/actions/styles"
    import Colors from "$lib/data/colors.json"
    import Link, { themes } from "$lib/components/Link.svelte"
    import { prefetch } from "$app/navigation"

    export let heading: string = undefined
    export let image: AcfImage = undefined
    export let contentHtml: string = undefined
    export let link: AcfLink = undefined
    let clazz: string = ""
    export { clazz as class }

    heading && increment()

    function prefetchLink() {
        prefetch(link.href)
    }
</script>

<section
    class="shadow-card bg-white border border-new-farah-hotel {clazz}"
    on:mouseover={prefetchLink}
    on:focus={prefetchLink}
>
    <div
        class="gradient-overlay px-[10px] pt-[10px] h-44 flex items-end justify-start"
        style={image?.src ? `--bg: url(${image.src})` : ""}
    >
        {#if heading || $$slots.heading}
            <Heading class="text-white font-semibold" tiny>
                <span class="contents font-semibold">
                    <slot name="heading">
                        {heading}
                    </slot>
                </span>
            </Heading>
        {/if}
    </div>
    {#if $$slots.default || contentHtml || link}
        <div class="p-[10px]">
            <slot>
                {#if contentHtml}
                    <div class="injected-content">
                        {@html contentHtml}
                    </div>
                {/if}
            </slot>
            {#if link}
                <div class="mt-[10px]">
                    <Link
                        filled
                        {...themes.dark("text-sm inline-block")}
                        {...link}
                    >
                        <slot name="link">
                            {link.title}
                        </slot>
                    </Link>
                </div>
            {/if}
        </div>
    {/if}
</section>

<style lang="postcss">
    .gradient-overlay {
        background-size: auto, cover;
        background-position: center, center;
        background-repeat: no-repeat, no-repeat;
        background-image: linear-gradient(rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32)),
            var(--bg, var(--pixel-white));
    }
</style>

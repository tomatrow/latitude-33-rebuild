<script lang="ts">
    import type { AcfImage } from "$lib/index.type"
    import { cssVars } from "$lib/actions/styles"
    import Colors from "$lib/data/colors.json"
    import Link from "./Link.svelte"
    import Anchor from "$lib/components/Anchor.svelte"
    import Heading, { increment } from "$lib/components/typography/Heading.svelte"
    
    increment()
    
    export let title: string
    export let subheading = ""
    export let contentHtml = ""
    export let backgroundImage: AcfImage
    export let footer: any = undefined
    export let anchorId: string = undefined
</script>

<section
    class="text-white bg-fixed bg-cover bg-center"
    style="background-image: var(--url)"
    use:cssVars={{
        url: `url(${backgroundImage.src})`
    }}
>
    <Anchor id={anchorId} />
    <div class="gradient px-5 md:px-[3.75rem] flex items-center justify-start w-full min-h-[500px]">
        <div class="space-y-6">
            <Heading large {subheading}>
                {title}
            </Heading>
            {#if footer.link}
                <Link
                    class="flex-shrink-0 py-2 px-4 font-extralight uppercase inline-block"
                    ease
                    fill="black"
                    border
                    color="white"
                    {...footer.link}
                />
            {/if}
            <slot />
        </div>
    </div>
</section>

<style lang="postcss">
    .gradient {
        background-size: auto;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: auto;
        background-image: linear-gradient(rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32));
    }
</style>

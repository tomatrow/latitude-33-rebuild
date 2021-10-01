<script lang="ts">
    import { prefetch } from "$app/navigation"
    import Link from "$lib/components/Link.svelte"
    import type { AcfImage, AcfLink } from "$lib/index.type"

    export let title: string
    export let image: AcfImage = undefined
    export let link: AcfLink

    let clazz = ""
    export { clazz as class }
    export let style = ""

    function prefetchLink() {
        prefetch(link.href)
    }
</script>

<div
    class="{clazz} collection-item gap-4 flex w-auto items-start flex-col justify-end py-4 px-5 h-full"
    style="{image?.src ? `--bg: url(${image.src});` : ''} {style}"
    on:mouseover={prefetchLink}
    on:focus={prefetchLink}
>
    <slot name="title" {title}>
        <h3 class="font-extralight font-display text-white italic text-lg sm:text-2xl">
            {title}
        </h3>
    </slot>
    <slot name="link" {link}>
        <Link
            ease
            shadow
            sveltekit:prefetch
            color="white"
            border
            class="font-extralight font-display flex-shrink-0 py-2 px-4 text-white text-center whitespace-no-wrap italic text-sm"
            {...link}
        />
    </slot>
</div>

<style lang="postcss">
    .collection-item {
        background-image: linear-gradient(
                0deg,
                theme("colors.a-stormy-morning"),
                rgba(209, 211, 212, 0.08) 68%
            ),
            var(--bg);
        background-position: center, center;
        background-size: cover;
        background-repeat: no-repeat, no-repeat;
    }
</style>

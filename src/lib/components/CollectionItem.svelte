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
</script>

<div
    class="{clazz} flex w-auto flex-col justify-end h-full bg-center bg-cover bg-no-repeat"
    style="{image?.src ? `background-image: url(${image.src});` : ''} {style}"
    on:mouseover={() => prefetch(link.href)}
>
    <div
        class="font-display flex items-center justify-between mt-auto px-5 h-16 text-white"
        style="background-color: rgba(0,0,0,0.75)"
    >
        <slot name="title" {title}>
            <h3 class="font-black text-lg sm:text-2xl">{title}</h3>
        </slot>
        <slot name="link" {link}>
            <Link
                ease
                pill
                filled
                shadow
                sveltekit:prefetch
                color="either-gray-blue"
                class="flex-shrink-0 py-2 px-4 text-center whitespace-no-wrap font-semibold text-sm"
                {...link}
            />
        </slot>
    </div>
</div>

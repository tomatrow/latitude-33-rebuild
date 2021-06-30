<script lang="ts">
    import Link from "$lib/components/Link.svelte"

    export let image: any
    export let subheading: string
    export let title: string
    export let contentHtml: string
    export let link: any
    export let accentColor: string

    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} grid grid-cols-1 md:grid-cols-2">
    <img {...image} class="rounded-2xl md:order-last mx-auto md:mr-6 w-full max-w-xl" />
    <div class="space-y-3 mx-auto md:pr-5 md:pl-6 max-w-lg lg:max-w-xl">
        {#if subheading}
            <h5 class="text-{accentColor} font-display font-bold md:text-xl">
                {subheading}
            </h5>
        {/if}
        <h4 class="font-display md:pr-18 font-black text-3xl md:text-5xl">{title}</h4>
        <div class="injected-content injected-content_large">
            {@html contentHtml}
        </div>
        {#if link}
            <Link
                shadow
                pill
                ease
                class="bg-pre-coffee-sky-blue inline-block mt-4 py-4 px-6 text-white font-black text-sm"
                {...link}
            />
        {/if}
    </div>
</section>

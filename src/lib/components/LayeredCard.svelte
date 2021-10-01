<script lang="ts">
    import type { AcfImage } from "$lib/index.type"
    import Heading from "$lib/components/typography/Heading.svelte"

    let clazz = ""
    export { clazz as class }
    export let image: AcfImage
    export let subheading: string
    export let title: string
    export let contentHtml: string
</script>

<div class="{clazz} lg:flex lg:items-start lg:justify-center">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
        class="border-opacity-80 mx-auto lg:mx-0 w-full max-w-sm border border-white"
        {...image}
    />

    <div
        class="space-y-6 lg:mt-18 lg:-ml-18 border-opacity-80 lg:ml-[-18] flex flex-col mt-4 mx-auto lg:mr-0 p-5 sm:p-12 max-w-xl border border-white bg-white"
    >
        <Heading reverse class="text-sarcastic-orange" {subheading}><span class="text-black">{title}</span></Heading>
        <div class="injected-content">{@html contentHtml}</div>
    </div>
</div>

<script lang="ts">
    import type { AcfImage } from "$lib/index.type"

    let clazz = ""
    export { clazz as class }
    export let image: AcfImage
    export let subheading: string = undefined
    export let title: string
    export let contentHtml: string = undefined
</script>

<section class="{clazz} lg:flex lg:items-start lg:justify-center">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
        class="rounded-2xl border-opacity-80 mx-auto lg:mx-0 w-full max-w-sm border border-white"
        {...image}
    />

    <div
        class="space-y-6 lg:mt-18 lg:-ml-18 border-opacity-80 lg:ml-[-18] flex flex-col mt-4 mx-auto lg:mr-0 p-5 sm:p-12 max-w-xl border border-white rounded-lg bg-white"
    >
        {#if subheading}
            <p class="text-sarcastic-orange font-display font-light text-lg">{subheading}</p>
        {/if}
        <h4 class="font-display text-4.5xl font-light">{title}</h4>
        {#if contentHtml}
            <div class="injected-content">{@html contentHtml}</div>
        {/if}
    </div>
</section>

<script lang="ts">
    import type { AcfImage } from "$lib/index.type"

    export let pill: { title: string; icon: AcfImage }
    export let featuredImage: AcfImage
    export let contentHtml: string
    export let title: string

    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} space-y-5 flex flex-col">
    <div
        class="bg-sarcastic-orange space-x-2 inline-flex items-center justify-center mr-auto py-2 sm:py-3 px-4 sm:px-6 max-w-lg rounded-full"
    >
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="sm:w-18 sm:h-18 brightness-[100] w-12 h-12" {...pill.icon} />
        <span class="font-display text-2.5xl sm:text-3.5xl text-white font-bold">{pill.title}</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-6 md:gap-x-12">
        <div>
            <h1 class="font-display text-3.5xl md:text-5.5xl my-5 font-bold">{title}</h1>
            <div class="injected-content md:injected-content__large">
                {@html contentHtml}
            </div>
        </div>
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="rounded-2xl my-5" {...featuredImage} />
    </div>
</section>

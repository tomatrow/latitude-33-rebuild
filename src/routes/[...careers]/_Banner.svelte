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
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-6 md:gap-x-12">
        <div>
            <h1 class="font-display md:text-3.5xl my-5 font-bold text-xl">{title}</h1>
            <div class="injected-content md:injected-content__large">
                {@html contentHtml}
            </div>
        </div>
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="rounded-2xl my-5" {...featuredImage} />
    </div>
</section>

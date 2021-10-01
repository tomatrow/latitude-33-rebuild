<script lang="ts">
    import type { AcfImage } from "$lib/index.type"
    import Heading from "$lib/components/typography/Heading.svelte"

    export let featuredImage: AcfImage
    export let contentHtml: string
    export let title: string

    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} space-y-5 flex flex-col">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-6 md:gap-x-12">
        <div class="space-y-[10px]">
            <Heading>{title}</Heading>
            <div class="injected-content md:injected-content__large">
                {@html contentHtml}
            </div>
        </div>
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="my-5" {...featuredImage} />
    </div>
</section>

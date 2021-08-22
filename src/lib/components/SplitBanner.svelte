<script lang="ts">
    import Link from "$lib/components/Link.svelte"
    import Arrow from "$lib/components/Arrow.svelte"
    import Colors from "$lib/data/colors"
    import type { AcfImage } from "$lib/index.type"

    export let title: string
    export let contentHtml: string
    export let image: AcfImage
</script>

<section class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-xl py-18 mx-auto px-5">
    <div class="max-w-lg">
        <h1 class="text-3.5xl lg:text-5.5xl font-display my-6 font-bold">
            {title}
        </h1>

        <div
            class="injected-content text-tinted-rear-window"
            style="--injected-link-color: {Colors['disappointment-blue']}"
        >
            {@html contentHtml}
        </div>
    </div>

    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="rounded-xl" {...image} />
</section>

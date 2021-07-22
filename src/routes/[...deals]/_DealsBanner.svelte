<script lang="ts">
    import { Link, Arrow } from "$lib/components"
    import Colors from "$lib/data/colors"
    import type { AcfImage } from "$lib/index.type"
    
    export let title: string 
    export let contentHtml: string
    export let dealsLinkLabel: string
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

        <Link
            class="space-x-4 flex items-center my-4 text-black font-light text-xl"
            arrow="sarcastic-orange"
            href="#deals"
            >{dealsLinkLabel}<Arrow class="text-sarcastic-orange ml-2 w-4 h-4" /></Link
        >
    </div>

    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="rounded-xl" {...image} />
</section>

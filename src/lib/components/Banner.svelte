<script lang="ts">
    import { cssVars } from "$lib/actions/styles"
    import Link from "./Link.svelte"

    export let title: string
    export let contentHtml: string
    export let backgroundImage: any
    export let footer: any
</script>

<section
    class="bg-cover bg-no-repeat text-white"
    use:cssVars={{
        url: `url(${backgroundImage.src})`
    }}
>
    <div class="space-y-6 mx-5 md:mx-10 py-24" style="max-width: 32rem">
        <h1 class="font-display md:text-7xl font-black text-4xl">{title}</h1>
        <div class="banner-injected-content">{@html contentHtml}</div>
        <slot />
    </div>
    <hr class="bg-white opacity-25" />
    <div
        class="space-y-4 md:space-x-12 md:space-y-0 flex items-center flex-col md:flex-row justify-between py-12 px-10"
    >
        <span class="airy-copy text-center md:text-left">{footer.blurb}</span>
        <Link
            class="bg-pre-coffee-sky-blue border-pre-coffee-sky-blue flex-shrink-0 py-4 px-6 border-2"
            blob
            shadow
            {...footer.link}
        />
    </div>
</section>

<style lang="postcss">
    section {
        background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), var(--url);
    }
    :global {
        .banner-injected-content {
            a {
                @apply text-disappointment-blue font-semibold;
            }
        }
    }
</style>

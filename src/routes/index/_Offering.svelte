<script lang="ts">
    import Link from "$lib/components/Link.svelte"

    export let subheading: string
    export let heading: string
    export let contentHtml: string
    export let linkTitle: string
    export let href: string
    export let imageUrl: string
    export let imageAlt: string
</script>

<img
    class="offering-raise transition-transform transition-shadow duration-200 transform hover:-translate-y-3 rounded-xl z-10 mx-auto w-full max-w-lg"
    src={imageUrl}
    alt={imageAlt}
/>

<div class="offering md:pl-14 pt-12 md:pt-24 pb-12">
    <h5 class="font-display text-either-gray-blue font-bold md:text-xl">{subheading}</h5>
    <h4 class="font-display mt-2 mb-6 md:pr-20 font-black text-2xl md:text-5xl">
        {heading}
    </h4>
    <div class="injected-content space-y-10 airy-copy mb-4 md:text-xl">
        {@html contentHtml}
    </div>
    <Link
        shadow
        pill
        class="bg-pre-coffee-sky-blue inline-block py-4 px-6 font-black text-sm"
        {href}>{linkTitle}</Link
    >
</div>

<style global lang="postcss">
    .offering {
        .injected-content a {
            @apply text-either-gray-blue font-semibold;
        }
    }

    .offering-raise:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
    }
</style>

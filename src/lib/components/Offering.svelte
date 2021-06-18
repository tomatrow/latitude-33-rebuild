<script lang="ts">
    import Link from "$lib/components/Link.svelte"

    export let image: any
    export let subheading: string
    export let title: string
    export let contentHtml: string
    export let link: any
</script>

<div class="mx-auto md:px-5">
    <img
        class="rounded-xl offering-raise transition-transform transition-shadow duration-200 transform hover:-translate-y-3 z-10 w-full max-w-lg"
        {...image}
    />
</div>

<div class="md:pl-14 pt-12 md:pt-24 pb-12 max-w-xl">
    <h5 class="font-display text-either-gray-blue font-bold md:text-xl">{subheading}</h5>
    <h4 class="font-display mt-2 mb-6 md:pr-20 font-black text-2xl md:text-5xl">
        {title}
    </h4>
    <div class="offering-injected-content space-y-10 airy-copy mb-4 md:text-xl">
        {@html contentHtml}
    </div>
    <Link
        shadow
        pill
        class="bg-pre-coffee-sky-blue inline-block py-4 px-6 text-white font-black text-sm"
        {...link}
    />
</div>

<style global lang="postcss">
    .offering-injected-content a {
        @apply text-either-gray-blue font-semibold;
    }

    .offering-raise:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
    }
</style>

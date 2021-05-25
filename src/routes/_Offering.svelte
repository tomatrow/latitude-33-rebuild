<script lang="ts">
    import Link from "$lib/components/Link.svelte"

    export let subheading: string
    export let heading: string
    export let contentHtml: string
    export let linkTitle: string
    export let href: string
</script>

<div class="offering pl-14 pt-24 pb-12">
    <h5 class="font-display text-either-gray-blue font-bold text-xl">{subheading}</h5>
    <h4 class="font-display mt-2 mb-6 pr-20 font-black text-5xl">{heading}</h4>
    <div class="injected-content space-y-10 mb-4 tracking-wider font-light text-xl">
        {@html contentHtml}
    </div>
    <Link
        class="action-link transition duration-200 font-display bg-pre-coffee-sky-blue py-4 px-6 rounded text-white font-black text-sm"
        {href}>{linkTitle}</Link
    >
</div>

<style global lang="postcss">
    .offering {
        .injected-content a {
            @apply text-either-gray-blue font-semibold;
        }

        a.action-link:hover {
            box-shadow: inset 0 200px 200px 200px rgba(0, 0, 0, 0.1);
        }
    }
</style>

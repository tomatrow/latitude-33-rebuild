<script lang="ts">
    export let image: any
    export let subheading: string
    export let title: string
    export let contentHtml: string
    export let link: any
</script>

<div class="space-y-3 mx-auto py-6 md:py-24 md:pr-5 md:pl-6 max-w-lg lg:max-w-xl">
    <h4 class="font-display md:pr-20 font-black text-3xl md:text-5xl">{title}</h4>
    <div class="offering-injected-content">
        {@html contentHtml}
    </div>
</div>
<img {...image} class="rounded-2xl mx-auto md:mr-0 w-full max-w-xl" />

<style global lang="postcss">
    .offering-injected-content {
        @apply space-y-3;
        p {
            @apply tracking-wide font-light md:text-xl;
        }
        ul {
            @apply space-y-1 md:space-y-4 pl-10 list-disc;
        }
        strong {
            @apply font-semibold;
        }
    }
</style>

<script lang="ts">
    import type { AcfLink } from "$lib/index.type"
    import Button from "$lib/components/Button.svelte"
    import Link from "$lib/components/Link.svelte"
    import Anchor from "$lib/components/Anchor.svelte"

    export let heading: string = undefined
    export let buttonLabel: string = undefined
    export let link: AcfLink = undefined
    export let contentHtml: string = undefined
    export let anchorId: string = undefined

    const props = {
        ease: true,
        shadow: true,
        blob: true,
        class: "py-4 px-16 border-2 border-white text-2xl"
    }
</script>

<section class="font-display bg-sarcastic-orange gap-y-4 flex flex-col py-10 px-12 text-white">
    <Anchor id={anchorId} />
    {#if heading}
        <h5 class="tracking-px mx-auto text-xl">{heading}</h5>
    {/if}
    {#if contentHtml}
        <div class="injected-content injected-content__large">
            {@html contentHtml}
        </div>
    {/if}
    <slot />
    <div class="flex justify-center">
        {#if link}
            <Link {...{ ...link, ...props }} />
        {:else if buttonLabel}
            <Button on:click title={buttonLabel} {...props} />
        {/if}
    </div>
</section>

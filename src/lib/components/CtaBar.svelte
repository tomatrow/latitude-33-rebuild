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
        border: true, 
        color:"either-gray-blue",
        class:"uppercase text-sm font-extralight bg-either-gray-blue hover:bg-white text-white hover:text-either-gray-blue px-4 py-2 font-display" 
    }
</script>

<section class="font-display bg-sarcastic-orange gap-y-4 flex flex-col py-10 px-12 text-white">
    <Anchor id={anchorId} />
    {#if heading}
        <h5 class="tracking-px text-center mx-auto text-xl">{heading}</h5>
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

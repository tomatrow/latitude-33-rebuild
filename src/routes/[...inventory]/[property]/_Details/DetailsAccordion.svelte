<script lang="ts">
    import { slide } from "svelte/transition"
    import { Accordion } from "renderless-svelte"
    import { Button } from "$lib/components"
    import { ChevronDown } from "$lib/svgs"

    export let label: string
    export let contentHtml: string
</script>

<li class="space-y-6 py-6">
    <Accordion let:toggle let:isOpen>
        <Button class="flex items-center justify-between w-full" on:click={toggle} slot="header"
            ><span class="font-display font-bold text-xs">{label}</span>
            <ChevronDown
                class="{isOpen ? 'rotate-180' : ''} transition duration-400 w-6 h-6"
                strokeWidth={4}
            /></Button
        >
        <div transition:slide>
            <div class="injected-content">{@html contentHtml}</div>
            <slot />
        </div>
    </Accordion>
</li>

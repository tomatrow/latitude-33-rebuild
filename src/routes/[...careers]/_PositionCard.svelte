<script lang="ts">
    import { slide } from "svelte/transition"
    import { Accordion } from "renderless-svelte"
    import { Plus } from "$lib/svgs"
    import { Link, Button } from "$lib/components"
    import type { AcfLink } from "$lib/index.type"

    export let title: string
    export let position: string
    export let location: string
    export let applyLink: AcfLink
    export let descriptionHtml: string

    let clazz = ""
    export { clazz as class }
</script>

<div class="{clazz} rounded-xl hover:shadow-card space-y-8 border bg-white">
    <Accordion>
        <div
            class="flex items-center flex-col sm:flex-row justify-between w-full"
            slot="header"
            let:toggle
            let:isOpen
        >
            <div class="space-y-4 text-left">
                <h3 class="font-display text-black text-2xl">{title}</h3>
                <div class="text-tinted-rear-window">{position}, {location}</div>
            </div>
            <Button on:click={toggle} aria-label="open job description">
                <Plus class="{isOpen ? 'rotate-315' : ''} transition duration-400 block w-8 h-8" />
            </Button>
        </div>
        <div transition:slide>
            <div class="injected-content">{@html descriptionHtml}</div>
            <Link
                filled
                border
                pill
                shadow
                ease
                color="a-taste-of-blueberries"
                class="inline-block my-8 py-2 px-4"
                {...applyLink}
            />
        </div>
    </Accordion>
</div>

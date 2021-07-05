<script lang="ts">
    import { Plus } from "$lib/svgs"
    import { slide } from "svelte/transition"
    import { Accordion } from "renderless-svelte"
    import { Button } from "$lib/components"
    export let name: string
    export let bio: string
    export let position: string
    export let image: any
</script>

<section class="pb-9 rounded-xl border-pre-coffee-sky-blue overflow-hidden border">
    <div class="aspect-w-1 aspect-h-1">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img {...image} class="w-full" />
    </div>
    <div class="px-2">
        <div class="mt-14 h-12">
            <h5 class="font-display text-center font-bold text-lg">{name}</h5>
            <h6
                class="font-display text-tinted-rear-window tracking-px text-center font-light text-sm"
            >
                {position}
            </h6>
        </div>
        <Accordion>
            <Button
                class="space-x-2 flex items-center justify-center my-8 mx-auto"
                slot="header"
                let:toggle
                let:isOpen
                on:click={toggle}
            >
                <h6 class="text-the-girl-is-looking-at-the-sky">More</h6>
                <Plus class="{isOpen ? 'rotate-315' : ''} transition duration-400 block w-5 h-5" />
            </Button>
            <div transition:slide class="injected-content max-h-32 overflow-y-scroll">
                {@html bio}
            </div>
        </Accordion>
    </div>
</section>

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

<section class="rounded-xl border-pre-coffee-sky-blue relative md:static border">
    <div class="aspect-w-1 aspect-h-1 rounded-t-xl overflow-hidden">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img {...image} class="w-full" />
    </div>
    <Accordion>
        <div class="px-2" slot="header" let:isOpen let:toggle>
            <div class="mt-14 h-12">
                <h5 class="font-display text-center font-light text-lg">{name}</h5>
                <h6
                    class="font-display text-tinted-rear-window tracking-px text-center font-light text-sm"
                >
                    {position}
                </h6>
            </div>
            <Button
                filled
                color="a-stormy-morning"
                class="space-x-2 relative flex items-center justify-center my-8 mx-auto py-2 px-4"
                slot="header"
                pill
                on:click={toggle}
            >
                <h6 class="text-white">More</h6>
                <Plus class="{isOpen ? 'rotate-315' : ''} transition duration-400 block w-5 h-5" />
            </Button>
        </div>
        <div
            transition:slide
            class="top-[calc(100%-1rem)] injected-content left-1/2 -translate-x-1/2 w-[90vw] absolute z-10 mt-auto p-4 lg:w-11/12 rounded bg-white shadow-md text-black text-base"
        >
            {@html bio}
        </div>
    </Accordion>
</section>

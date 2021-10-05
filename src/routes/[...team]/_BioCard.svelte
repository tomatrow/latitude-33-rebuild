<script lang="ts">
    import { Plus } from "$lib/svgs"
    import { slide } from "svelte/transition"
    import { Accordion } from "renderless-svelte"
    import { Button } from "$lib/components"
    import Heading from "$lib/components/typography/Heading.svelte"

    export let name: string
    export let bio: string
    export let position: string
    export let image: any
</script>

<section class="border-pre-coffee-sky-blue relative md:static border">
    <div class="aspect-w-1 aspect-h-1 overflow-hidden">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img {...image} class="w-full" />
    </div>
    <Accordion>
        <div class="px-2" slot="header" let:isOpen let:toggle>
            <Heading class="mt-14 h-36 text-center" tiny>
                {name}
                <span slot=subheading class="text-sm">{position}</span>
            </Heading>
            <Button
                ease
                border
                fill="white"
                color="a-stormy-morning"
                class="uppercase space-x-2 relative flex items-center justify-center my-8 mx-auto py-2 px-4"
                slot="header"
                on:click={toggle}
            >
                <h6 class="">More</h6>
                <Plus class="{isOpen ? 'rotate-315' : ''} transition duration-400 block w-5 h-5" />
            </Button>
        </div>
        <div
            transition:slide
            class="top-[calc(100%-1rem)] injected-content left-1/2 -translate-x-1/2 w-[90vw] absolute z-10 mt-auto p-4 lg:w-11/12 bg-white shadow-md text-black text-base"
        >
            {@html bio}
        </div>
    </Accordion>
</section>

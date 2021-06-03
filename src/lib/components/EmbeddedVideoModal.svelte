<script lang="ts">
    import { delay } from "$lib/scripts/utility"
    import { fade } from "svelte/transition"
    import Button from "$lib/components/Button.svelte"
    import Cross from "$lib/svgs/Cross.svelte"
    import { closeModal } from "$lib/components/ModalProvider.svelte"
    export let videoId: string

    let container: HTMLElement

    export let title: string
    export let src: string

    function handleClick({ target }) {
        if (container !== target) closeModal()
    }
</script>

<div
    transition:fade
    class="fixed inset-0 z-50 flex items-center justify-center bg-black"
    on:click={handleClick}
>
    <Cross
        class="opacity-70 transition-opacity duration-200 absolute top-0 right-0 m-8 w-5 h-5 text-white hover:opacity-100 cursor-pointer"
    />
    <div class="w-full lg:w-1/2">
        <div class="aspect-w-16 aspect-h-9" bind:this={container}>
            <iframe
                {title}
                {src}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            />
        </div>
    </div>
</div>

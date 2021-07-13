<script lang="ts">
    import { fade } from "svelte/transition"
    import Button from "$lib/components/Button.svelte"
    import Cross from "$lib/svgs/Cross.svelte"
    import { closeModal } from "$lib/components/ModalProvider.svelte"

    export let shouldClose: (target: HTMLElement) => boolean

    let container: HTMLElement

    function handleClick({ target }) {
        if (container === target || shouldClose?.(target)) closeModal()
    }
</script>

<svelte:window
    on:sveltekit:navigation-start={closeModal}
    on:keydown={({ key }) => ["Escape", "Esc"].includes(key) && closeModal()}
/>

<div
    transition:fade
    class="fixed inset-0 z-50 flex items-center justify-center bg-black"
    bind:this={container}
    on:click={handleClick}
>
    <Button on:click={closeModal} class="z-50">
        <Cross
            class="opacity-70 transition-opacity duration-200 absolute top-0 right-0 m-8 w-5 h-5 text-white hover:opacity-100 cursor-pointer"
        />
    </Button>
    <slot {closeModal} />
</div>

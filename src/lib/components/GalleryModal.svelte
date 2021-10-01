<script lang="ts">
    import type { AcfImage } from "$lib/index.type"
    import ModalWrapper from "./ModalWrapper.svelte"

    export let images: AcfImage[] = []
    export let index: number
</script>

<ModalWrapper shouldClose={target => !target.closest("IMG")}>
    <div class="space-y-4 relative flex items-center flex-col justify-center p-5 h-full" on:click>
        <!-- svelte-ignore  a11y-missing-attribute -->
        <img
            class="z-10 my-auto w-full object-contain"
            {...images[index]}
            style="max-height: 75%"
        />
        {#if images.length > 1}
            <div
                class="inline-grid gap-1 justify-self-end grid-cols-3 sm:grid-cols-6 md:grid-cols-12 h-1/4 bottom-0 left-0 z-20 overflow-y-scroll text-center"
            >
                {#each images as image, imageIndex}
                    <!-- svelte-ignore  a11y-missing-attribute -->
                    <img
                        class="transition-opacity duration-400 w-full h-16 object-cover darken-10 {index === imageIndex ? 'opacity-100' : 'opacity-50'}"
                        {...image}
                        on:click={() => (index = imageIndex)}
                    />
                {/each}
            </div>
        {/if}
    </div>
</ModalWrapper>

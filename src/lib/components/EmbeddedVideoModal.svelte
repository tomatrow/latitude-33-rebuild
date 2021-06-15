<script lang="ts">
    import ModalWrapper from "./ModalWrapper.svelte"

    export let videoId: string
    export let title: string
    export let src: string

    let container: HTMLDivElement
</script>

<ModalWrapper shouldClose={target => target !== container}>
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
</ModalWrapper>

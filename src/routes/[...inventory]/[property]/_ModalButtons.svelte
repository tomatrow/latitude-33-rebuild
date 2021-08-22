<script lang="ts">
    import { openModal } from "$lib/components/ModalProvider.svelte"
    import { Button, EmbeddedVideoModal } from "$lib/components"

    export let matterportId: string
    export let youtubeId: string
    export let matterportLabel: string
    export let videoLabel: string
</script>

{#if matterportId}
    <Button
        filled
        color="pre-coffee-sky-blue"
        shadow
        ease
        class="font-display flex items-center flex-col sm:flex-row mx-auto sm:mx-0 py-2 px-4 rounded-lg text-white font-bold"
        on:click={() =>
            openModal(EmbeddedVideoModal, {
                title: "youtube",
                src: `https://my.matterport.com/show/?m=${matterportId}`
            })}
    >
        {matterportLabel}</Button
    >
{/if}
{#if youtubeId}
    <Button
        filled
        shadow
        ease
        color="pre-coffee-sky-blue"
        class="font-display flex items-center flex-col sm:flex-row mx-auto sm:mx-0 py-2 px-4 rounded-lg text-white font-bold"
        on:click={() =>
            openModal(EmbeddedVideoModal, {
                title: "youtube",
                src: `https://www.youtube.com/embed/${youtubeId}?autoplay=1`
            })}
    >
        {videoLabel}</Button
    >
{/if}

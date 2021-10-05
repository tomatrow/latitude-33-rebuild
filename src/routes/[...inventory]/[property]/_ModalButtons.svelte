<script lang="ts">
    import { openModal } from "$lib/components/ModalProvider.svelte"
    import { Button, EmbeddedVideoModal } from "$lib/components"
    import { themes } from "$lib/components/Link.svelte"

    export let matterportId: string
    export let youtubeId: string
    export let matterportLabel: string
    export let videoLabel: string
</script>

{#if matterportId}
    <Button
        {...themes.light()}
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
        {...themes.light()}
        on:click={() =>
            openModal(EmbeddedVideoModal, {
                title: "youtube",
                src: `https://www.youtube.com/embed/${youtubeId}?autoplay=1`
            })}
    >
        {videoLabel}</Button
    >
{/if}

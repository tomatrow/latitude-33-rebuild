<script lang="ts">
    import Link from "$lib/components/Link.svelte"
    import Button from "$lib/components/Button.svelte"
    import YouTubeModal from "$lib/components/YouTubeModal.svelte"
    import { openModal } from "$lib/components/ModalProvider.svelte"

    export let brandName: string
    export let title: string
    export let pageLink: any
    export let youtubeId: string
</script>

<section class="hero flex items-center justify-center">
    <div
        class="font-display max-w-screen-xl flex items-center justify-center px-8 w-full text-white"
    >
        <div class="flex items-start flex-col my-auto md:w-1/2">
            <h2 class="uppercase" style="letter-spacing: 2px;font-size: 1.75rem">{brandName}</h2>
            <h1
                class="whitespace-pre-line font-extrabold"
                style="letter-spacing: 0.6px; font-size: 2.375rem; line-height: 2.75rem "
            >
                {title}
            </h1>
            <Link
                style="letter-spacing: 0.6px"
                line={{ color: "white", trackColor: "#bababa" }}
                target={pageLink.target}
                href={pageLink.url}>{pageLink.title}</Link
            >
        </div>
        <Button
            class="hidden md:block w-1/2"
            on:click={() => openModal(YouTubeModal, { videoId: youtubeId })}
        >
            <img class="w-14 h-14 mx-auto p-2" alt="play button" src="/icons/play.png" />
        </Button>
    </div>
</section>

<style>
    .hero {
        min-height: 80vh;
        width: 100vw;
        background-image: linear-gradient(180deg, rgba(16, 16, 16, 0.44), rgba(16, 16, 16, 0.44)),
            url("/images/Bombarder-Challenger-300-Type-2.jpeg");
        background-position: 0px 0px, 50% 50%;
        background-size: auto, cover;
        background-repeat: repeat, no-repeat;
    }
</style>

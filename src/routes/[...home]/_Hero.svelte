<script lang="ts">
    import type { AcfImage, AcfLink } from "$lib/index.type"
    import { Link, Button, EmbeddedVideoModal } from "$lib/components"
    import { cssVars } from "$lib/actions/styles"
    import { openModal } from "$lib/components/ModalProvider.svelte"
    import { dev } from "$app/env"

    export let brandName: string
    export let title: string
    export let pageLink: AcfLink
    export let youtubeId: string
    export let backgroundImage: AcfImage
</script>

<section class="hero relative flex items-center justify-center">
    <div
        class="font-display max-w-screen-xl flex items-center justify-center px-8 w-full text-white"
    >
        <div class="flex items-start flex-col my-auto md:w-1/2">
            <h2 class="uppercase" style="letter-spacing: 2px;font-size: 1.75rem">{brandName}</h2>
            <h1
                class="whitespace-pre-line font-extrabold"
                style="letter-spacing: 0.6px; font-size: 2.375rem; line-height: 2.75rem"
            >
                {title}
            </h1>
            <Link
                style="letter-spacing: 0.6px"
                line={{ color: "white", trackColor: "#bababa" }}
                {...pageLink}
            />
        </div>
    </div>
    <div class="z-[-1] absolute inset-0">
        <video
            autoplay
            loop
            muted
            playsinline
            class="z-0 w-full h-full object-cover"
            poster="/videos/hero-poster.webp"
        >
            {#if !dev}
                <source
                    src="/videos/hero-mobile-v9.webm"
                    type="video/webm"
                    media="all and (max-width: 640px)"
                />
                <source
                    src="/videos/hero-mobile-v8.webm"
                    type="video/webm"
                    media="all and (max-width: 640px)"
                />
                <source
                    src="/videos/hero-mobile.mp4"
                    type="video/mp4"
                    media="all and (max-width: 640px)"
                />
                <source src="/videos/hero-desktop-v9.webm" type="video/webm" />
                <source src="/videos/hero-desktop-v8.webm" type="video/webm" />
                <source src="/videos/hero-desktop.mp4" type="video/mp4" />
            {/if}
        </video>
        <div
            class="absolute inset-0 z-10 bg-cover bg-no-repeat"
            style="background-image: linear-gradient(180deg, rgba(16, 16, 16, 0.44), rgba(16, 16, 16, 0.44))"
        />
    </div>
</section>

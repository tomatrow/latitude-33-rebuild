<script lang="ts">
    import type { AcfLink } from "$lib/index.type"
    import { Link } from "$lib/components"
    import { dev, browser } from "$app/env"

    export let brandName: string
    export let title: string
    export let pageLink: AcfLink
</script>

<section class="hero relative flex items-center justify-center">
    <div
        class="font-display max-w-screen-xl flex items-center justify-center md:justify-start px-8 md:px-12 w-full text-white"
    >
        <div class="flex items-start flex-col my-auto md:w-1/2">
            <h2 class="uppercase" style="letter-spacing: 2px;font-size: 1.75rem">{brandName}</h2>
            <h1
                class="whitespace-pre-line font-thin"
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
        {#if browser}
            <video
                autoplay
                loop
                muted
                playsinline
                poster="/videos/hero-poster.webp"
                class="w-full h-full object-cover"
            >
                {#if !dev}
                    <source
                        src="/videos/hero-mobile.mp4"
                        type="video/mp4"
                        media="all and (max-width: 640px)"
                    />
                    <source src="/videos/hero-desktop.mp4" type="video/mp4" />
                {/if}
                <img
                    class="w-full h-full object-cover"
                    src="/videos/hero-poster.webp"
                    alt="family embarking of plane trip"
                />
            </video>
        {:else}
            <img
                class="w-full h-full object-cover"
                src="/videos/hero-poster.webp"
                alt="family embarking of plane trip"
            />
        {/if}
        <div
            class="absolute inset-0 z-10 bg-cover bg-no-repeat"
            style="background-image: linear-gradient(180deg, rgba(16, 16, 16, 0.44), rgba(16, 16, 16, 0.44))"
        />
    </div>
</section>

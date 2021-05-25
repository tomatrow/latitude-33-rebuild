<script lang="ts">
    import Link from "$lib/components/Link.svelte"
    import Button from "$lib/components/Button.svelte"
    import YouTubeModal from "$lib/components/YouTubeModal.svelte"
    import { openModal } from "$lib/components/ModalProvider.svelte"

    const brandName = "Latitude 33 Aviation"
    const heroSettings = {
        titleHtml: "Private Charter Flights, Jet<br />Purchasing & Aircraft <br />Management",
        link: { href: "#", title: "Book Your Trip" },
        videoId: "ZCVeb_EtDfc"
    }

    const gridItems = [
        {
            title: "Charter",
            linkTitle: "Book Your Flight",
            imageUrl: "/images/Flying-Private.jpeg",
            linkProps: { href: "#", hollow: true }
        },
        {
            title: "Fleet",
            linkTitle: "Browse Our Fleet",
            linkProps: { href: "#", hollow: true },
            imageUrl: "/images/Bombarder-Challenger-300-Type-2.jpeg"
        },
        {
            title: "Sales",
            linkTitle: "View Inventory",
            linkProps: { href: "#", hollow: true },
            imageUrl: "/images/Cessna-Citation-Sovereign-Super-Midsize-Aircraft-For-Charter.jpeg"
        },
        {
            title: "Planning a trip? We'll make it easy.",
            linkTitle: "Use Our Range Finder",
            linkProps: { href: "#", filled: true },
            imageUrl: "/images/Pilatus-PC-12-NG-Interior-4-1024x683.jpeg"
        }
    ]
</script>

<section class="hero flex items-center justify-center">
    <div
        class="font-display max-w-screen-xl flex items-center justify-center px-8 w-full text-white"
    >
        <div class="flex items-start flex-col my-auto md:w-1/2">
            <h2 class="uppercase" style="letter-spacing: 2px;font-size: 1.75rem">{brandName}</h2>
            <h1
                class="font-extrabold"
                style="letter-spacing: 0.6px; font-size: 2.375rem; line-height: 2.75rem "
            >
                {@html heroSettings.titleHtml}
            </h1>
            <Link
                style="letter-spacing: 0.6px"
                line={{ color: "white", trackColor: "#bababa" }}
                href={heroSettings.link.href}>{heroSettings.link.title}</Link
            >
        </div>
        <Button
            class="hidden md:block w-1/2"
            on:click={() => openModal(YouTubeModal, { videoId: heroSettings.videoId })}
        >
            <img class="w-14 h-14 mx-auto p-2" alt="play button" src="/icons/play.png" />
        </Button>
    </div>
</section>

<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    <div
        style="background-image: url({gridItems[0].imageUrl}); background-position: 50% 5%"
        class="sm:row-span-2 flex flex-col justify-end h-64 sm:h-auto bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{gridItems[0].title}</h3>
            <Link {...gridItems[0].linkProps} class="font-semibold text-sm"
                >{gridItems[0].linkTitle}</Link
            >
        </div>
    </div>
    <div
        style="background-image: url({gridItems[1].imageUrl})"
        class="flex flex-col justify-end h-56 bg-center bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{gridItems[1].title}</h3>
            <Link {...gridItems[1].linkProps} class="font-semibold text-sm"
                >{gridItems[1].linkTitle}</Link
            >
        </div>
    </div>
    <div
        style="background-image: url({gridItems[2].imageUrl})"
        class="flex flex-col justify-end h-56 bg-center bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{gridItems[2].title}</h3>
            <Link {...gridItems[2].linkProps} class="font-semibold text-sm"
                >{gridItems[2].linkTitle}</Link
            >
        </div>
    </div>
    <div
        style="background-image: url({gridItems[3].imageUrl})"
        class="sm:col-span-2 sm:h-72 flex flex-col justify-end h-56 bg-center bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{gridItems[3].title}</h3>
            <Link
                {...gridItems[3].linkProps}
                class="leading-3 text-center font-semibold text-xs sm:text-sm"
                >{gridItems[3].linkTitle}</Link
            >
        </div>
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

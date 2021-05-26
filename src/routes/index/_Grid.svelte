<script>
    import Link from "$lib/components/Link.svelte"

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

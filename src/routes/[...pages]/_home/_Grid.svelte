<script>
    import Link from "$lib/components/Link.svelte"

    export let first
    export let second
    export let third
    export let fourth

    const bases = [
        {
            linkProps: { hollow: true },
            imageUrl: "/images/Flying-Private.jpeg"
        },
        {
            linkProps: { hollow: true },
            imageUrl: "/images/Bombarder-Challenger-300-Type-2.jpeg"
        },
        {
            linkProps: { hollow: true },
            imageUrl: "/images/Cessna-Citation-Sovereign-Super-Midsize-Aircraft-For-Charter.jpeg"
        },
        {
            linkProps: { filled: true },
            imageUrl: "/images/Pilatus-PC-12-NG-Interior-4-1024x683.jpeg"
        }
    ]

    const items = [first, second, third, fourth].map(({ link, title }, index) => {
        const { linkProps, imageUrl } = bases[index]

        linkProps.href = link.url
        linkProps.target = link.target

        return {
            title,
            imageUrl,
            linkProps: {
                ...linkProps,
                href: link.url,
                target: link.target
            },
            linkTitle: link.title
        }
    })
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    <div
        style="background-image: url({items[0].imageUrl}); background-position: 50% 5%"
        class="sm:row-span-2 flex flex-col justify-end h-64 sm:h-auto bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{items[0].title}</h3>
            <Link {...items[0].linkProps} class="font-semibold text-sm">{items[0].linkTitle}</Link>
        </div>
    </div>
    <div
        style="background-image: url({items[1].imageUrl})"
        class="flex flex-col justify-end h-56 bg-center bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{items[1].title}</h3>
            <Link {...items[1].linkProps} class="font-semibold text-sm">{items[1].linkTitle}</Link>
        </div>
    </div>
    <div
        style="background-image: url({items[2].imageUrl})"
        class="flex flex-col justify-end h-56 bg-center bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{items[2].title}</h3>
            <Link {...items[2].linkProps} class="font-semibold text-sm">{items[2].linkTitle}</Link>
        </div>
    </div>
    <div
        style="background-image: url({items[3].imageUrl})"
        class="sm:col-span-2 sm:h-72 flex flex-col justify-end h-56 bg-center bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{items[3].title}</h3>
            <Link
                {...items[3].linkProps}
                class="leading-3 text-center font-semibold text-xs sm:text-sm"
                >{items[3].linkTitle}</Link
            >
        </div>
    </div>
</section>

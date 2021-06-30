<script lang="ts">
    import { session } from "$app/stores"
    import { cssVars } from "../actions/styles"
    import Link from "./Link.svelte"
    import RangeFinderCta from "./RangeFinderCta.svelte"
    import { icons } from "$lib/data/social"
    import {
        IconChevronRight,
        ApplicationDesignGridLayout,
        Envelope,
        Phone,
        UsersFemaleMale,
        BackpackSchool
    } from "$lib/svgs"

    const {
        brandname: brandName,
        phone,
        email,
        physicaladdress: physicalAddress
    } = $session.menus.secondary.fields

    const footerBackgroundImageUrl =
        "/images/Cessna-Citation-Sovereign-Super-Midsize-Aircraft-For-Charter.jpeg"

    const menuIcons = {
        IconChevronRight,
        UsersFemaleMale,
        BackpackSchool,
        ApplicationDesignGridLayout
    }
</script>

<footer
    class="pb-12 bg-cover bg-no-repeat text-white"
    use:cssVars={{ image: `url(${footerBackgroundImageUrl})`, opacity: 0.5 }}
>
    <RangeFinderCta class="p-5 border-b border-white" style="margin-bottom: 4.5rem" />
    <nav class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
        <div class="font-display space-y-3 flex flex-col text-xl">
            <h6 class="font-bold">{brandName}</h6>
            <Link class="space-x-2 flex items-center font-extrabold" href="mailto:{email}"
                ><Envelope class="mr-4 w-6 h-6" /> {email}</Link
            >
            <Link class="space-x-2 flex items-center font-extrabold" href="tel:{phone}">
                <Phone class="mr-4 w-6 h-6" />{phone}</Link
            >
            <h6 class="whitespace-pre-line font-semibold">{physicalAddress}</h6>
        </div>

        <div class="grid grid-rows-6 grid-cols-2 grid-flow-col">
            {#each $session.menus.secondary.menuItems as { label, url, target }}
                <Link
                    {target}
                    sveltekit:prefetch
                    href={url}
                    class="font-display font-extrabold text-xl">{label}</Link
                >
            {/each}
        </div>

        <div
            class="col-span-full lg:col-span-1 divide-y divide-white border border-white rounded-lg"
        >
            {#each $session.menus.secondaryLarge.menuItems as { label, url, fields }}
                <Link
                    href={url}
                    sveltekit:prefetch
                    class="large-link hover:opacity-60 transition duration-200 font-display flex items-center py-4 px-6 w-full font-extrabold text-xl"
                >
                    <svelte:component this={menuIcons[fields.icon]} class="h-9 mr-4 w-9" />
                    {label}
                    <IconChevronRight class="chevron transition duration-200 ml-auto w-6 h-6" />
                </Link>
            {/each}
        </div>
    </nav>
    <nav
        class="space-y-8 md:space-y-0 flex items-center flex-col md:flex-row md:justify-between mt-32 px-5"
    >
        <div class="space-x-5 flex">
            {#each $session.menus.secondarySmall.menuItems as { label, url, target }}
                <Link {target} sveltekit:prefetch href={url} class="text-sm">{label}</Link>
            {/each}
        </div>
        <div class="space-x-5 flex">
            {#each $session.social as { service, url }}
                <Link
                    aria-label="{service} profile"
                    href={url}
                    target="_blank"
                    class="transition-opacity duration-200 opacity-50 hover:opacity-100"
                    ><svelte:component
                        this={icons[service]}
                        class="w-5 h-5 text-white"
                        strokeWidth="0"
                        fill="white"
                    /></Link
                >
            {/each}
        </div>
    </nav>
</footer>

<style>
    :global(.large-link:hover .chevron) {
        transform: translateX(6px);
    }
    footer {
        background-image: linear-gradient(
                180deg,
                rgba(0, 0, 0, var(--opacity)),
                rgba(0, 0, 0, var(--opacity))
            ),
            var(--image);
    }
</style>

<script lang="ts">
    import { browser } from "$app/env"
    import { session } from "$app/stores"
    import Link from "$lib/components/Link.svelte"
    import Colors from "$lib/data/colors.json"
    import _ from "lodash"
    import Hover from "./Hover.svelte"
    import { fade } from "svelte/transition"
    import type { FadeParams } from "svelte/transition"
    import Button from "$lib/components/Button.svelte"

    export let height = "6.25rem"
    let active: boolean
    let closeDropdown: () => void
    let enabled = true

    // const menu = $session.menus.primary.menuItems.map((item, index) => ({
    //     title: item.label,
    //     dropdown: item.childItems.length > 0 ? String(index) : null,
    //     ...item
    // }))

    $: browser && document.body.classList[active ? "add" : "remove"]("lock-scroll")
    function handleNavigation() {
        closeDropdown?.()
        hide()
        disable()
    }
    
    function show() {
        active = true
    }
    
    function hide() {
        active = false
    }

    function disable() {
        enabled = false
    }

    function enable() {
        enabled = true
    }
    
    const params: FadeParams = { delay: 0, duration: 100 }
</script>

<svelte:window on:sveltekit:navigation-start={handleNavigation} on:sveltekit:navigation-end={enable} />

<header style="height: {height}" class="px-6 bg-sadly-not-white absolute md:fixed top-0 right-0 left-0 z-40 flex items-center justify-center gap-3">
    <a href="/" sveltekit:prefetch>
        <img alt="latitude 33 logo" class="w-36 mr-32 invert brightness-[100]" src="/icons/latitude33-logo-blue.png" />
    </a>
    <nav class="hidden full-nav:flex justify-around w-full">
        {#each $session.menus.primary.menuItems as {label, url, childItems}}
            <Hover let:hovering class="relative overflow-visible">
                <Link sveltekit:prefetch line={{ color: Colors["ripe-blueberry-indentation"] }} class="uppercase text-ripe-blueberry-indentation hover:text-ripe-blueberry-indentation" href={url}>{label}</Link>
                {#if hovering && enabled}
                    <div transition:fade={params} class="absolute top-[100%] left-0 w-auto bg-sadly-not-white">
                        {#each childItems as {label, url, childItems}}
                            <Hover let:hovering class="flex flex-col relative">
                                <Link sveltekit:prefetch ease class="uppercase font-light text-dark-charcoal whitespace-nowrap px-1 py-2 {hovering ? 'bg-white' : ''}" href={url}>{label}</Link>
                                {#if hovering}
                                    <div transition:fade={params} class="absolute bg-sadly-not-white top-0 right-[100%] flex flex-col">
                                        {#each childItems as {label, url}}
                                            <Hover class="contents" let:hovering>
                                                <Link sveltekit:prefetch ease class="uppercase px-1 py-2 font-light text-dark-charcoal whitespace-nowrap {hovering ? 'bg-white' : ''}" href={url}>{label}</Link>
                                            </Hover>
                                        {/each}
                                    </div>
                                {/if}
                            </Hover>
                        {/each}
                    </div>
                {/if}
            </Hover>
        {/each}
    </nav>
    <Link
        ease
        shadow
        filled
        sveltekit:prefetch
        color="ripe-blueberry-indentation"
        class="full-nav:block hidden p-2 text-center text-sm flex-shrink-0"
        href="/contact">Request a Quote</Link
    >
    <Button on:click={show} class="full-nav:hidden vsm-mob__hamburger">
        <div class="vsm-mob-line" />
        <div class="vsm-mob-line" />
        <div class="vsm-mob-line" />
    </Button>
</header>

{#if active}
    <nav transition:fade
        class="absolute overflow-y-scroll inset-0 z-50 divide-a-taste-of-blueberries divide-y-2 bg-sadly-not-white flex flex-col p-5"
    >
        <div class="vsm-mob-close fixed top-4 right-4" on:click={hide} />
        {#each $session.menus.primary.menuItems as { label, target, url, childItems }}
            <div class="p-6" class:space-y-4={childItems.length}>
                <Link sveltekit:prefetch class="font-thin text-lg" {target} href={url}
                    >{label}</Link
                >
                <div class="grid gap-2 grind-cols-1 sm:grid-cols-2 pl-2">
                    {#each childItems as { label, target, url }}
                        <Link
                            sveltekit:prefetch
                            class="text-dark-charcoal font-light uppercase"
                            {target}
                            href={url}>{label}</Link
                        >
                    {/each}
                </div>
            </div>
        {/each}
    </nav>
{/if}

<style global lang="postcss">
    body.lock-scroll {
        overflow: hidden;
    }

    .vsm-menu {
        @apply mx-auto w-full;
    }

    :root {
        --vsm-mob-hamburger-color: theme("colors.dark-charcoal");
        --vsm-mob-hamburger-color-hover: theme("colors.deep-post-blue");
        --vsm-mob-close-color: theme("colors.dark-charcoal");
        --vsm-mob-close-color-hover: theme("colors.dark-charcoal");
        --vsm-mob-dropdown-offset: 0;
        --vsm-mob-dropdown-offset: 0;
        --vsm-mob-dropdown-offset: 0;
    }

    .vsm-link-container {
        display: flex;
        flex: 1 1 auto;
        justify-content: center;
    }

    .vsm-dropdown-container {
        background-color: theme("colors.sadly-not-white");
    }

    .vsm-mob-full {
        flex-grow: 1;
    }

    .vsm-mob-content {
        position: fixed !important;

        .vsm-mob-close {
            position: fixed !important;
            z-index: 10;
        }

        .vsm-mob-content__wrap {
            position: static;
            overflow: scroll !important;
            max-height: 100vh !important;
        }
    }

    .vsm-nav {
        @apply w-full;
        margin-right: 50px;
        margin-left: 50px;
        .vsm-mob-show {
            @apply block;
        }
        .vsm-mob-hide {
            @apply hidden;
        }
    }

    .vsm-dropdown.vsm-mob-hide {
        @apply hidden;
    }

    @screen full-nav {
        .vsm-dropdown.vsm-mob-hide {
            @apply block;
        }
        .vsm-nav {
            .vsm-mob-show {
                @apply hidden;
            }
            .vsm-mob-hide {
                @apply flex;
            }
        }
    }
</style>

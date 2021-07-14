<script lang="ts">
    import { browser } from "$app/env"
    import { session } from "$app/stores"
    import Link from "$lib/components/Link.svelte"
    import { MobileMenu, Menu } from "$lib/svelte-stripe-menu"

    export let height = "6.25rem"
    let active: boolean

    const menu = $session.menus.primary.menuItems.map((item, index) => ({
        title: item.label,
        dropdown: item.childItems.length > 0 ? String(index) : null,
        ...item
    }))
</script>

<svelte:window on:sveltekit:navigation-start={() => (active = false)} />

<Menu
    class="bg-a-taste-of-blueberries absolute md:fixed top-0 right-0 left-0 z-40 flex items-center justify-center"
    {menu}
    style="height: {height}"
>
    <li slot="before-nav" class="mr-auto">
        <a href="/" sveltekit:prefetch>
            <img alt="latitude 33 logo" class="mr-32 w-24" src="/icons/latitude33-logo-white.png" />
        </a>
    </li>
    <div
        slot="nav-item"
        let:item
        let:active
        class="grid gap-8 grid-cols-2 md:grid-cols-3 p-8"
        style="width: 1000px"
    >
        {#each item.childItems as { label, target, url, childItems }}
            <div class="flex flex-col">
                <Link class="block h-8 font-bold" {target} href={url} tabindex={active ? 0 : -1}
                    >{label}</Link
                >
                <div class="flex flex-col pl-4">
                    {#each childItems as { label, target, url }}
                        <Link
                            class="text-dark-charcoal font-bold"
                            {target}
                            href={url}
                            tabindex={active ? 0 : -1}>{label}</Link
                        >
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    <Link
        slot="title"
        let:item
        let:classes
        let:attributes
        href={item.url}
        class="{classes} text-white hover:text-white"
        {...attributes}
    >
        {item.title}
    </Link>
    <MobileMenu slot="after-nav" bind:active>
        <div class="divide-a-taste-of-blueberries divide-y-2 flex flex-col px-5 bg-white">
            {#each menu as { label, target, url, childItems }}
                <div class="p-6" class:space-y-4={childItems.length}>
                    <Link class="font-black text-lg" {target} href={url}>{label}</Link>
                    <div class="grid gap-2 grind-cols-1 sm:grid-cols-2 pl-2">
                        {#each childItems as { label, target, url }}
                            <Link class="text-dark-charcoal font-bold" {target} href={url}
                                >{label}</Link
                            >
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </MobileMenu>
</Menu>

<style global lang="postcss">
    .vsm-menu {
        @apply mx-auto w-full;
    }

    :root {
        --vsm-mob-hamburger-color: white;
        --vsm-mob-hamburger-color-hover: rgba(255, 255, 255, 0.75);
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

    @media (min-width: 1000px) {
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

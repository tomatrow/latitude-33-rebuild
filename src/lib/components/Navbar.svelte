<script lang="ts">
    export let height = "6.25rem"
    import Link from "$lib/components/Link.svelte"
    import { session } from "$app/stores"
</script>

<header
    class="bg-a-taste-of-blueberries fixed top-0 right-0 left-0 z-40 flex items-center justify-center"
    style="height: {height}"
>
    <a href="/">
        <img alt="latitude 33 logo" class="mr-32 w-24" src="/icons/latitude33-logo-white.png" />
    </a>
    <nav class="flex">
        {#each $session.menus.primary.menuItems as { label, url }}
            <Link class="font-display text-white text-lg" line={{ color: "white" }} href={url}
                ><span class="p-2">{label}</span></Link
            >
        {/each}
    </nav>
</header>

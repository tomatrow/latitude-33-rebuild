<script lang="ts">
    export let height = "6.25rem"
    import Link from "$lib/components/Link.svelte"

    const links = [
        { title: "Charter", href: "#" },
        { title: "Fleet", href: "#" },
        { title: "Managment", href: "#" },
        { title: "Sales", href: "#" },
        { title: "About", href: "#" },
        { title: "Resources", href: "#" },
        { title: "Contact", href: "#" }
    ]
</script>

<header
    class="bg-a-taste-of-blueberries fixed top-0 right-0 left-0 flex items-center justify-center"
    style="height: {height}"
>
    <a href="/">
        <img alt="latitude 33 logo" class="mr-32 w-24" src="/icons/latitude33-logo-white.png" />
    </a>
    <nav class="flex">
        {#each links as { href, title }}
            <Link class="font-display text-white text-lg" line={{ color: "white" }} {href}
                ><span class="p-2">{title}</span></Link
            >
        {/each}
    </nav>
</header>

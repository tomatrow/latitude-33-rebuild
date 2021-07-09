<script lang="ts">
    import Link from "./Link.svelte"
    export let style = ""
    let clazz = ""
    export { clazz as class }
</script>

<nav class="{clazz} flex items-center flex-col sm:flex-row justify-between" {style}>
    <Link href="/" sveltekit:prefetch>
        <img alt="latitude 33 logo" class="w-40" src="/icons/latitude33-logo-white.png" />
    </Link>
    <Link
        href="/range-finder"
        ease
        blob
        shadow
        class="space-x-10 flex items-center py-4 px-5 border border-white"
    >
        <span class="font-display text-white font-black text-xl">Range Finder</span>
        <img class="h-14 filter brightness-200" src="/icons/blue-plane.png" alt="toy plane" />
    </Link>
</nav>

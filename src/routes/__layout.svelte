<script lang="ts">
    import "../app.postcss"
    import Navbar from "$lib/components/Navbar.svelte"
    import Footer from "$lib/components/Footer.svelte"

    let height: string
</script>

<Navbar bind:height />
<main style="padding-top: {height}">
    <slot />
    <Footer />
</main>

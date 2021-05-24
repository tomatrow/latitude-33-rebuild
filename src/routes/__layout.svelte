<script lang="ts">
    import "../app.postcss"
    import Navbar from "$lib/components/Navbar.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import ModalProvider from "$lib/components/ModalProvider.svelte"

    let height: string
</script>

<ModalProvider />
<Navbar bind:height />
<main style="padding-top: {height}">
    <slot />
    <Footer />
</main>

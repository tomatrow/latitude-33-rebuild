<script lang="ts">
    import "../app.postcss"
    import Navbar from "$lib/components/Navbar.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import ModalProvider from "$lib/components/ModalProvider.svelte"
    import GlobalContactCard from "$lib/components/GlobalContactCard.svelte"

    let height: string
</script>

<ModalProvider />
<Navbar bind:height />
<main class="relative" style="padding-top: {height}">
    <slot />
    <Footer />
    <GlobalContactCard />
</main>

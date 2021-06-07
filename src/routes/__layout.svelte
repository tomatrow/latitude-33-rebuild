<script lang="ts">
    import "../app.postcss"
    import { Navbar, Footer, ModalProvider, GlobalContactCard } from "$lib/components"

    let height: string
</script>

<ModalProvider />
<Navbar bind:height />
<main class="relative" style="padding-top: {height}">
    <slot />
    <Footer />
    <GlobalContactCard />
</main>

<script lang="ts">
    import "../app.postcss"
    import Navbar from "$lib/components/Navbar.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import ModalProvider from "$lib/components/ModalProvider.svelte"
    import PaperPlaneToy from "$lib/svgs/PaperPlaneToy.svelte"
    import Button from "$lib/components/Button.svelte"

    let height: string
</script>

<ModalProvider />
<Navbar bind:height />
<main class="relative" style="padding-top: {height}">
    <slot />
    <Footer />
    <Button
        shadow
        class="bg-calm-summer-horizon mb-28 fixed right-0 bottom-0 z-40 mr-6 p-2 border-2 border-white rounded-full text-white"
    >
        <PaperPlaneToy class="h-9 w-9" />
    </Button>
</main>

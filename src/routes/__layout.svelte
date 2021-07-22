<script lang="ts">
    import "../app.postcss"
    import { Navbar, Footer, ModalProvider, GlobalContactCard } from "$lib/components"
    import { AxeObserver, logViolations } from "agnostic-axe"
    import { onMount } from "svelte"

    let height: string
    // if (import.meta.env.DEV)
    onMount(() => new AxeObserver(logViolations).observe(document))
</script>

<ModalProvider />
<Navbar bind:height />
<main class="relative" style="padding-top: {height}; --nav-h: {height}">
    <slot />
    <Footer />
    <GlobalContactCard />
</main>

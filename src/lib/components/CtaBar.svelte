<script lang="ts">
    import lottie from "lottie-web"
    import { browser } from "$app/env"
    import Button from "$lib/components/Button.svelte"

    export let heading: string
    export let buttonLabel: string

    let container: HTMLDivElement
    $: if (browser && container) {
        const animation = lottie.loadAnimation({
            path: "/curved-arrow-lottie.json",
            container,
            loop: true,
            autoplay: true
        })
    }
</script>

<section class="font-display bg-sarcastic-orange space-y-4 py-10 px-12 text-white text-center">
    <h5 class="tracking-px font-bold text-xl">{heading}</h5>
    <Button
        ease
        shadow
        blob
        class="relative py-4 px-16 border-2 border-white font-semibold text-2xl"
        on:click
        >{buttonLabel}

        <div
            bind:this={container}
            class="absolute invisible sm:visible w-32"
            style="right:-10rem;bottom: -2rem"
        />
    </Button>
</section>

<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import { Animation } from "$lib/svelte-lottie"

    export let heading: string
    export let buttonLabel: string
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

        <Animation
            class="absolute invisible sm:visible w-32"
            style="right:-10rem; bottom: -2rem"
            params={{
                path: "/curved-arrow-lottie.json",
                loop: true,
                autoplay: true
            }}
        />
    </Button>
</section>

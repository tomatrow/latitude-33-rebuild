<script context="module" lang="ts">
    export function load({ error }) {
        console.error(error)
        return {}
    }
</script>

<script>
    import { onMount } from "svelte"
    import { prefetch } from "$app/navigation"
    import { Link, Meta } from "$lib/components"

    onMount(async () => {
        try {
            await prefetch("/")
        } catch (error) {
            console.error("Failed to prefetch home", error)
        }
    })
</script>

<Meta title="Opps!" />

<section
    class="hero flex items-center flex-col justify-center px-4 text-white text-center"
    style="--bg: url(/images/Bombarder-Challenger-300-Type-2.jpeg)"
>
    <h1 class="font-display mb-4 font-light text-3xl sm:text-5xl">Oops!</h1>
    <p class="tracking-px font-extralight text-lg sm:text-xl">
        Looks like you've flown off course.
    </p>
    <p class="tracking-px font-extralight text-lg sm:text-xl">Please click below to go home.</p>
    <Link
        ease
        border
        filled
        shadow
        pill
        color="pre-coffee-sky-blue"
        class="font-display mt-2 py-2 px-4"
        href="/">Home</Link
    >
    <slot />
</section>

<script>
    import { onMount } from "svelte"
    import { prefetch } from "$app/navigation"
    import { Link, Meta } from "$lib/components"
    
    onMount(() => prefetch("/"))
</script>

<Meta title="Opps!" />

<section class="hero text-center px-4 text-white flex flex-col items-center justify-center" style="--bg: url(/images/Bombarder-Challenger-300-Type-2.jpeg)">
    <h1 class="mb-4 font-black font-display text-3xl sm:text-5xl">Oops!</h1>
    <p class="font-bold text-lg sm:text-xl tracking-px">Looks like you've flown off course.</p>
    <p class="font-bold text-lg sm:text-xl tracking-px">Please click below to go home.</p>
    <Link ease border filled shadow pill color="pre-coffee-sky-blue" class="font-display mt-2 px-4 py-2" href="/">Home</Link>
</section>

<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    export let heading: string
    export let buttonLabel: string
</script>

<section class="font-display bg-sarcastic-orange space-y-4 py-10 px-12 text-white text-center">
    <h5 class="tracking-px font-bold text-xl">{heading}</h5>
    <Button
        ease
        shadow
        blob
        class="py-4 px-16 border-2 border-white font-semibold text-2xl"
        on:click>{buttonLabel}</Button
    >
</section>

<script lang="ts">
    import TestimonialCard from "./_TestimonialCard.svelte"
    export let title: string
    export let testimonies: any[] = []
</script>

<section class="py-18 space-y-18 max-w-screen-xl mx-auto px-5">
    <h3 class="text-either-gray-blue text-center font-bol text-xl">{title}</h3>
    <div class="grid grid-custom gap-6">
        {#each testimonies as { testimonialPostFields }}
            <TestimonialCard {...testimonialPostFields} />
        {/each}
    </div>
</section>

<script lang="ts">
    import TestimonialCard from "./_TestimonialCard.svelte"
    import Heading, { increment } from "$lib/components/typography/Heading.svelte"
    
    increment()
    
    export let title: string
    export let testimonies: any[] = []
</script>

<section class="py-18 space-y-18 max-w-screen-xl mx-auto px-5">
    <Heading large class="text-either-gray-blue text-center">{title}</Heading>
    <div class="grid grid-custom gap-6">
        {#each testimonies as { testimonialPostFields }}
            <TestimonialCard {...testimonialPostFields} />
        {/each}
    </div>
</section>

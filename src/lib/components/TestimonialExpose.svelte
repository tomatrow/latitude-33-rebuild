<script lang="ts">
    import Link from "$lib/components/Link.svelte"
    import Heading from "$lib/components/typography/Heading.svelte"

    export let socialProofSummary: any
    export let testimonialProof: any

    let clazz = ""
    export { clazz as class }
</script>

<section
    class="{clazz} bg-either-gray-blue justify-items-center py-18 grid grid-cols-1 lg:grid-cols-2 gap-18 px-5 text-white"
>
    <div
        class="py-9 lg:justify-self-end md:px-14 md:py-24 px-6 max-w-xl border border-white"
    >
        <h5 class="font-display font-thin text-xl">{socialProofSummary.title}</h5>
        <div class="font-display font-extralight" style="font-size: 3.375rem">{socialProofSummary.rating}</div>
        <p class="mb-4">{socialProofSummary.blurb}</p>
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
            {#each socialProofSummary.links as { link }}
                <Link
                    class="transition uppercase duration-[425] ease-in-out hover:text-pre-coffee-sky-blue font-display py-2 px-4 border border-white hover:bg-white text-white text-center font-light text-sm"
                    {...link}
                />
            {/each}
        </div>
    </div>

    <div class="lg:justify-self-start max-w-lg">
        <Heading><span class="font-display leading-9 text-3.5xl">{testimonialProof.title}</span></Heading>
        <p>{testimonialProof.blurb}</p>
        <div
            class="border-the-girl-is-looking-at-the-sky  mt-11 relative p-6 pt-12 border bg-white"
        >
            <!-- svelte-ignore a11y-missing-attribute -->
            <img
                class="h-18 w-18 transform -translate-y-1/2 translate-x-1/3 absolute top-0 left-0 rounded-full"
                {...testimonialProof.proof.featuredImage.node}
            />
            <p class="text-tinted-rear-window text-xl">
                {testimonialProof.proof.testimonialPostFields.quote}
            </p>
            <div class="text-bold mt-4 text-sm">
                {testimonialProof.proof.testimonialPostFields.name}, {testimonialProof.proof
                    .testimonialPostFields.position}
            </div>
        </div>
    </div>
</section>

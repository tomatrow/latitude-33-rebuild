<script lang="ts">
    import Link, { themes } from "$lib/components/Link.svelte"
    import Heading from "$lib/components/typography/Heading.svelte"

    export let socialProofSummary: any
    export let testimonialProof: any

    let clazz = ""
    export { clazz as class }
</script>

<section
    class="{clazz} bg-either-gray-blue justify-items-center py-18 grid grid-cols-1 lg:grid-cols-2 gap-18 px-5 text-white"
>
    <div class="py-9 lg:justify-self-end md:px-14 md:py-24 px-6 max-w-xl border border-white">
        <h5 class="font-display font-thin text-xl uppercase">{socialProofSummary.title}</h5>
        <div class="font-display font-extralight" style="font-size: 3.375rem">
            {socialProofSummary.rating}
        </div>
        <p class="mb-4 font-light">{socialProofSummary.blurb}</p>
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
            {#each socialProofSummary.links as { link }}
                <Link
                    {...themes.light("text-center text-sm")}
                    {...link}
                />
            {/each}
        </div>
    </div>

    <div class="lg:justify-self-start max-w-lg">
        <Heading
            ><span class="font-display leading-9 text-3.5xl">{testimonialProof.title}</span
            ></Heading
        >
        <p class="font-extralight">{testimonialProof.blurb}</p>
        <div
            class="border-the-girl-is-looking-at-the-sky  mt-11 relative p-6 pt-12 border bg-white"
        >
            <!-- svelte-ignore a11y-missing-attribute -->
            <img
                class="h-18 w-18 transform -translate-y-1/2 translate-x-1/3 absolute top-0 left-0 rounded-full"
                {...testimonialProof.proof.featuredImage.node}
            />
            <p class="text-tinted-rear-window font-light text-xl">
                {testimonialProof.proof.testimonialPostFields.quote}
            </p>
            <div class="font-light mt-4 text-sm">
                {testimonialProof.proof.testimonialPostFields.name}, {testimonialProof.proof
                    .testimonialPostFields.position}
            </div>
        </div>
    </div>
</section>

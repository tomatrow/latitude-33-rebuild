<script lang="ts">
    import { Link } from "$lib/components"
    export let title: string
    export let subheading: string
    export let items: any[]
</script>

<section class="gap-y-4 flex items-center flex-col py-8 sm:py-12 px-5 sm:px-6">
    <h2 class="font-display text-a-stormy-morning text-center font-bold text-2xl">
        {title}
    </h2>

    {#if subheading}
        <span class="font-display text-tinted-rear-window text">{subheading}</span>
    {/if}

    <div class="grid grid-custom gap-6">
        {#each items as { title, blurb, image, link }}
            <Link
                sveltekit:prefetch
                ease
                raise
                {...link}
                class="sm:p-9 gap-y-2 block flex items-start flex-col p-4 rounded-lg bg-white shadow-xl"
            >
                <div class="gap-x-2 flex items-center">
                    <div
                        class="bg-a-stormy-morning inline-flex items-center flex-shrink-0 justify-center rounded-full"
                    >
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <img class="w-18 h-18 rounded-full object-cover" {...image} />
                    </div>
                    <h3 class="font-display text-a-stormy-morning text-lg">
                        {title}
                    </h3>
                </div>
                {#if blurb}
                    <span class="font-display">{blurb}</span>
                {/if}
            </Link>
        {/each}
    </div>
</section>

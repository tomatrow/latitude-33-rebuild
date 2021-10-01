<script lang="ts">
    import { Link } from "$lib/components"
    import Heading, { increment } from "$lib/components/typography/Heading.svelte"
    import ContentCard from "$lib/components/ContentCard/index.svelte"
    
    increment()

    export let title: string
    export let subheading: string
    export let items: any[]
</script>

<section class="gap-y-4 flex items-center flex-col py-8 sm:py-12 px-5 sm:px-6">
    <Heading class="text-a-stormy-morning text-center" {subheading}>{title}</Heading>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-6">
        {#each items as { title, blurb, image, link }}
            <ContentCard heading={title} {image} link={link?.href ? { href: link.href, title: "View More" }: null }>
                {#if blurb}
                    <span class="font-thin text-tiny text-dark-charcoal">{blurb}</span>
                {/if}
            </ContentCard>
        {/each}
    </div>
</section>

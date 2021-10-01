<script lang="ts">
    import type { AcfImage, AcfLink } from "$lib/index.type"
    import ContentCard from "$lib/components/ContentCard/index.svelte"

    let clazz = ""
    export { clazz as class }

    export let items: { title: string; image?: AcfImage; link: AcfLink }[] = []
</script>

{#if items.length > 0}
    <section class="{clazz} p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {#each items as item}
            <ContentCard heading={item.title} image={item.image} link={item.link}>
                <slot {item}/>
            </ContentCard>
        {/each}
    </section>
{:else}
    <slot name="empty" />
{/if}

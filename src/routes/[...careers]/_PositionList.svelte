<script lang="ts" context="module">
    import type { AcfLink } from "$lib/index.type"
    interface Position {
        title: string
        positionFields: {
            position: string
            location: string
            applyLink: AcfLink
            descriptionHtml: string
        }
    }
</script>

<script lang="ts">
    import { AccordionGroup } from "renderless-svelte"
    import PositionCard from "./_PositionCard.svelte"

    export let title: string
    export let subheading: string
    export let positions: Position[]

    let clazz = ""
    export { clazz as class }
</script>

<section class={clazz}>
    <div class="space-y-6 my-6">
        <h2 class="font-display sm:text-4.5xl text-white font-bold text-3xl">{title}</h2>
        <p class="font-display text-white text-lg sm:text-xl">{subheading}</p>
    </div>
    <div class="space-y-4">
        <AccordionGroup>
            {#each positions as { title, positionFields }}
                <PositionCard class="p-12" {title} {...positionFields} />
            {/each}
        </AccordionGroup>
    </div>
</section>

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
    import Heading, { increment } from "$lib/components/typography/Heading.svelte"

    increment()

    export let title: string
    export let subheading: string
    export let positions: Position[]

    let clazz = ""
    export { clazz as class }
</script>

<section class={clazz}>
    <Heading class="my-6 text-white" {subheading}>{title}</Heading>
    <div class="space-y-4">
        <AccordionGroup>
            {#each positions as { title, positionFields }}
                <PositionCard class="p-12" {title} {...positionFields} />
            {/each}
        </AccordionGroup>
    </div>
</section>

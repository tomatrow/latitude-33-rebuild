<script lang="ts">
    import numeral from "numeral"
    import { AccordionGroup } from "renderless-svelte"
    import DetailsAccordion from "./DetailsAccordion.svelte"
    import EngineSpec from "./EngineSpec.svelte"

    export let details: Record<string, string> = {}
    export let labels: Record<string, string> = {}
    export let engines: any[] = []
    let clazz = ""
    export { clazz as class }

    export let specsTitle: string
    export let engineSpecLabels: Record<string, string>

    const orderedKeys = [
        "engine",
        "maintenance",
        "avionics",
        "additionalEquipment",
        "interior",
        "exterior"
    ]
</script>

<div class={clazz}>
    <slot name="header" />
    <ul class="divide-y-white divide-y">
        <AccordionGroup>
            {#each orderedKeys as key}
                <DetailsAccordion label={labels[key]} contentHtml={details[key]}>
                    {#if key === "engine"}
                        <div class="space-y-2 my-4">
                            <h4 class="font-bold">{specsTitle}</h4>
                            {#each engines as { name, serialNumber, hoursSinceNew, cyclesSinceNew }}
                                <details class="transition">
                                    <summary>{name}</summary>
                                    <ul>
                                        <EngineSpec
                                            label={engineSpecLabels.serialNumber}
                                            value={serialNumber}
                                        />
                                        <EngineSpec
                                            label={engineSpecLabels.hoursSinceNew}
                                            value={numeral(hoursSinceNew).format("0,0")}
                                        />
                                        <EngineSpec
                                            label={engineSpecLabels.cyclesSinceNew}
                                            value={numeral(cyclesSinceNew).format("0,0")}
                                        />
                                    </ul>
                                </details>
                            {/each}
                        </div>
                    {/if}
                </DetailsAccordion>
            {/each}
        </AccordionGroup>
    </ul>
    <slot name="footer" />
</div>

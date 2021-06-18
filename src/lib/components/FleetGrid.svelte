<script lang="ts">
    import { prefetch } from "$app/navigation"
    import Card from "./Card.svelte"
    export let fleet = []
    export let linkTitle: string

    function isSingular(length: number, chunk: number, index: number) {
        return index === length - 1 && length % chunk === 1
    }

    function classes(index: number) {
        const two = isSingular(fleet.length, 2, index)
        const three = isSingular(fleet.length, 3, index)
        return [
            three && "lg:aspect-w-16 lg:aspect-h-9",
            two && "md:aspect-w-16 md:aspect-h-9",
            two && !three && "lg:aspect-none"
        ]
            .filter(Boolean)
            .join(" ")
    }
</script>

<section class="grid grid-custom" {...$$restProps}>
    {#each fleet as { title, uri, featuredImage }, index}
        <div class={classes(index)} on:mouseover={() => prefetch(uri)}>
            <Card
                style="height: 32rem"
                {title}
                href={uri}
                {linkTitle}
                src={featuredImage?.node.src}
            />
        </div>
    {/each}
</section>

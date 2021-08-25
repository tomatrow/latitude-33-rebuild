<script lang="ts">
    import { buildClasses, classes } from "$lib/actions/styles"
    import ImageSquare from "./ImageSquare.svelte"
    import TextSquare from "./TextSquare.svelte"
    import type { AcfImage } from "$lib/index.type"

    let clazz = ""
    export { clazz as class }

    export let swap = false
    export let invert = false
    export let bgColor = "a-stormy-morning"

    export let fullImage = true
    export let image: AcfImage

    export let expandContent = false
    export let title: string
    export let subheading: string = undefined
    export let icon: any = undefined
    export let contentHtml: string
</script>

<section
    class="lg:grid lg:grid-cols-2"
    use:classes={[clazz, swap && "lg:grid-flow-col-dense"]}
    {...$$restProps}
>
    <ImageSquare {invert} class={invert ? "bg-white" : `bg-${bgColor}`} {image} full={fullImage} />
    <TextSquare
        class={buildClasses(swap && "lg:col-start-1")}
        {bgColor}
        {invert}
        expand={expandContent}
        {icon}
        {title}
        {subheading}
        {contentHtml}
    />
</section>

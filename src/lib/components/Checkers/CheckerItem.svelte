<script lang="ts">
    import { buildClasses, classes } from "$lib/actions/styles"
    import ImageSquare from "./ImageSquare.svelte"
    import TextSquare from "./TextSquare.svelte"
    let clazz = ""
    export { clazz as class }

    export let swap = false
    export let invert = false
    export let bgColor = "either-gray-blue"

    export let float = undefined

    export let fullImage = true
    export let image: any

    export let expandContent = false
    export let title: string
    export let subheading: string = undefined
    export let icon: any = undefined
    export let contentHtml: string
</script>

<!-- float ? "sm:relative lg:static sm:py-44" : "sm:py-18", -->

<section
    class="lg:grid lg:grid-cols-2"
    use:classes={[clazz, swap && "lg:grid-flow-col-dense"]}
    {...$$restProps}
>
    <ImageSquare class={invert ? "bg-white" : `bg-${bgColor}`} {image} full={fullImage} />
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

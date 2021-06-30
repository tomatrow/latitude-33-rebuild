<script lang="ts">
    import { classes } from "$lib/actions/styles"

    let clazz = ""
    export { clazz as class }
    export let reverse = false
    export let float = undefined

    export let title: string
    export let icon: any
    export let image: any
    export let contentHtml: string
</script>

<section
    class="space-y-6 sm:space-y-0 lg:grid lg:grid-cols-2 pb-9 lg:p-0 sm:pb-5"
    use:classes={[
        clazz,
        (float && "sm:relative lg:static sm:py-44") || "sm:py-18",
        reverse && "bg-either-gray-blue text-white lg:grid-flow-col-dense"
    ]}
    {...$$restProps}
>
    <img
        class="sm:rounded-3xl sm:max-h-64 lg:max-w-none top-0 left-0 sm:ml-5 lg:ml-0 sm:max-w-sm lg:max-h-full lg:w-full lg:h-full lg:rounded-none lg:object-cover"
        use:classes={(float &&
            "sm:absolute sm:-translate-y-1/2 lg:translate-y-0 lg:static sm:pb-4 lg:pb-0") ||
            "mb-4"}
        {...image}
    />
    <div
        class:lg:col-start-1={reverse}
        class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-5 s mx-5 sm:mx-auto lg:p-4 sm:max-w-lg"
    >
        <h3 class="sm:col-span-full font-display text-3.5xl lg:mt-auto sm:text-center font-black">
            {title}
        </h3>
        <img
            class="sm:col-start-1 h-18 w-18 sm:self-start"
            style="filter: brightness({reverse ? 100 : 0})"
            {...icon}
        />
        <p class="sm:col-start-2 sm:col-span-4 injected-content lg:py-18 font-thin text-lg">
            {@html contentHtml}
        </p>
    </div>
</section>

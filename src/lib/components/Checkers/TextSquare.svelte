<script lang="ts">
    import { classes } from "$lib/actions/styles"

    export let expand: boolean
    export let title: string
    export let subheading: string
    export let contentHtml: string
    export let bgColor: string
    export let icon: any
    export let invert: boolean

    export { clazz as class }
    let clazz = ""

    const textColor = invert
        ? "text-white sm:text-black lg:text-white"
        : "text-black sm:text-white lg:text-black"
</script>

<div
    class={clazz}
    use:classes={[
        "py-6",
        invert
            ? `bg-${bgColor} sm:bg-white lg:bg-${bgColor}`
            : `bg-white sm:bg-${bgColor} lg:bg-white`
    ]}
>
    <div
        class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-5 mx-5 sm:mx-auto h-full sm:max-w-lg"
        use:classes={expand ? "lg:py-18" : "lg:py-4"}
    >
        <div class="space-y-3 font-display sm:col-span-full mt-auto sm:text-center">
            <h3 class="{textColor} font-display lg:mt-auto sm:text-center font-semibold text-2xl">
                {title}
            </h3>
            {#if subheading}
                <h5
                    class="text-sm"
                    use:classes={invert
                        ? "text-white sm:text-a-stormy-morning lg:text-white"
                        : "text-a-stormy-morning sm:text-white lg:text-a-stormy-morning"}
                >
                    {subheading}
                </h5>
            {/if}
        </div>
        {#if icon}
            <!-- svelte-ignore a11y-missing-attribute -->
            <img
                class="sm:col-start-1 h-18 w-18 sm:self-start"
                use:classes={invert
                    ? "brightness-[100] sm:brightness-0 lg:brightness-[100]"
                    : "brightness-0 sm:brightness-[100] lg:brightness-0"}
                {...icon}
            />
        {/if}
        <div
            use:classes={icon ? "sm:col-start-2 sm:col-span-4 lg:py-18" : "col-span-full"}
            class="{textColor} injected-content lg:px-4 font-thin text-lg"
        >
            {@html contentHtml}
        </div>
    </div>
</div>

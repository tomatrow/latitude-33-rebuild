<script lang="ts">
    import { classes } from "$lib/actions/styles"
    export let float = false
    export let full = false
    export let image: any
    export let invert = false

    export { clazz as class }
    let clazz = ""
</script>

<div class="{clazz} relative flex items-center flex-col justify-center sm:pt-8 lg:pt-0">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
        class="sm:rounded-3xl sm:max-h-64 sm:max-w-[26rem] w-full lg:max-h-full sm:w-auto"
        use:classes={[
            float &&
                "sm:top-0 sm:left-0 sm:ml-5 lg:ml-0 sm:absolute sm:-translate-y-1/2 lg:translate-y-0 lg:static sm:pb-4 lg:pb-0",
            full &&
                "lg:max-w-none lg:rounded-none lg:object-cover lg:w-full lg:h-full lg:max-h-full"
        ]}
        {...image}
    />
    {#if image?.caption}
        <span
            use:classes={invert ? "text-white bg-a-stormy-morning" : "bg-white text-black"}
            class="bg-opacity-80 max-w-[26rem] absolute sm:static right-0 bottom-0 left-0 m-2 sm:my-4 mx-auto p-2 sm:p-4 rounded text-sm"
            >{'"'}{@html image.caption}{'"'}</span
        >
    {/if}
</div>

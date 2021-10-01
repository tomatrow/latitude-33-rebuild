<script lang="ts">
    import Link from "./Link.svelte"
    import { YouTube } from "$lib/svgs"
    import PostInfo from "./PostInfo.svelte"

    export let dateGmt: string
    export let title: string
    export let href: string
    export let postFields: any

    export let layered = false
    let clazz = ""
    export { clazz as class }
</script>

<div
    class="{clazz} post-card relative flex flex-col {layered
        ? 'md:hover:-translate-y-3 transform duration-200 transition ease-in-out'
        : ''}"
>
    <Link
        {href}
        aria-label={title}
        class="relative block mb-4 h-full {layered
            ? ''
            : 'transition duration-200 ease-in-out transform sm:hover:-translate-y-3  '}"
    >
        {#if postFields.class?.postClassFields.isMedia && !layered}
            <YouTube
                class="transition-none stroke-0 bg-opacity-10 h-1/6 absolute inset-0 m-auto z-10 w-1/6  bg-black text-white fill-current"
            />
        {/if}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img
            class:shadow-xl={layered}
            class="w-full h-full object-cover"
            {...postFields.featuredImage}
        />
    </Link>
    <div class="{layered ? 'px-4' : ''} mt-auto">
        <div
            class="flex {layered
                ? 'flex-col-reverse bg-white p-6 sm:p-9 border border-black border-opacity-10 sm:max-w-sm w-full mx-auto transition duration-200 ease-in-out transform sm:hover:-translate-y-12 md:transform-none hover:-translate-y-9 sm:-translate-y-9 md:absolute md:bottom-0 md:left-0 md:m-8'
                : 'flex-col'}"
        >
            <PostInfo class="mt-2" {dateGmt} {postFields} />
            <Link {href} class={layered ? "mb-7" : "mt-7"}>
                <h3
                    class="uppercase text-tinted-rear-window font-display min-h-16 sm:min-h-auto sm:h-16 font-light text-2xl"
                >
                    {title}
                </h3>
            </Link>
        </div>
    </div>
</div>

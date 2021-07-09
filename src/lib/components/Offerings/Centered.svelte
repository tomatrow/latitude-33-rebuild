<script lang="ts">
    import Link from "$lib/components/Link.svelte"

    export let image: any
    export let subheading: string
    export let title: string
    export let contentHtml: string
    export let link: any
    export let accentColor: string
    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} grid grid-cols-1 md:grid-cols-2 gap-y-9 md:gap-y-0 md:gap-x-18">
    <div class="mx-auto md:mr-0 md:pl-5">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img
            class="rounded-xl ease-in-out hover:shadow-card transform transition duration-200 hover:-translate-y-3 z-10 w-full max-w-lg"
            {...image}
        />
    </div>

    <div class="mx-auto md:ml-0 pb-12 max-w-xl">
        {#if subheading}
            <h5 class="text-{accentColor} font-display font-bold md:text-xl">
                {subheading}
            </h5>
        {/if}
        <h4 class="font-display md:pr-18 mt-2 mb-6 font-black text-2xl md:text-5xl">
            {title}
        </h4>
        <div class="injected-content injected-content_large">
            {@html contentHtml}
        </div>
        {#if link}
            <Link
                shadow
                blob
                outline
                ease
                filled
                border
                color="pre-coffee-sky-blue"
                class="inline-block mt-4 py-4 px-6 text-white font-black text-sm"
                {...link}
            />
        {/if}
    </div>
</section>

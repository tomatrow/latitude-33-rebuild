<script lang="ts">
    import Colors from "$lib/data/colors.json"
    import { cssVars, classes } from "$lib/actions/styles"
    import CornerOffering from "./Corner.svelte"
    import CenteredOffering from "./Centered.svelte"
    import FlushOffering from "./Flush.svelte"

    export let offerings: any
    export let style: any
    export let isFlush: any

    const isDarkBg = style.backgroundColor === "either-gray-blue"
    const accentColor = isDarkBg ? "the-girl-is-looking-at-the-sky" : "either-gray-blue"
    const textColor = isDarkBg ? "white" : "black"
    const verticalPadding =
        style.backgroundColor === "white"
            ? ""
            : style.hasCorner
            ? "py-12 md:pt-0 md:pb-18"
            : style.layout === "centered"
            ? "py-12 md:py-24"
            : style.layout === "flush"
            ? "py-12 md:py-18"
            : ""
</script>

<section
    class="{verticalPadding} bg-{style.backgroundColor} space-y-9 md:space-y-18 text-{textColor} px-5 md:px-0"
    class:md:bg-transparent={!style.hasCorner}
    use:classes={[!isFlush.top && "mt-12 md:mt-24", !isFlush.bottom && "mb-12 md:mb-24"]}
    use:cssVars={{
        injectedLinkColor: Colors[accentColor],
        halfBgColor: `${Colors[style.backgroundColor]} 50%`
    }}
>
    {#each offerings as fields, index}
        {#if index === 0 && style.hasCorner}
            <CornerOffering full={style.largeCornerImage} {accentColor} {...fields} />
        {:else if style.layout === "centered"}
            <CenteredOffering {accentColor} {...fields} class="md:text-black" />
        {:else if style.layout === "flush"}
            <FlushOffering {accentColor} {...fields} />
        {/if}
    {/each}
</section>

<style lang="postcss">
    @screen md {
        section {
            background-image: linear-gradient(90deg, var(--half-bg-color), transparent 50%);
        }
    }
</style>

<script lang="ts">
    import Anchor from "$lib/components/Anchor.svelte"
    import Colors from "$lib/data/colors.json"
    import { cssVars } from "$lib/actions/styles"
    import Heading from "./Heading.svelte"

    export let anchorId: string = undefined
    export let blurbs: any[]
    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} bg-a-stormy-morning">
    <Anchor id={anchorId} />
    <div
        class="grid grid-custom gap-y-6 py-[10px] mx-auto px-[20px] md:divide-x"
        use:cssVars={{
            injectedLinkColor: Colors["calm-summer-horizon"]
        }}
    >
        {#each blurbs as { icon, title, link, contentHtml }}
            <div class="px-[20px] py-[10px] space-y-[10px]">
                <div class="h-20 flex items-end">
                    {#if link}
                        <Link {...link}>
                            <Heading {title} {icon} />
                        </Link>
                    {:else}
                        <Heading {title} {icon} />
                    {/if}
                </div>

                <div class="injected-content  text-white tracking-wide font-light">
                    {@html contentHtml}
                </div>
            </div>
        {/each}
    </div>
</section>

<style lang="postcss">
    @screen md {
        .grid-custom > :nth-child(2n + 1) {
            border-left-style: none;
        }
    }
    @screen lg {
        .grid-custom > :nth-child(2n + 1) {
            border-left-style: solid;
        }
        .grid-custom > :nth-child(3n + 1) {
            border-left: none;
        }
    }
</style>
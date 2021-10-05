<script lang="ts">
    import Anchor from "$lib/components/Anchor.svelte"
    import Colors from "$lib/data/colors.json"
    import Heading from "./Heading.svelte"
    import Link from "$lib/components/Link.svelte"
    import DividedGrid from "./DividedGrid.svelte"

    export let anchorId: string = undefined
    export let blurbs: any[]
    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} bg-a-stormy-morning">
    <Anchor id={anchorId} />
    <DividedGrid class="gap-y-6 py-[10px] mx-auto px-[20px]" --injected-link-color={Colors["calm-summer-horizon"]}>
        {#each blurbs as { icon, title, link, contentHtml }}
            <div class="px-[20px] py-[10px] space-y-[10px]">
                <div class="h-20 overflow-ellipsis overflow-hidden flex items-end text-white">
                    {#if link}
                        <Link {...link}>
                            <Heading {title} {icon} />
                        </Link>
                    {:else}
                        <Heading {title} {icon} />
                    {/if}
                </div>

                <div class="injected-content text-white tracking-wide font-light">
                    {@html contentHtml}
                </div>
            </div>
        {/each}
    </DividedGrid>
</section>


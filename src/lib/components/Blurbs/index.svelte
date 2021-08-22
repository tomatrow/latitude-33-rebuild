<script lang="ts">
    import Anchor from "$lib/components/Anchor.svelte"
    import Colors from "$lib/data/colors.json"
    import { cssVars } from "$lib/actions/styles"
    import Image from "./Image.svelte"
    import Title from "./Title.svelte"

    export let anchorId: string = undefined
    export let blurbs: any[]
    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} bg-a-stormy-morning">
    <Anchor id={anchorId} />
    <div
        class="grid grid-custom gap-6 max-w-7xl mx-auto py-12 md:py-24 px-5"
        use:cssVars={{
            injectedLinkColor: Colors["calm-summer-horizon"]
        }}
    >
        {#each blurbs as { icon, title, link, contentHtml }}
            <div>
                {#if link}
                    {#if icon}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a {...link}>
                            <Image {icon} />
                        </a>
                    {/if}
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <Title {link} {title} />
                {:else}
                    {#if icon}
                        <Image {icon} />
                    {/if}
                    <Title {title} />
                {/if}
                <p class="injected-content text-white tracking-wide font-light">
                    {@html contentHtml}
                </p>
            </div>
        {/each}
    </div>
</section>

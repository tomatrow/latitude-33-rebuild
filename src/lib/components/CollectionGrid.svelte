<script lang="ts">
    import { prefetch } from "$app/navigation"
    import Grid from "$lib/components/16x9Grid.svelte"
    import Link from "$lib/components/Link.svelte"
    import type { AcfImage, AcfLink } from "$lib/index.type"

    let clazz = ""
    export { clazz as class }

    export let items: { title: string; image?: AcfImage; link: AcfLink }[] = []
</script>

<Grid let:containerClasses length={items.length} let:createChildClasses>
    <section class="{containerClasses} {clazz}" {...$$restProps}>
        {#each items as { title, image, link }, index}
            <div class="{createChildClasses(index)} h-[32rem]">
                <div
                    class="flex w-auto flex-col justify-end h-full bg-center bg-cover bg-no-repeat"
                    style="background-image: url({image?.src})"
                    on:mouseover={() => prefetch(link.href)}
                >
                    <div
                        class="font-display flex items-center justify-between mt-auto px-5 h-16 text-white"
                        style="background-color: rgba(0,0,0,0.75)"
                    >
                        <h3 class="font-black text-lg sm:text-2xl">{title}</h3>
                        <Link
                            ease
                            pill
                            filled
                            shadow
                            color="either-gray-blue"
                            class="flex-shrink-0 py-2 px-4 text-center whitespace-no-wrap font-semibold text-sm"
                            {...link}
                        />
                    </div>
                </div>
            </div>
        {/each}
    </section>
</Grid>

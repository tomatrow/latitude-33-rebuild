<script lang="ts">
    import { tick } from "svelte"
    import { cubicInOut } from "svelte/easing"
    import _ from "lodash"
    import { scrollTo } from "svelte-scrollto"
    import { Carousel } from "renderless-svelte"
    import { Gallery, Button } from "$lib/components"
    import { ChevronLeft, ChevronRight } from "$lib/svgs"
    import type { AcfImage } from "$lib/index.type"

    export let gallery: AcfImage[] = []

    let currentIndex: number
    let container

    $: if (container) {
        scrollTo({
            container,
            scrollX: true,
            duration: 0,
            element: container.children[currentIndex]
        })
    }

    function snap(node: HTMLElement) {
        const onScroll = _.debounce(
            async () => {
                currentIndex = Math.round(node.scrollLeft / node.offsetWidth)
            },
            250,
            { trailing: true }
        )

        node.addEventListener("scroll", onScroll)

        return {
            destroy() {
                node?.removeEventListener("scroll", onScroll)
            }
        }
    }

    let clazz = "h-96  w-full max-w-xl "
    export { clazz as class }
</script>

<Gallery let:show images={gallery}>
    <Carousel bind:currentIndex loop items={gallery} let:controls>
        <div class="{clazz} space-y-4 flex items-center flex-col justify-center">
            <div class="relative overflow-hidden w-full h-full">
                <Button
                    pill
                    filled
                    shadow
                    ease
                    border
                    aria-label="left"
                    color="sarcastic-orange"
                    class="-translate-y-1/2 top-1/2 left-8 h-9 absolute z-10 flex items-center justify-center w-9"
                    on:click={controls.previous}><ChevronLeft class="w-6 h-6 text-white" /></Button
                >
                <Button
                    pill
                    filled
                    shadow
                    ease
                    border
                    aria-label="right"
                    color="sarcastic-orange"
                    class="h-9 -translate-y-1/2 top-1/2 right-8 absolute z-10 flex items-center justify-center w-9"
                    on:click={controls.next}><ChevronRight class="w-6 h-6 text-white" /></Button
                >

                <div
                    id="container"
                    bind:this={container}
                    use:snap
                    class="snap rounded-xl always-stop snap-x snap-mandatory absolute inset-0 z-0 block flex overflow-x-scroll"
                >
                    {#each gallery as image, index}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <img
                            class="snap-center w-full h-full object-cover"
                            {...image}
                            on:click={() => show(index)}
                        />
                    {/each}
                </div>
            </div>
            <div class="space-x-2 flex items-center justify-center mx-auto">
                {#each gallery as _, index}
                    <Button
                        pill
                        ease
                        class="{index === currentIndex ? '' : 'opacity-70'} w-3 h-3 bg-black"
                        aria-label="show image {index}"
                        on:click={() => (currentIndex = index)}
                    />
                {/each}
            </div>
        </div>
    </Carousel>
</Gallery>

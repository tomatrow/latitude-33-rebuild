<script lang="ts">
    import { prefetch } from "$app/navigation"
    import { onMount } from "svelte"
    import { Link, Arrow } from "$lib/components"
    import { delay } from "$lib/scripts/utility"
    import { slide } from "svelte/transition"

    export let detailsText: string
    export let value: { href: string }
    let ready = false

    let clazz = ""
    export { clazz as class }

    onMount(async () => {
        await delay(100)
        ready = true // the initial value is auto selected, so we wait to prefetch
    })

    $: if (ready && value?.href) {
        prefetch(value.href).then(() => {
            console.log("fetched", value.href)
        })
    }
</script>

<div class="{clazz} space-y-1">
    <div>
        <select class="text-a-stormy-morning p-2 pr-8 font-light appearance-none" bind:value>
            <slot />
        </select>
    </div>
    {#if value?.href}
        <div transition:slide>
            <Link target="_blank" class="gap-x-2 flex items-center self-start" href={value.href}>
                <span class="font-light">{detailsText}</span>
                <Arrow class="inline w-4 h-4" />
            </Link>
        </div>
    {/if}
</div>

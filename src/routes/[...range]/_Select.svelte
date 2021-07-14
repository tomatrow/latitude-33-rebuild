<script lang="ts">
    import { prefetch } from "$app/navigation"
    import { onMount } from "svelte"
    import { ChevronDown } from "$lib/svgs"
    import { Link, Arrow } from "$lib/components"
    import { delay } from "$lib/scripts/utility"

    export let label: string
    export let value: { href: string }
    let ready = false
    
    onMount(async () => {
        await delay(100)
        ready = true // the initial value is auto selected, so we wait to prefetch
    })

    $: if (ready && value) {
        prefetch(value.href).then(() => {
            console.log("fetched", value.href)
        })
    }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="space-y-1">
    <h5 class="font-display text-either-gray-blue flex-grow font-bold text-xl">
        {label}
    </h5>
    <div class="space-x-4 border-either-gray-blue flex items-center p-2 border-2">
        <select class="text-either-gray-blue font-semibold appearance-none" bind:value>
            <slot />
        </select>
        <ChevronDown class="w-auto h-4" />
    </div>
    {#if value}
        <Link class="space-x-2 flex items-center self-start" href={value.href}>
            <span class="font-semibold">View More Info</span>
            <Arrow class="inline w-4 h-4" />
        </Link>
    {/if}
</label>

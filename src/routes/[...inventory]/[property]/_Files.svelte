<script lang="ts">
    import { Link } from "$lib/components"
    import type { AcfImage } from "$lib/index.type"
    import Pill from "./_Pill.svelte"

    export let files: any[]
    export let title: string
    export let subheading: string
    export let downloadLabel: string
    export let backgroundImage: AcfImage
</script>

<section class="grid grid-cols-1 sm:grid-cols-2">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="w-full h-full object-cover" {...backgroundImage} />
    <div class="bg-sarcastic-orange space-y-6 py-18 px-5">
        <p class="font-display text-white font-bold text-sm">{subheading}</p>
        <h4 class="font-display text-3.5xl text-white font-bold">{title}</h4>
        {#each files as { label, file }}
            <Pill reverse class="py-4.5 text-sarcastic-orange flex-col-reverse px-4 bg-white">
                <span slot="label">{label}</span>
                <Link target="__blank" href={file.href}>{downloadLabel}</Link>
            </Pill>
        {/each}
    </div>
</section>

<script lang="ts">
    import { Link } from "$lib/components"
    import type { AcfImage } from "$lib/index.type"
    import Pill from "./_Pill.svelte"
    import Heading from "$lib/components/typography/Heading.svelte"
    import { themes } from "$lib/components/Link.svelte"

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
        <Heading class="text-white" reverse {subheading}>{title}</Heading>
        {#each files as { label, file }}
            <div class="flex flex-col gap-4 py-4 items-center text-sarcastic-orange bg-white">
                <span>{label}</span>
                <Link filled {...themes.dark()} target="__blank" href={file.href}>{downloadLabel}</Link>
            </div>
        {/each}
    </div>
</section>

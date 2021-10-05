<script lang="ts">
    import type { AcfImage } from "$lib/index.type"
    import Heading from "$lib/components/typography/Heading.svelte"

    export let title: string
    export let icon: AcfImage
</script>

<div class="gap-2 flex items-center justify-center">
    {#if icon}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="brightness-[100] h-12" {...icon} />
    {/if}
    <Heading class="text-left self-end text-white" tiny>
        {title}
        <div class="border-b w-[70%]" />
    </Heading>
</div>

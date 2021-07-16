<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import { PaperPlaneToy } from "$lib/svgs"
</script>

<div class="mb-28 fixed right-0 bottom-0 z-40 mr-6">
    <Button
        aria-label="open contact form"
        on:click
        shadow
        ease
        pill
        class="bg-either-gray-blue p-2 border-2 border-white text-white"
    >
        <PaperPlaneToy class="h-9 w-9" />
    </Button>
</div>

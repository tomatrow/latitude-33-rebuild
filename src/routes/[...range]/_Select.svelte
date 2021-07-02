<script lang="ts">
    import { ChevronDown } from "$lib/svgs"
    export let label: string
    export let value: any
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
    <h5 class="font-display text-either-gray-blue flex-grow font-bold text-xl">
        {label}
    </h5>
    <div class="space-x-4 border-either-gray-blue flex items-center p-2 border-2">
        <select class="text-either-gray-blue font-semibold appearance-none" bind:value>
            <slot />
        </select>
        <ChevronDown class="w-auto h-4" />
    </div>
</label>

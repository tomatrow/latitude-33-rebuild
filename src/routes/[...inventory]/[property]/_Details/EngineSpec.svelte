<script lang="ts">
    export let label: string
    export let value: number | string
</script>

{#if value !== undefined}
    <li>
        <span class="font-bold">{label}:</span>
        {value}
    </li>
{/if}

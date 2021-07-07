<script lang="ts">
    export let quote: string
    export let name: string
    export let position: string
</script>

<div class="space-y-3 p-9 border-pre-coffee-sky-blue rounded-xl border text-sm">
    <div>{'"' + quote + '"'}</div>
    <span class="text-tinted-rear-window font-bold">{"-"}{name}, {position}</span>
</div>

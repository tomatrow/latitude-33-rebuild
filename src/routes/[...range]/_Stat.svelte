<script lang="ts">
    export let label: string
</script>

<div class="space-y-2">
    <h5 class="font-display text-a-stormy-morning font-light">{label}</h5>
    <span class="pl-4 text-black font-thin"><slot /></span>
</div>

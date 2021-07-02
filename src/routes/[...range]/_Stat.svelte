<script lang="ts">
    export let label: string
</script>

<div class="spcae-y-2">
    <h5 class="font-display text-either-gray-blue font-bold text-xl">{label}</h5>
    <span class="pl-4 text-black"><slot /></span>
</div>

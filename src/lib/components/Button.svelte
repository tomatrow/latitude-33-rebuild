<script lang="ts">
    export let type: "button" | "submit" | "reset" = "button"
</script>

<button {type} on:click {...$$restProps}><slot /></button>

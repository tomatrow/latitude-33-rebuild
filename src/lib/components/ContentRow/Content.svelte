<script lang="ts">
    let clazz = ""
    export { clazz as class }
    export let contentHtml: string
</script>

{#if contentHtml}
    <div class="injected-content {clazz}">
        {@html contentHtml}
    </div>
{/if}
<script lang="ts">
    import type { AcfImage } from "$lib/index.type"

    export let icon: AcfImage
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img class="brightness-[100] pb-2 w-1/2 sm:w-1/3 md:w-1/2" {...icon} />

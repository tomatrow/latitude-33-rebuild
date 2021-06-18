<script lang="ts">
    export let center: boolean = undefined
    let clazz = ""
    export { clazz as class }
</script>

<section class="{clazz} relative px-5 md:px-0">
    {#if $$slots.left}
        <div class="offering-half absolute top-0 bottom-0 left-0 z-0 hidden md:block w-1/2">
            <slot name="left" />
        </div>
    {/if}
    {#if $$slots.right}
        <div class="offering-half absolute top-0 right-0 bottom-0 z-0 hidden md:block w-1/2">
            <slot name="right" />
        </div>
    {/if}
    <div
        class="grid grid-cols-1 md:grid-cols-2 z-10 {center
            ? 'max-w-7xl md:gap-y-32 mx-auto md:py-32'
            : 'gap-x-6 md:gap-x-0 md:gap-y-24'}"
    >
        <slot />
    </div>
</section>

<style global lang="postcss">
    .offering-half > * {
        @apply absolute inset-0;
    }
</style>

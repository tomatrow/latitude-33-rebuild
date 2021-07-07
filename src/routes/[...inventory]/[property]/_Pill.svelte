<script lang="ts">
    export let reverse = false
    let clazz = ""
    export { clazz as class }
</script>

<div
    class="{clazz} font-display flex items-center flex-col justify-center sm:justify-between rounded-full font-bold"
>
    <div class="{reverse ? 'text-3xl order-2' : 'text-xs'} text-center">
        <slot name="label" />
    </div>
    <div class="{reverse ? 'text-xs' : 'text-3xl'} text-center">
        <slot />
    </div>
</div>

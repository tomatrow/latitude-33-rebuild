<script lang="ts" context="module">
    export { increment } from "$lib/svelte-auto-a11y-heading"
</script>

<script lang="ts">
    import { Heading } from "$lib/svelte-auto-a11y-heading"

    let style: string = undefined
    let clazz = ""
    export { clazz as class }

    export let large: boolean = undefined
    export let small: boolean = undefined
    export let tiny: boolean = undefined
    export let subheading: string = undefined
    export let reverse = false

    // 38px, 44px  large
    // "large": ["2.375rem", "2.75rem"]
    // 32px, 36px  normal
    // "normal": ["2rem", "2.25rem"]
    // 24px, 32px  small
    // "small": ["1.5rem", "2rem"]
    // 18px, 28px tiny
    // "tiny": ["1.125rem", "1.75rem"]

    const text = ["text-tiny", "text-small", "text-normal", "text-large"]
    const level = large ? 3 : small ? 1 : tiny ? 0 : 2
</script>

<div
    class="uppercase tracking-2px flex {reverse
        ? 'flex-col-reverse'
        : 'flex-col'} gap-[10px] {clazz} {text[level]}"
    {style}
>
    <Heading class="font-display font-extralight">
        <slot />
    </Heading>

    {#if subheading || $$slots.subheading}
        <div class="font-sans font-thin text-small">
            <slot name="subheading" {subheading}>
                {subheading}
            </slot>
        </div>
    {/if}
</div>

<script context="module">
    export const fieldDefaults = {
        text: {
            class: "mt-1 text-dark-charcoal border border-either-gray-blue text-sm py-2 px-3 ",
            rootProps: {
                class: "flex flex-col text-base text-either-gray-blue font-bold font-display"
            }
        },
        toggle: {
            class: "mr-2 flex-shrink-0",
            rootProps: { class: "flex flex-row-reverse justify-end items-center" }
        },
        select: {
            class: "h-9 border border-either-gray-blue font-bold",
            rootProps: {
                class: "flex flex-col text-base text-either-gray-blue font-bold font-display"
            }
        }
    }
</script>

<script lang="ts">
    export let type: string = undefined
    export let checked: boolean = undefined
    export let rootProps = { class: undefined }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label {...rootProps}>
    <slot />
    {#if type === "checkbox"}
        <input bind:checked type="checkbox" {...$$restProps} />
    {:else if type === "radio"}
        <input type="radio" {...$$restProps} />
    {:else if type === "select"}
        <select {...$$restProps}>
            <slot name="options" />
        </select>
    {:else}
        <input {type} {...$$restProps} />
    {/if}
</label>

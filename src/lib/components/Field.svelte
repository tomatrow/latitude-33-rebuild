<script context="module">
    const date = {
        class: "mt-1 text-dark-charcoal border border-a-stormy-morning text-sm py-2 px-3 ",
        rootProps: {
            class: "flex flex-col items-start text-base text-a-stormy-morning uppercase tracking-2px font-light font-display"
        }
    }
    export const fieldDefaults = {
        text: {
            class: "mt-1 text-dark-charcoal border border-a-stormy-morning text-sm py-2 px-3 ",
            rootProps: {
                class: "uppercase tracking-2px flex flex-col text-base text-a-stormy-morning font-light font-display"
            }
        },
        date,
        number: date,
        toggle: {
            class: "mr-2 flex-shrink-0",
            rootProps: { class: "flex flex-row-reverse justify-end items-center" }
        },
        select: {
            class: "h-9 border border-a-stormy-morning font-light",
            rootProps: {
                class: "flex flex-col text-base text-a-stormy-morning font-light font-display"
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

<style>
    /* white calendar icon on chrome */
    input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
</style>

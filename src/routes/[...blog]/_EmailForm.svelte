<script lang="ts">
    import { noop } from "svelte/internal"
    import { Button } from "$lib/components"

    let clazz = ""
    export { clazz as class }

    export let subheading: string
    export let heading: string
    export let placeholder: string
    export let submitLabel: string
    export let termsNotice: string
</script>

<form class="{clazz} space-y-4 flex items-center flex-col" on:submit={noop}>
    <h5 class="font-display text-either-gray-blue text-center font-bold text-xl">
        {subheading}
    </h5>
    <h4
        class="font-display text-2.5xl leading-9 sm:leading-12 md:text-3.5xl font-extralight max-w-2xl text-center"
    >
        {heading}
    </h4>
    <div class="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row w-full max-w-lg">
        <input
            required
            class="transition duration-200 focus:border-opacity-100 border-opacity-20 py-2 px-4 w-full outline-none border border-black rounded text-lg"
            {placeholder}
            name="email"
            type="email"
        />
        <Button
            blob
            shadow
            ease
            filled
            color="pre-coffee-sky-blue"
            border
            class="py-4 px-6 font-bold text-sm"
            type="submit"
            title={submitLabel}
        />
    </div>
    <label class="space-x-3 flex items-center">
        <input required name="consent" type="checkbox" />
        <div class="injected-content email-form">
            {@html termsNotice}
        </div>
    </label>
</form>

<style lang="postcss" global>
    .injected-content.email-form {
        a {
            @apply text-pre-coffee-sky-blue;
        }
    }
</style>

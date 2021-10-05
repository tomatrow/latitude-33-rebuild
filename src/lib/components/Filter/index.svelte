<script lang="ts">
    import { createForm } from "felte"
    import { fly } from "svelte/transition"
    import { tick, createEventDispatcher } from "svelte"
    import Button from "$lib/components/Button.svelte"
    import { Cross } from "$lib/svgs"

    const dispatch = createEventDispatcher<{ submit: any }>()

    export let items = []
    export let filter = (data: any, items: any[]) => items

    const { form, data, reset, setFields } = createForm({
        onSubmit() {
            filtered = filter($data, items)
            hide()
            dispatch("submit")
        }
    })

    let filtering = false
    let persistedData: any
    let filtered = filter($data, items)

    async function show() {
        filtering = true
        await tick()
        setFields(persistedData)
    }

    function hide() {
        persistedData = $data
        filtering = false
    }
</script>

<svelte:window on:sveltekit:navigation-start={() => (filtering = false)} />

{#if filtering}
    <section
        class="space-y-2 bg-either-gray-blue fixed top-0 left-0 z-50 overflow-y-scroll p-4 w-full h-screen max-w-lg max-h-screen sm:w-auto text-white"
        transition:fly={{
            delay: 0,
            duration: 500,
            x: -600,
            y: 0
        }}
    >
        <Button shadow on:click={hide}>
            <Cross
                class="absolute top-0 right-0 m-4 w-10 h-10 text-white fill-current"
                fill="currentColor"
                strokeWidth={1}
            />
        </Button>
        <form use:form class="space-y-4">
            <slot name="fields" />
            <Button
                ease
                border
                color="white"
                fill="either-gray-blue"
                class="font-thin py-2 px-4"
                on:click={reset}>Reset</Button
            >
            <Button
                ease
                border
                color="white"
                fill="either-gray-blue"
                type="submit"
                class="font-thin py-2 px-4">Submit</Button
            >
        </form>
    </section>
{/if}

<slot {filtering} {show} {hide} {filtered} />

<script lang="ts" context="module">
    export const key = Symbol("Form Key")
</script>

<script lang="ts">
    import { writable } from "svelte/store"
    import { setContext, createEventDispatcher } from "svelte"
    import { createForm } from "felte"
    import { createValidator } from "@felte/validator-superstruct"
    import reporter from "@felte/reporter-cvapi"
    import { object } from "superstruct"
    
    export let validateStruct
    
    type FormValues = $$Generic<Record<string, any>>
    const dispatch = createEventDispatcher()
    
    
    const schema = writable({})
    
    
    const form = createForm<FormValues>({
        extend: [createValidator(failures => {
            console.log({ failures })
            return "Enter a value"
        }), reporter],
        validateStruct,
        async onSubmit(submission) {
           dispatch("submit", submission)
        }
    })

    export const context = {
        schema,
        form
    }
    
    setContext(key, context)
    
    const { data } = form 
    
    $: console.log({ d: $data })
</script>

<form use:form.form {...$$restProps} on:submit>
    <slot />
</form>
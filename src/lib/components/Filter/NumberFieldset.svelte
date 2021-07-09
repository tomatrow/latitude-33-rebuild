<script lang="ts">
    import Field from "$lib/components/Field.svelte"
    export let name: string

    const text = {
        class: "mt-1 text-black border border-either-gray-blue text-sm py-2 px-3",
        rootProps: {
            class: "flex flex-col text-base font-bold font-display"
        }
    }
</script>

<fieldset {name}>
    <h4 class="font-display font-black text-xl"><slot /></h4>
    <div class="sm:space-x-4 flex flex-col sm:flex-row">
        <Field {...text} type="number" min="0" name="min">Min</Field>
        <Field {...text} type="number" min="0" name="max">Max</Field>
    </div>
</fieldset>

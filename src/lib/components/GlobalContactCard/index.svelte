<script lang="ts">
    import { query } from "$lib/scripts/apollo"
    import { FloatingContactFormQuery } from "$lib/queries/contactForms"
    import FloatingButton from "./FloatingButton.svelte"

    export let showing: boolean = false
</script>

<svelte:window on:sveltekit:navigation-start={() => (showing = false)} />

<FloatingButton on:click={() => (showing = true)} />

{#await Promise.all( [query(FloatingContactFormQuery), import("./ContactModal.svelte")] ) then [{ data }, module]}
    <svelte:component
        this={module.default}
        bind:showing
        {...data.themeGeneralSettings.themeSettingsFields.floatingContactForm.contactFormFields}
    />
{/await}

<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Link from "$lib/components/Link.svelte"
    import Field, { fieldDefaults } from "$lib/components/Field.svelte"
    import { createForm } from "felte"
    import { createValidator } from "@felte/validator-superstruct"
    import { object, string, size } from "superstruct"
    import reporter from "@felte/reporter-cvapi"
    import { IconArrowRight, Envelope, Phone, Cross, PaperPlaneToy } from "$lib/svgs"

    import lottie from "lottie-web"
    import { browser } from "$app/env"
    import type { AnimationEventName } from "lottie-web"
    import { fly } from "svelte/transition"

    import { query } from "$lib/scripts/apollo"
    import { FloatingContactFormQuery } from "$lib/queries/contactForms"
    import { stripPhone, splitChoices } from "$lib/scripts/utility"
    import { session } from "$app/stores"
    import { icons } from "$lib/data/social"

    export let showing: boolean = false

    let fields: any
    query(FloatingContactFormQuery)
        .then(
            (response: any) =>
                (fields =
                    response?.data.themeGeneralSettings.themeSettingsFields.floatingContactForm
                        .contactFormFields)
        )
        .catch(error => console.error(error))

    const { form } = createForm({
        extend: [createValidator(() => "Enter a value"), reporter],
        validateStruct: object({
            name: size(string(), 1, Infinity),
            email: size(string(), 1, Infinity),
            phone: size(string(), 1, Infinity),
            service_requested: size(string(), 1, Infinity)
        }),
        onSubmit() {}
    })

    const text = {
        class: "mt-1 text-black border border-either-gray-blue text-sm py-2 px-3",
        rootProps: {
            class: "flex flex-col text-base font-bold font-display"
        }
    }
    const select = {
        class: "h-9 border border-either-gray-blue text-either-gray-blue font-bold",
        rootProps: {
            class: "flex flex-col text-base   font-bold font-display"
        }
    }
    let lottieContainer: HTMLDivElement
    $: if (browser && lottieContainer) {
        const animation = lottie.loadAnimation({
            path: "/bg-dna-lottie.json",
            container: lottieContainer,
            // renderer: "canvas",
            loop: true,
            autoplay: true
        })
        animation.setSpeed(0.33)
    }
</script>

<Button
    aria-label="open contact form"
    on:click={() => (showing = true)}
    shadow
    ease
    pill
    class="bg-either-gray-blue mb-28 fixed right-0 bottom-0 z-40 mr-6 p-2 border-2 border-white text-white"
>
    <PaperPlaneToy class="h-9 w-9" />
</Button>

{#if fields && showing}
    <section
        transition:fly={{
            delay: 0,
            duration: 500,
            x: 600,
            y: 0
        }}
        class="space-y-2 bg-either-gray-blue fixed top-0 right-0 z-50 overflow-y-scroll py-10 px-5 h-screen max-w-lg max-h-screen text-white"
    >
        <Button aria-label="close contact popup" shadow on:click={() => (showing = false)}>
            <Cross
                class="absolute top-0 right-0 m-4 w-10 h-10 text-white fill-current"
                fill="currentColor"
                strokeWidth={1}
            />
        </Button>
        <div
            bind:this={lottieContainer}
            class="absolute inset-0 w-full h-full opacity-10"
            style="z-index: -1;margin-top: 0"
        />

        <form use:form id="contact_page_form" class="space-y-2" on:submit|preventDefault>
            <Field {...text} name="name">{fields.form.nameLabel}</Field>
            <Field {...text} type="email" name="email">{fields.form.emailLabel}</Field>
            <Field {...text} type="tel" name="phone">{fields.form.phoneLabel}</Field>
            <Field {...select} type="select" name="service_requested">
                {fields.form.servicesLabel}
                <svelte:fragment slot="options">
                    <option>Select One</option>
                    {#each splitChoices(fields.form.serviceChoices) as value}
                        <option {value}>{value}</option>
                    {/each}
                </svelte:fragment>
            </Field>
            <Button border class="py-2 px-4" type="submit">Submit</Button>
        </form>

        <h4 class="font-display my-4 font-bold text-lg">{fields.sidebar.title}</h4>
        <p class="airy-copy text-sm">
            {fields.sidebar.blurb}
        </p>

        <Link
            href={fields.sidebar.bookingLink.href}
            class="arrow-link font-display flex items-center my-2 font-bold text-lg"
        >
            {fields.sidebar.bookingLink.title}
            <IconArrowRight class="arrow-right transition duration-200 w-4 h-4" />
        </Link>

        <h4 class="font-display font-bold text-lg" style="margin-top: 2rem">
            {fields.sidebar.address.title}
        </h4>
        <div class="airy-copy whitespace-pre-line text-sm">
            {fields.sidebar.address.content}
        </div>

        {#each [fields.sidebar.email1, fields.sidebar.email2] as email}
            <Link class="flex items-center font-black text-lg" href="mailto:{email}"
                ><Envelope class="mr-4 w-6 h-6" />{email}</Link
            >
        {/each}
        <Link
            class="flex items-center font-black text-lg"
            href="tel:{stripPhone(fields.sidebar.phone)}"
            ><Phone class="mr-4 w-6 h-6" />{fields.sidebar.phone}</Link
        >

        {#if fields.sidebar.socialMedia.visibility === "show"}
            <h4 class="font-display font-bold text-lg" style="margin-top: 3rem">
                {fields.sidebar.socialMedia.heading}
            </h4>
            <div class="space-x-2 flex">
                {#each $session.social as { url, service }}
                    <Link
                        shadow
                        pill
                        target="_blank"
                        class="bg-pre-coffee-sky-blue border-pre-coffee-sky-blue flex items-center justify-center w-10 h-10 border-2"
                        href={url}
                        ><svelte:component
                            this={icons[service]}
                            class="w-4 h-4 text-white"
                            fill="white"
                            strokeWidth="0"
                        /></Link
                    >
                {/each}
            </div>
        {/if}
    </section>
{/if}

<style>
    :global(.arrow-link:hover .arrow-right) {
        transform: translateX(6px);
    }
</style>

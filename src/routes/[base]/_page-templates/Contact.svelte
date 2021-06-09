<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { ContactFormFragment } from "$lib/queries/contactForms"
    import { PageFragment, ContactPageFragment } from "$lib/queries/pages"
    import { AcfLinkFragment } from "$lib/queries/utility"
    import { Meta } from "$lib/components"

    export const name = "Contact"
    export const Query = graphql`
        query AboutPageQuery($id: ID!, $isPreview: Boolean!) {
            page(id: $id, asPreview: $isPreview) {
                ...PageFragment
                template {
                    ...ContactPageFragment
                }
            }
        }
        ${PageFragment}
        ${ContactFormFragment}
        ${ContactPageFragment}
        ${AcfLinkFragment}
    `
</script>

<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Field, { fieldDefaults } from "$lib/components/Field.svelte"
    import { createForm } from "felte"
    import { createValidator } from "@felte/validator-superstruct"
    import { object, string, size } from "superstruct"
    import reporter from "@felte/reporter-cvapi"

    import { Envelope, Phone, IconArrowRight } from "$lib/svgs"

    import Link from "$lib/components/Link.svelte"

    import { icons } from "$lib/data/social"
    import { stripPhone, splitChoices } from "$lib/scripts/utility"
    import { session } from "$app/stores"

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

    export let page
    const { id, slug, title, template } = page

    const fields = template.contactPageFields.form.contactFormFields
</script>

<Meta post={page} />

<div class="banner mb-12 py-32">
    <div class="space-y-6 max-w-screen-2xl mx-auto px-6">
        <h5 class="font-display text-white font-extrabold text-sm">
            {template.contactPageFields.subHeading}
        </h5>
        <h1 class="font-display max-w-xl text-white font-black text-5xl">{title}</h1>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 my-12 px-6">
    <form
        use:form
        id="contact_page_form"
        class="space-y-3 mx-auto w-full max-w-lg"
        on:submit|preventDefault
    >
        <Field {...fieldDefaults.text} name="name">{fields.form.nameLabel}</Field>
        <Field {...fieldDefaults.text} type="email" name="email">{fields.form.emailLabel}</Field>
        <Field {...fieldDefaults.text} type="tel" name="phone">{fields.form.phoneLabel}</Field>
        <Field {...fieldDefaults.select} type="select" name="service_requested">
            {fields.form.servicesLabel}
            <svelte:fragment slot="options">
                <option>Select One</option>
                {#each splitChoices(fields.form.serviceChoices) as value}
                    <option {value}>{value}</option>
                {/each}
            </svelte:fragment>
        </Field>
        <Button blob shadow class="bg-either-gray-blue py-2 px-4" type="submit">Submit</Button>
    </form>
    <div class="flex items-center justify-center">
        <section class="bg-either-gray-blue w-96 rounded-md space-y-2 flex flex-col p-2 text-white">
            <h4 class="font-display font-bold text-lg">{fields.sidebar.title}</h4>
            <p class="airy-copy">
                {fields.sidebar.blurb}
            </p>

            <Link
                href={fields.sidebar.bookingLink.url}
                class="arrow-link font-display flex items-center font-bold text-lg"
            >
                {fields.sidebar.bookingLink.title}
                <IconArrowRight class="arrow-right transition duration-200 w-4 h-4" />
            </Link>

            <h4 class="font-display font-bold text-lg" style="margin-top: 3rem">
                {fields.sidebar.address.title}
            </h4>
            <div class="airy-copy whitespace-pre-line">
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
    </div>
</div>

<style>
    .banner {
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(/images/Pilatus-PC-12-NG-Exterior-2-1-1024x683.jpeg);
        background-position: 0px 0px, 50% 76%;
        background-size: auto, cover;
    }
    :global(.arrow-link:hover .arrow-right) {
        transform: translateX(6px);
    }
</style>

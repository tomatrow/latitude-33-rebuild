<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"
    import { ContactFormFragment } from "$lib/queries/contactForms"
    import { PageFragment, ContactPageFragment } from "$lib/queries/pages"
    import { AcfLinkFragment } from "$lib/queries/utility"
    import { loadPage } from "$lib/scripts/router"
    import { TripPlannerPsuedoFragment } from "$lib/components/TripPlanner/utility"

    export const load = loadPage(
        "Contact",
        graphql`
            query ContactPageQuery($id: ID!, $isPreview: Boolean!) {
                ${TripPlannerPsuedoFragment}
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
    )
</script>

<script lang="ts">
    import { session } from "$app/stores"
    import { createForm } from "felte"
    import { createValidator } from "@felte/validator-superstruct"
    import reporter from "@felte/reporter-cvapi"
    import { object, number, size } from "superstruct"
    import { fieldDefaults } from "$lib/components/Field.svelte"
    import { Meta, Button, Link, Field, Banner } from "$lib/components"
    import { IconArrowRight } from "$lib/svgs"
    import { icons } from "$lib/data/social"
    import { stripPhone, smoothEdges } from "$lib/scripts/utility"
    import { format } from "date-fns"
    import AirportSelects from "$lib/components/TripPlanner/AirportSelects.svelte"
    import { DateInput, nonEmptyString } from "$lib/components/TripPlanner/felte"
    import { getTripUrl, getMaxPassengers } from "$lib/components/TripPlanner/utility"
    import { goto } from "$app/navigation"
    
    export let tripFleet: any
    export let tripAirports: any
    export let page: any
    
    const maxPassengers = getMaxPassengers(tripFleet)

    const { form, data } = createForm({
        extend: [createValidator(() => "Enter a value"), reporter],
        validateStruct: object({
            departureAirportId: nonEmptyString,
            arrivalAirportId: nonEmptyString,
            departureDate: DateInput,
            passengers: size(number(), 1, maxPassengers),
            name: nonEmptyString,
            email: nonEmptyString,
            phone: nonEmptyString
        }),
        async onSubmit(submission) {
            try {
                const urlString = getTripUrl(submission, "/trip-planner-success")
                if (urlString) await goto(urlString)
            } catch (error) {
                console.error(error)
            }
        }
    })
    
    $: console.log({ data: $data })

    const { title, template } = page

    const fields = template.contactPageFields.form.contactFormFields
    // todo: make this non static
    const backgroundImage = { src: "/images/Pilatus-PC-12-NG-Exterior-2-1-1024x683.jpeg" }
</script>

<Meta title={page.title} seo={page.seo} />

<Banner {title} subheading={template.contactPageFields.subHeading} {backgroundImage} />

<div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 my-12 px-6">
    <form
        use:form
        id="contact_page_form"
        class="space-y-3 mx-auto w-full max-w-lg"
        on:submit|preventDefault
    >
        <Field {...fieldDefaults.text} name="name">{fields.form.nameLabel}</Field>
        <Field {...fieldDefaults.text} type="email" name="email">{fields.form.emailLabel}</Field
        >
        <Field {...fieldDefaults.text} type="tel" name="phone">{fields.form.phoneLabel}</Field>
        
        <h4 class="text-lg">Trip Details</h4>
    
        <Field
            required
            type="number"
            name="passengers"
            min={1}
            value={1}
            placeholder="Passengers"
            {...fieldDefaults.number}
            max={getMaxPassengers(tripFleet)}
        >
            Passengers
        </Field>
    
        <Field
            required
            type="date"
            name="departureDate"
            placeholder="YYYY-MM-DD"
            {...fieldDefaults.date}
            value={format(new Date(), "yyyy-MM-dd")}
            
        >
            Departure Date
        </Field>
        
        <AirportSelects airports={smoothEdges(tripAirports)}
            bind:departureAirportId={$data.departureAirportId}
            bind:arrivalAirportId={$data.arrivalAirportId}
            selectProps={{ selectClass: fieldDefaults.select.class,
            rootClass: fieldDefaults.select.rootProps.class,
            labelClass: "" }} />

        <Button
            ease
            blob
            shadow
            color="a-stormy-morning"
            filled
            class="py-2 px-4 text"
            type="submit">Submit</Button
        >
    </form>
    <div class="flex items-center justify-center">
        <section class="bg-a-stormy-morning w-96 rounded-md space-y-2 flex flex-col p-6 text-white">
            <h4 class="font-display text-lg">{fields.sidebar.title}</h4>
            <p class="airy-copy">
                {fields.sidebar.blurb}
            </p>

            <Link
                href={fields.sidebar.bookingLink.href}
                class="arrow-link font-display flex items-center text-lg"
            >
                {fields.sidebar.bookingLink.title}
                <IconArrowRight class="arrow-right transition duration-200 w-4 h-4" />
            </Link>

            <h4 class="font-display text-lg" style="margin-top: 3rem">
                {fields.sidebar.address.title}
            </h4>
            <div class="airy-copy whitespace-pre-line">
                {fields.sidebar.address.content}
            </div>

            {#each [fields.sidebar.email1, fields.sidebar.email2] as email}
                <Link class="flex items-center text-lg" href="mailto:{email}">{email}</Link>
            {/each}
            <Link class="flex items-center text-lg" href="tel:{stripPhone(fields.sidebar.phone)}"
                >{fields.sidebar.phone}</Link
            >

            {#if fields.sidebar.socialMedia.visibility === "show"}
                <h4 class="font-display text-lg" style="margin-top: 3rem">
                    {fields.sidebar.socialMedia.heading}
                </h4>
                <div class="space-x-2 flex">
                    {#each $session.social as { url, service }}
                        <Link
                            aria-label={service}
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
    :global(.arrow-link:hover .arrow-right) {
        transform: translateX(6px);
    }
</style>

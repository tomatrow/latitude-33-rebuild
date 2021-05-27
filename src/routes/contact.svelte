<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Field, { fieldDefaults } from "$lib/components/Field.svelte"
    import { createForm } from "felte"
    import { createValidator } from "@felte/validator-superstruct"
    import { object, string, size } from "superstruct"
    import reporter from "@felte/reporter-cvapi"
    import IconArrowRight from "$lib/svgs/IconArrowRight.svelte"
    import Link from "$lib/components/Link.svelte"
    import { social } from "$lib/data/social"
    import Envelope from "$lib/svgs/Envelope.svelte"
    import Phone from "$lib/svgs/Phone.svelte"

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

    const subheading = "Contact Us"
    const heading = "Latitude 33: Where Luxury Meets Lifestyle"

    const sidebar = {
        title: "Get in touch",
        blurb: "Experience the finest in air travel with Latitude 33 Aviation, Southern California’s premier company for private jet charter, aircraft management, and aircraft sales.",
        bookingLink: {
            title: "Book Your Trip",
            href: "#"
        },
        addressTitle: "Contact Infomation",
        addressHtml: "2100 Palomar Airport Road<br />Suite 211<br />Carlsbad, CA 92011",
        emails: ["charter@L33jets.com", "contact@L33jets.com"],
        phone: "844.670.0310",
        socialMediaHeading: "Social Media"
    }
</script>

<div class="banner mb-12 py-32">
    <div class="space-y-6 max-w-screen-2xl mx-auto px-6">
        <h5 class="font-display text-white font-extrabold text-sm">{subheading}</h5>
        <h1 class="font-display max-w-xl text-white font-black text-5xl">{heading}</h1>
    </div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 my-12 px-6">
    <form
        use:form
        id="contact_page_form"
        class="space-y-3 mx-auto w-full max-w-lg"
        on:submit|preventDefault
    >
        <Field {...fieldDefaults.text} name="name">Name</Field>
        <Field {...fieldDefaults.text} type="email" name="email">Email Address</Field>
        <Field {...fieldDefaults.text} type="tel" name="phone">Phone Number</Field>
        <Field {...fieldDefaults.select} type="select" name="service_requested">
            How Can We Help You?
            <svelte:fragment slot="options">
                <option>Select One</option>
                <option value="service_01">Service 01</option>
                <option value="service_02">Service 02</option>
                <option value="service_03">Service 03</option>
            </svelte:fragment>
        </Field>
        <Button blob shadow class="bg-either-gray-blue py-2 px-4" type="submit">Submit</Button>
    </form>
    <div class="flex items-center justify-center">
        <section class="bg-either-gray-blue w-96 rounded-md space-y-2 flex flex-col p-2 text-white">
            <h4 class="font-display font-bold text-lg">{sidebar.title}</h4>
            <p class="airy-copy">
                {sidebar.blurb}
            </p>

            <Link
                href={sidebar.bookingLink.href}
                class="arrow-link font-display flex items-center font-bold text-lg"
            >
                {sidebar.bookingLink.title}
                <IconArrowRight class="arrow-right transition duration-200 w-4 h-4" />
            </Link>

            <h4 class="font-display font-bold text-lg" style="margin-top: 3rem">
                {sidebar.addressTitle}
            </h4>
            <div class="airy-copy">
                {@html sidebar.addressHtml}
            </div>

            {#each sidebar.emails as email}
                <Link class="flex items-center font-black text-lg" href="mailto:{email}"
                    ><Envelope class="mr-4 w-6 h-6" />{email}</Link
                >
            {/each}
            <Link
                class="flex items-center font-black text-lg"
                href="tel:{sidebar.phone.match(/\d/g).join('')}"
                ><Phone class="mr-4 w-6 h-6" />{sidebar.phone}</Link
            >

            <h4 class="font-display font-bold text-lg" style="margin-top: 3rem">
                {sidebar.socialMediaHeading}
            </h4>
            <div class="space-x-2 flex">
                {#each social as { href, icon }}
                    <Link
                        shadow
                        pill
                        target="_blank"
                        class="bg-pre-coffee-sky-blue border-pre-coffee-sky-blue flex items-center justify-center w-10 h-10 border-2"
                        {href}
                        ><svelte:component
                            this={icon}
                            class="w-4 h-4 text-white"
                            fill="white"
                            strokeWidth="0"
                        /></Link
                    >
                {/each}
            </div>
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

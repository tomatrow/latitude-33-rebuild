<script lang="ts">
    import { createForm } from "felte"
    import { createValidator } from "@felte/validator-superstruct"
    import { object, string, size } from "superstruct"
    import reporter from "@felte/reporter-cvapi"
    import { session } from "$app/stores"
    import { Envelope, Phone, Cross } from "$lib/svgs"
    import { stripPhone, splitChoices } from "$lib/scripts/utility"
    import { icons } from "$lib/data/social"
    import Button from "$lib/components/Button.svelte"
    import Link from "$lib/components/Link.svelte"
    import Field from "$lib/components/Field.svelte"
    import Arrow from "$lib/components/Arrow.svelte"
    import { Animation, AnimationState } from "$lib/svelte-lottie"

    export let showing: boolean
    export let form: any
    export let sidebar: any

    const { form: felteForm } = createForm({
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
            class: "flex flex-col text-base font-bold font-display"
        }
    }
</script>

<section
    class:showing
    class="space-y-2 bg-either-gray-blue fixed top-0 right-0 z-50 overflow-y-scroll py-10 px-5 h-screen max-w-lg max-h-screen text-white"
>
    <Button aria-label="close contact popup" shadow on:click={() => (showing = false)}>
        <Cross
            class="absolute top-0 right-0 m-4 w-10 h-10 text-white fill-current"
            fill="currentColor"
            strokeWidth={1}
        />
    </Button>

    <Animation
        class="absolute inset-0 w-full h-full opacity-10"
        style="z-index: -1;margin-top: 0"
        speed={0.33}
        state={showing ? AnimationState.Playing : AnimationState.Paused}
        params={{
            path: "/bg-dna-lottie.json",
            renderer: "svg",
            loop: true,
            autoplay: false
        }}
    />

    <form use:felteForm id="contact_page_form" class="space-y-2" on:submit|preventDefault>
        <Field {...text} name="name">{form.nameLabel}</Field>
        <Field {...text} type="email" name="email">{form.emailLabel}</Field>
        <Field {...text} type="tel" name="phone">{form.phoneLabel}</Field>
        <Field {...select} type="select" name="service_requested">
            {form.servicesLabel}
            <svelte:fragment slot="options">
                <option>Select One</option>
                {#each splitChoices(form.serviceChoices) as value}
                    <option {value}>{value}</option>
                {/each}
            </svelte:fragment>
        </Field>
        <Button border class="py-2 px-4" type="submit">Submit</Button>
    </form>

    <h4 class="font-display my-4 font-bold text-lg">{sidebar.title}</h4>
    <p class="airy-copy text-sm">
        {sidebar.blurb}
    </p>

    <Link
        href={sidebar.bookingLink.href}
        class="font-display flex items-center my-2 font-bold text-lg"
    >
        {sidebar.bookingLink.title}
        <Arrow class="ml-2 w-4 h-4" />
    </Link>

    <h4 class="font-display font-bold text-lg" style="margin-top: 2rem">
        {sidebar.address.title}
    </h4>
    <div class="airy-copy whitespace-pre-line text-sm">
        {sidebar.address.content}
    </div>

    {#each [sidebar.email1, sidebar.email2] as email}
        <Link class="flex items-center font-black text-lg" href="mailto:{email}"
            ><Envelope class="mr-4 w-6 h-6" />{email}</Link
        >
    {/each}

    <Link class="flex items-center font-black text-lg" href="tel:{stripPhone(sidebar.phone)}"
        ><Phone class="mr-4 w-6 h-6" />{sidebar.phone}</Link
    >

    {#if sidebar.socialMedia.visibility === "show"}
        <h4 class="font-display font-bold text-lg" style="margin-top: 3rem">
            {sidebar.socialMedia.heading}
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

<style lang="postcss">
    section {
        z-index: 100;
        opacity: 0;
        transition: all 0.4s;
        transform: translateX(100vw);
        &.showing {
            opacity: 1;
            transform: translateX(0);
        }
    }
</style>

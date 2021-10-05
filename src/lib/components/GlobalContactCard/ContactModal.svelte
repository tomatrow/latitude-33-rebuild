<script lang="ts">
    import { createForm } from "felte"
    import { createValidator } from "@felte/validator-superstruct"
    import { object, string, size } from "superstruct"
    import reporter from "@felte/reporter-cvapi"
    import { session } from "$app/stores"
    import { Cross } from "$lib/svgs"
    import { stripPhone, splitChoices } from "$lib/scripts/utility"
    import { icons } from "$lib/data/social"
    import Button, { themes } from "$lib/components/Button.svelte"
    import Link from "$lib/components/Link.svelte"
    import Field from "$lib/components/Field.svelte"
    import Arrow from "$lib/components/Arrow.svelte"
    import { Animation, AnimationState } from "$lib/svelte-lottie"

    export let showing: boolean
    export let form: any
    export let sidebar: any

    let submitted = false

    const { form: felteForm } = createForm({
        extend: [createValidator(() => "Enter a value"), reporter],
        validateStruct: object({
            name: size(string(), 1, Infinity),
            email: size(string(), 1, Infinity),
            phone: size(string(), 1, Infinity),
            service_requested: size(string(), 1, Infinity)
        }),
        onSubmit() {
            submitted = true
        }
    })

    const text = {
        class: "mt-1 text-black border border-either-gray-blue text-sm py-2 px-3",
        rootProps: {
            class: "flex flex-col text-base font-light font-display"
        }
    }
    const select = {
        class: "h-9 border border-either-gray-blue text-either-gray-blue font-light",
        rootProps: {
            class: "flex flex-col text-base font-light font-display"
        }
    }
    const submissionMessage = "Thank You!"
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

    <h4 class="font-display my-4 text-lg uppercase tracking-2px font-thin">{sidebar.title}</h4>
    <p class="text-sm font-light tracking-px">
        {sidebar.blurb}
    </p>

    {#if submitted}
        <div class="m-auto text-2xl">{submissionMessage}</div>
    {:else}
        <form use:felteForm id="contact_page_form" class="space-y-2" on:submit|preventDefault>
            <Field {...text} name="name">
                <span class="uppercase font-thin tracking-px">{form.nameLabel}</span>
            </Field>
            <Field {...text} type="email" name="email">
                <span class="uppercase font-thin tracking-px">{form.emailLabel}</span>
            </Field>
            <Field {...text} type="tel" name="phone">
                <span class="uppercase font-thin tracking-px">{form.phoneLabel}</span>
            </Field>
            <Field {...select} type="select" name="service_requested">
                <span class="uppercase font-thin tracking-px">{form.servicesLabel}</span>
                <svelte:fragment slot="options">
                    {#each splitChoices(form.serviceChoices) as value}
                        <option {value}>{value}</option>
                    {/each}
                </svelte:fragment>
            </Field>
            <Button {...themes.light()} type="submit">Submit</Button>
        </form>
    {/if}

    <Link
        href={sidebar.bookingLink.href}
        class="font-display flex items-center my-2 font-light text-lg uppercase"
    >
        {sidebar.bookingLink.title}
        <Arrow class="ml-2 w-4 h-4" />
    </Link>

    <h4 class="font-display font-light text-lg uppercase font-thin" style="margin-top: 2rem">
        {sidebar.address.title}
    </h4>
    <div class="airy-copy whitespace-pre-line text-sm">
        {sidebar.address.content}
    </div>

    {#each [sidebar.email1, sidebar.email2] as email}
        <Link class="flex items-center font-light text-lg" href="mailto:{email}">{email}</Link>
    {/each}

    <Link class="flex items-center font-normal text-lg" href="tel:{stripPhone(sidebar.phone)}"
        >{sidebar.phone}</Link
    >

    {#if sidebar.socialMedia.visibility === "show"}
        <h4 class="font-display font-light text-lg uppercase" style="margin-top: 3rem">
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

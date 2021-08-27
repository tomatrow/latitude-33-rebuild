<script lang="ts" context="module">
    const footerFields = {
        brandName: "Latitude 33 Aviation",
        brandTagLine: "Where Luxury Meets Lifestyle",
        phone: "800.840.0310",
        emails: [
            {
                label: "Charter Requests",
                email: "charter@L33Jets.com"
            },
            {
                label: "General Inquiries",
                email: "contact@L33Jets.com"
            }
        ],
        physicalAddress: `2100 Palomar Airport Road, Suite 211
        Carlsbad, CA 92011`,
        corporateInfo: `Latitude 33 Aviation, LLC 2006-2020 – Air Carrier Certificate #2PIA602N`
    }
    const text = {
        class: "mt-1 text-black w-full text-sm py-2 px-3",
        rootProps: {
            class: "flex flex-col text-base font-display"
        }
    }
    const select = {
        class: "h-9 w-full text-velours-bleu ",
        rootProps: {
            class: "flex flex-col text-base font-display"
        }
    }
</script>

<script lang="ts">
    import { session } from "$app/stores"
    import { cssVars } from "../actions/styles"
    import Link from "./Link.svelte"
    import Field from "./Field.svelte"
    import Button from "./Button.svelte"
    import { icons } from "$lib/data/social"

    const { brandName, brandTagLine, phone, emails, physicalAddress, corporateInfo } = footerFields
</script>

<footer
    class="pb-12 bg-cover bg-no-repeat text-white font-light"
    use:cssVars={{
        image: `url(/images/Cessna-Citation-Sovereign-Super-Midsize-Aircraft-For-Charter.jpeg)`,
        opacity: 0.4
    }}
>
    <nav class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-4 px-5">
        <div class="col-span-full gap-4 flex items-center flex-col sm:flex-row justify-between">
            <Link href="/" sveltekit:prefetch>
                <img
                    class="w-44 object-contain"
                    src="/icons/latitude33-logo-white.png"
                    alt="latitude 33 logo"
                />
            </Link>
            <img
                class="w-auto h-full"
                src="/icons/safety-certification-logos.png"
                alt="safety certification logos from NBAA/WYVERN/ARGUS"
            />
        </div>

        <div class="font-display space-y-3 flex flex-col text-xl">
            <h6>
                {brandTagLine}
                <br />
                {brandName}
            </h6>
            <Link class="sm:space-x-2 flex flex-col sm:flex-row" href="tel:{phone}">
                <span>Phone:</span>
                <span>{phone}</span>
            </Link>
            {#each emails as { email, label }}
                <div class="sm:space-x-2 flex flex-col sm:flex-row">
                    <span class="">{label}:</span>
                    <Link class="space-x-2 flex items-center" href="mailto:{email}">{email}</Link>
                </div>
            {/each}
            <h6 class="whitespace-pre-line font-light">{physicalAddress}</h6>
            <h6 class="whitespace-pre-line font-light">{corporateInfo}</h6>
        </div>

        <div class="grid grid-rows-6 grid-cols-2">
            {#each $session.menus.secondary.menuItems as { label, url, target }}
                <Link {target} sveltekit:prefetch href={url} class="font-display text-xl"
                    >{label}</Link
                >
            {/each}
        </div>

        <form
            id="footer_form"
            class="gap-y-2 flex items-stretch flex-col mx-auto w-full max-w-md"
            on:submit|preventDefault
        >
            <Field {...text} name="name">Name</Field>
            <Field {...text} type="email" name="email">Email</Field>
            <Field {...text} type="tel" name="phone">Phone</Field>
            <Field {...select} type="select" name="service_requested">
                Services
                <svelte:fragment slot="options">
                    {#each ["Charter", "Management", "Sales", "Other"] as value}
                        <option {value}>{value}</option>
                    {/each}
                </svelte:fragment>
            </Field>
            <Button shadow ease border class="self-center sm:self-start py-2 px-4" type="submit"
                >Submit</Button
            >
        </form>
    </nav>
    <nav
        class="space-y-8 md:space-y-0 flex items-center flex-col md:flex-row md:justify-between mt-32 px-5"
    >
        <div class="space-x-5 flex">
            {#each $session.menus.secondarySmall.menuItems as { label, url, target }}
                <Link {target} sveltekit:prefetch href={url} class="text-sm">{label}</Link>
            {/each}
        </div>
        <div class="space-x-5 flex">
            {#each $session.social as { service, url }}
                <Link
                    aria-label="{service} profile"
                    href={url}
                    target="_blank"
                    class="transition-opacity duration-200 opacity-50 hover:opacity-100"
                    ><svelte:component
                        this={icons[service]}
                        class="w-5 h-5 text-white"
                        strokeWidth="0"
                        fill="white"
                    /></Link
                >
            {/each}
        </div>
    </nav>
</footer>

<style>
    footer {
        background-image: linear-gradient(
                180deg,
                rgba(0, 0, 0, var(--opacity)),
                rgba(0, 0, 0, var(--opacity))
            ),
            var(--image);
    }
</style>

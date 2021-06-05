<script lang="ts" context="module">
    import { query } from "$lib/scripts/apollo"
    import * as AboutInfo from "./page-templates/_About.svelte"
    import * as ContactInfo from "./page-templates/_Contact.svelte"
    import * as FleetInfo from "./page-templates/_Fleet.svelte"

    export const load: import("@sveltejs/kit").Load = async ({ page, session }) => {
        const { base } = page.params
        const pageInfo = session.pages.find(page => page.slug === base)

        if (!pageInfo)
            return {
                status: 404
            }

        const { id } = pageInfo
        const { templateName } = pageInfo.template

        let templateQuery: string
        switch (templateName) {
            case AboutInfo.name:
                templateQuery = AboutInfo.Query
                break
            case ContactInfo.name:
                templateQuery = ContactInfo.Query
                break
            case FleetInfo.name:
                templateQuery = FleetInfo.Query
                break
            default:
                return {
                    status: 404
                }
        }

        const response = await query(templateQuery, { id })

        const { data } = response

        return {
            status: 200,
            props: {
                templateName,
                data
            }
        }
    }
</script>

<script lang="ts">
    import Contact from "./page-templates/_Contact.svelte"
    import About from "./page-templates/_About.svelte"
    import Fleet from "./page-templates/_Fleet.svelte"
    import { Link } from "$lib/components"

    export let templateName: string
    export let data: any
</script>

{#if templateName === ContactInfo.name}
    <Contact {...data.page} />
{:else if templateName === AboutInfo.name}
    <About {...data.page} />
{:else if templateName === FleetInfo.name}
    <Fleet {...data} />
{:else}
    <Link class="block text-black text-center" sveltekit:prefetch href="/">Home</Link>
{/if}

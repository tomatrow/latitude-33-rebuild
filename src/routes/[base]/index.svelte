<script lang="ts" context="module">
    import { query } from "$lib/scripts/apollo"
    import * as AboutInfo from "./_page-templates/About.svelte"
    import * as ContactInfo from "./_page-templates/Contact.svelte"
    import * as FleetInfo from "./_page-templates/Fleet.svelte"
    import * as HomeInfo from "./_page-templates/Home/index.svelte"
    import { createLoad } from "$lib/scripts/utility"

    export async function fetchPage({ template }, variables) {
        let templateQuery: string
        switch (template.templateName) {
            case AboutInfo.name:
                templateQuery = AboutInfo.Query
                break
            case ContactInfo.name:
                templateQuery = ContactInfo.Query
                break
            case FleetInfo.name:
                templateQuery = FleetInfo.Query
                break
            case HomeInfo.name:
                templateQuery = HomeInfo.Query
                break
            default:
                throw new Error(`Page template not found: '${template.templateName}'`)
        }
        const response = await query(templateQuery, variables)
        return response.data
    }

    export const load: Load = createLoad(
        ({ page, session }) => session.pages.find(item => item.slug === page.params.base),
        fetchPage
    )
</script>

<script lang="ts">
    import Contact from "./_page-templates/Contact.svelte"
    import About from "./_page-templates/About.svelte"
    import Fleet from "./_page-templates/Fleet.svelte"
    import Home from "./_page-templates/Home/index.svelte"
    import { Link } from "$lib/components"
    import { onMount } from "svelte"

    export let info: any
    export let data: any
    export let variables: any

    onMount(async () => (data ??= await fetchPage(info, variables)))
</script>

{#if data}
    {#if info.template.templateName === ContactInfo.name}
        <Contact {...data} />
    {:else if info.template.templateName === AboutInfo.name}
        <About {...data} />
    {:else if info.template.templateName === FleetInfo.name}
        <Fleet {...data} />
    {:else if info.template.templateName === HomeInfo.name}
        <Home {...data} />
    {:else}
        <Link class="block text-black text-center" sveltekit:prefetch href="/">Home</Link>
    {/if}
{/if}

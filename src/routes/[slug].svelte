<script lang="ts" context="module">
    import { query } from "$lib/scripts/apollo"
    import { GetPageQuery } from "$lib/queries/pages"

    export const load: import("@sveltejs/kit").Load = async ({ page, session }) => {
        const slug = page.path.slice(1)
        const pageInfo = session.pages.find(page => page.slug === slug)
        if (!pageInfo)
            return {
                status: 404
            }

        const { id, template } = pageInfo
        const response = await query(GetPageQuery, { id })

        return {
            status: 200,
            props: {
                templateName: template.templateName,
                page: response.data.page
            }
        }
    }
</script>

<script lang="ts">
    import Contact from "./templates/_Contact.svelte"
    import About from "./templates/_About.svelte"
    export let templateName: string
    export let page: any
</script>

{#if templateName === "Contact"}
    <Contact {...page} />
{:else if templateName === "About"}
    <About {...page} />
{/if}

<script lang="ts" context="module">
    import { query } from "$lib/scripts/apollo"
    import { GetPageQuery } from "$lib/queries/pages"

    /**
     * @type {import('@sveltejs/kit').Load}
     */
    export async function load({ page, fetch, session, context }) {
        const slug = page.path.slice(1)
        const { id, templateName } = session.pages.find(page => page.slug === slug)
        if (!id)
            return {
                status: 404
            }
        const response = await query(GetPageQuery, { id })

        return {
            status: 200,
            props: {
                templateName,
                page: response.data.page
            }
        }
    }
</script>

<script lang="ts">
    import Contact from "./templates/_Contact.svelte"
    export let templateName: string
    export let page: any
</script>

{#if templateName === "Contact"}
    <Contact {...page} />
{/if}

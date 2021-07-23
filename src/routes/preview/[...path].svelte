<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { query, graphql } from "$lib/scripts/apollo"
    import type { Load } from "@sveltejs/kit"
    
    async function preview(previewPath: string) {
        const root = "/preview"
        const path = previewPath === root ? "/" : previewPath.replace(root, '')

        try {
            console.log("Preview query", { browser, path })
            const result = await query(graphql`
                query PreviewTestQuery($path: ID!) {
                    page(asPreview: true, idType: URI, id: $path) {
                        id
                        title
                    }
                }
            `, { nonce: true, path })
            console.log({ browser }, JSON.stringify(result))
        } catch (error) {
            console.error({ browser }, JSON.stringify(error))
        }
    }

    export const load: Load = async ({ page }) => {
        const { path } = page
        await preview(path)
        return { status: 200, props: { path } }
    }
</script>

<script lang="ts">
    import { onMount } from "svelte"
    
    export let path: string
    
    onMount(()=> preview(path))
</script>

<h1>Preview: {path}</h1>
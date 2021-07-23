<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { query, graphql } from "$lib/scripts/apollo"
    import type { Load } from "@sveltejs/kit"
    
    async function preview(path: string) {
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
            return {
                path,
                result
            }
        } catch (error) {
            console.error({ browser }, JSON.stringify(error))
            return { error }
        }
    }

    export const load: Load = async ({ page }) => {
        const root = "/preview"
        const path = page.path === root ? "/" : page.path.replace(root, '')
        return { status: 200, props: await preview(path) }
    }
</script>

<script lang="ts">
    export let path: string
</script>

Path: <input bind:value={path} />
<br />
<button type="button" on:click={() => preview(path)}>Run</button>
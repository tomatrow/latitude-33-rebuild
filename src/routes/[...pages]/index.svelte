<script lang="ts" context="module">
    import { rewriteLoad } from "$lib/components/RewriteLoader.svelte"
    import { load as loadHome } from "./_home/index.svelte"
    import { load as loadAbout } from "./_about.svelte"
    import { load as loadContact } from "./_contact.svelte"
    import { load as loadFleet } from "./_fleet/index.svelte"
    import { load as loadBlog } from "./_blog/index.svelte"
    import { load as loadGeneric } from "./_generic.svelte"

    const routes = [
        [loadHome, () => import("./_home/index.svelte")],
        [loadAbout, () => import("./_about.svelte")],
        [loadContact, () => import("./_contact.svelte")],
        [loadFleet, () => import("./_fleet/index.svelte")],
        [loadBlog, () => import("./_blog/index.svelte")],
        [loadGeneric, () => import("./_generic.svelte")]
    ]

    export const load = rewriteLoad(routes)
</script>

<script lang="ts">
    import { RewriteLoader } from "$lib/components"

    export let index: number
    export let props: any
</script>

<RewriteLoader {routes} {index} {props} />

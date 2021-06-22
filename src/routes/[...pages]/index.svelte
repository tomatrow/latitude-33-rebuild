<script lang="ts" context="module">
    import { rewriteLoad } from "$lib/components/RewriteLoader.svelte"
    import { load as loadHome } from "./_home/index.svelte"
    import { load as loadAbout } from "./_about.svelte"
    import { load as loadContact } from "./_contact.svelte"
    import { load as loadFleet } from "./_fleet/index.svelte"
    import { load as loadBlog } from "./_blog/index.svelte"

    enum PageRoute {
        about,
        home,
        contact,
        fleet,
        blog
    }

    export const load = rewriteLoad([
        { id: PageRoute.home, load: loadHome },
        { id: PageRoute.about, load: loadAbout },
        { id: PageRoute.contact, load: loadContact },
        { id: PageRoute.fleet, load: loadFleet },
        { id: PageRoute.blog, load: loadBlog }
    ])
</script>

<script lang="ts">
    import { RewriteLoader } from "$lib/components"

    export let id: PageRoute
    export let props: any

    function resolve(id: PageRoute) {
        switch (id) {
            case PageRoute.about:
                return import("./_about.svelte")
            case PageRoute.home:
                return import("./_home/index.svelte")
            case PageRoute.contact:
                return import("./_contact.svelte")
            case PageRoute.fleet:
                return import("./_fleet/index.svelte")
            case PageRoute.blog:
                return import("./_blog/index.svelte")
            default:
                throw new Error(`Unknown id ${id}`)
        }
    }
</script>

<RewriteLoader {resolve} {id} {props} />

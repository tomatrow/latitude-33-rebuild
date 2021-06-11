<script lang="ts" context="module">
    import { rewriteLoad } from "$lib/components/RewriteLoader.svelte"
    import { load as loadHome } from "./[home]/index.svelte"
    import { load as loadAbout } from "./[about].svelte"
    import { load as loadContact } from "./[contact].svelte"

    enum PageRoute {
        about,
        home,
        contact
    }

    export const load = rewriteLoad([
        { id: PageRoute.home, load: loadHome },
        { id: PageRoute.about, load: loadAbout },
        { id: PageRoute.contact, load: loadContact }
    ])
</script>

<script lang="ts">
    import { RewriteLoader } from "$lib/components"

    export let id: PageRoute
    export let props: any

    function resolve(id: PageRoute) {
        switch (id) {
            case PageRoute.about:
                return import("./[about].svelte")
            case PageRoute.home:
                return import("./[home]/index.svelte")
            case PageRoute.contact:
                return import("./[contact].svelte")
            default:
                throw new Error(`Unknown id ${id}`)
        }
    }
</script>

<RewriteLoader {resolve} {id} {props} />

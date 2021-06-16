<script context="module" lang="ts">
    import type { Load, LoadInput, LoadOutput } from "@sveltejs/kit"

    export interface Route {
        id: any
        load: Load
    }

    export function rewriteLoad(routes: Route[]): Load {
        return async input => {
            let id: any
            let output: LoadOutput

            for (const route of routes) {
                output = await route.load(input)
                if (output) {
                    id = route.id
                    break
                }
            }

            if (output === undefined) return

            return {
                ...output,
                props: {
                    id,
                    props: output.props
                }
            }
        }
    }
</script>

<script lang="ts">
    import type { SvelteComponent } from "svelte"
    export let id: any
    export let props: any
    export let resolve: (id: any) => Promise<{ default: SvelteComponent }>
</script>

{#await resolve(id) then module}
    <svelte:component this={module?.default} {...props ?? {}} />
{/await}

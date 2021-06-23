<script context="module" lang="ts">
    import type { Load, LoadInput, LoadOutput } from "@sveltejs/kit"

    export type Importer = () => Promise<{ default: SvelteComponent }>

    export function rewriteLoad(routes: [Load, Importer][]): Load {
        return async input => {
            for (const [index, [load]] of routes.entries()) {
                const output = await load(input)

                if (!output) continue

                output.props = {
                    index,
                    props: output.props
                }

                return output
            }
        }
    }
</script>

<script lang="ts">
    import type { SvelteComponent } from "svelte"
    export let index: number
    export let props: any
    export let routes: [Load, Importer][]
</script>

{#await routes[index][1]() then module}
    <svelte:component this={module?.default} {...props ?? {}} />
{/await}

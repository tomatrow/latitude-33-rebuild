<script lang="ts" context="module">
    import { get, writable } from "svelte/store"
    import type { SvelteComponent } from "svelte"

    interface ModalPayload {
        component?: typeof SvelteComponent
        props: object
    }

    const _open = writable(false)
    const _payload = writable<ModalPayload>({ props: {} })
    let _closePromise: (payload: any | ModalPayload) => void

    export function openModal(component: typeof SvelteComponent, props = {}) {
        _open.set(true)
        _payload.set({ component, props })
        return new Promise(resolve => (_closePromise = resolve))
    }

    export function closeModal(response: any) {
        _open.set(false)
        if (typeof _closePromise === "function") _closePromise(response ?? get(_payload))
    }
</script>

{#if $_open}
    <svelte:component this={$_payload.component} {...$_payload.props} close={closeModal} />
{/if}

<script lang="ts" context="module">
    export const enum AnimationState {
        Loading = "loading",
        Playing = "playing",
        Paused = "paused",
        Stopped = "stopped",
        Error = "error"
    }
</script>

<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte"
    import lottie from "lottie-web"
    import type {
        AnimationItem,
        AnimationConfigWithPath,
        AnimationConfigWithData,
        AnimationEventName
    } from "lottie-web"

    const dispatch = createEventDispatcher()

    export let container: HTMLElement = undefined
    export let animation: AnimationItem = undefined
    export let params:
        | Omit<AnimationConfigWithPath, "container">
        | Omit<AnimationConfigWithData, "container">
    export let state: AnimationState = AnimationState.Loading
    export let speed: number = undefined

    $: if (animation) {
        switch (state) {
            case AnimationState.Playing:
                animation.play()
                break
            case AnimationState.Paused:
                animation.pause()
                break
            case AnimationState.Stopped:
                animation.stop()
                break
        }
    }

    $: if (speed !== undefined && animation) {
        animation.setSpeed(speed)
    }

    function addListener(name: AnimationEventName, callback?: () => void) {
        const listener = (event: any) => {
            callback?.()
            dispatch(name, event)
        }
        animation.addEventListener(name, listener)
        return () => animation.removeEventListener(name, listener)
    }

    onMount(() => {
        animation = lottie.loadAnimation({ ...params, container })
        const removers = [
            addListener("complete"),
            addListener("error", () => {
                state = AnimationState.Error
            })
        ]
        return () => {
            removers.forEach(remove => remove())
            animation.destroy
        }
    })
</script>

<div bind:this={container} {...$$restProps} />

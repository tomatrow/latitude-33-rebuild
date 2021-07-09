<script lang="ts">
    import { IconArrowRight } from "$lib/svgs"

    let clazz = ""
    export { clazz as class }
</script>

<IconArrowRight class="{clazz} arrow-nudge ease-in-out duration-200 transition" />

<style global>
    *:hover > .arrow-nudge {
        transform: translateX(0.5rem);
    }
</style>

<script lang="ts">
    import { parseISO, format } from "date-fns"
    import Link from "./Link.svelte"

    export let dateGmt: string
    export let postFields: any
    let clazz = ""
    export { clazz as class }

    function formatDate(rawDate: string) {
        const date = parseISO(rawDate)
        return format(date, "dd/MM/yyyy")
    }
</script>

<div class="{clazz} space-x-4 font-display flex items-center font-light text-sm">
    {#if postFields.class}
        <Link
            href={postFields.class.href}
            filled
            ease
            border
            fill="white"
            color={postFields.class.postClassFields.color}
            class="py-2 px-3 uppercase font-extralight"
        >
            {postFields.class.postClassFields.singularLabel}
        </Link>
    {/if}
    <h6 class="font-thin">{formatDate(dateGmt)}</h6>
</div>

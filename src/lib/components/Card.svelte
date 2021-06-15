<script lang="ts">
    import Link from "./Link.svelte"
    export let title: string
    export let linkTitle: string
    export let src: string
    export let href: string
    export let hollow = true
    let clazz = ""
    export { clazz as class }
</script>

<div
    style="background-image: url({src})"
    class="{clazz} flex flex-col justify-end bg-center bg-cover bg-no-repeat"
>
    <div
        class="font-display flex items-center justify-between mt-auto px-5 h-16 text-white"
        style="background-color: rgba(0,0,0,0.75)"
    >
        <h3 class="font-black text-lg sm:text-2xl">{title}</h3>
        <Link
            {href}
            {hollow}
            filled={!hollow}
            ease
            class="hover:bg-either-gray-blue text-center font-semibold text-sm">{linkTitle}</Link
        >
    </div>
</div>

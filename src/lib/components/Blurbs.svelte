<script lang="ts">
    import Colors from "$lib/data/colors.json"
    import { cssVars } from "$lib/actions/styles"
    export let blurbs
    let clazz = ""
    export { clazz as class }
</script>

<section
    class="{clazz} grid grid-custom gap-6 max-w-7xl my-12 md:my-24 mx-auto px-5"
    use:cssVars={{
        injectedLinkColor: Colors["disappointment-blue"]
    }}
>
    {#each blurbs as { icon, title, contentHtml }}
        <div>
            <img class="pb-2 w-32 h-32" {...icon} />
            <h6 class="text-either-gray-blue font-display py-2 text-xl">{title}</h6>
            <p class="tracking-wide font-light">{@html contentHtml}</p>
        </div>
    {/each}
</section>

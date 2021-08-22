<script lang="ts">
    import type { PrimaryColor } from "$lib/index.type"
    import { Link, CollectionItem } from "$lib/components"
    export let items = []

    const regularLink = {
        pill: true,
        ease: true,
        color: "white" as PrimaryColor,
        border: true,
        shadow: true,
        class: "flex-shrink-0 py-2 px-3 font-extralight text-sm text-white"
    }
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    <CollectionItem class="sm:row-span-2 h-64 sm:h-auto" {...items[0]}>
        <Link slot="link" let:link {...link} {...regularLink} />
    </CollectionItem>

    <CollectionItem class="h-56" {...items[1]}>
        <Link slot="link" let:link {...link} {...regularLink} />
    </CollectionItem>

    <CollectionItem class="h-56" {...items[2]}>
        <Link slot="link" let:link {...link} {...regularLink} />
    </CollectionItem>

    <CollectionItem class="sm:col-span-2 sm:h-72 h-56" {...items[3]}>
        <Link
            slot="link"
            let:link
            {...link}
            shadow
            filled
            pill
            ease
            color="ripe-blueberry-indentation"
            class="leading-3 font-extralight flex-shrink-0 py-2 px-3 text-white text-center text-xs sm:text-sm"
        />
    </CollectionItem>
</section>

<script lang="ts">
    import type { PrimaryColor } from "$lib/index.type"
    import { Link, CollectionItem } from "$lib/components"
    export let items = []

    const regularLink = {
        pill: true,
        ease: true,
        fill: true,
        color: "either-gray-blue" as PrimaryColor,
        class: "flex-shrink-0 py-2 px-3 border border-white font-semibold text-sm"
    }
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    <CollectionItem
        style="background-position: 50% 5%"
        class="sm:row-span-2 h-64 sm:h-auto"
        {...items[0]}
    >
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
            color="either-gray-blue"
            class="leading-3 flex-shrink-0 py-2 px-3 text-center font-semibold text-xs sm:text-sm"
        />
    </CollectionItem>
</section>

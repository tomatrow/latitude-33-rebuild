<script>
    import { Link } from "$lib/components"
    export let items = []
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    <div
        style="background-image: url({items[0].image.src}); background-position: 50% 5%"
        class="sm:row-span-2 flex flex-col justify-end h-64 sm:h-auto bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{items[0].blurb}</h3>
            <Link
                hollow
                shadow
                pill
                {...items[0].link}
                class="flex-shrink-0 py-2 px-3 font-semibold text-sm"
            />
        </div>
    </div>
    <div
        style="background-image: url({items[1].image.src})"
        class="flex flex-col justify-end h-56 bg-center bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{items[1].blurb}</h3>
            <Link
                hollow
                shadow
                pill
                {...items[1].link}
                class="flex-shrink-0 py-2 px-3 font-semibold text-sm"
            />
        </div>
    </div>
    <div
        style="background-image: url({items[2].image.src})"
        class="flex flex-col justify-end h-56 bg-center bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{items[2].blurb}</h3>
            <Link
                hollow
                shadow
                pill
                {...items[2].link}
                class="flex-shrink-0 py-2 px-3 font-semibold text-sm"
            />
        </div>
    </div>
    <div
        style="background-image: url({items[3].image.src})"
        class="sm:col-span-2 sm:h-72 flex flex-col justify-end h-56 bg-center bg-cover bg-no-repeat"
    >
        <div
            class="font-display flex items-center justify-between px-5 h-16 text-white"
            style="background-color: rgba(0,0,0,0.75)"
        >
            <h3 class="font-black text-lg sm:text-2xl">{items[3].blurb}</h3>
            <Link
                {...items[3].link}
                filled
                shadow
                pill
                color="either-gray-blue"
                class="leading-3 flex-shrink-0 py-2 px-3 text-center font-semibold text-xs sm:text-sm"
            />
        </div>
    </div>
</section>

<script lang="ts">
    import Offering from "./_Offering.svelte"

    const baseSettings = [
        {
            imageUrl: "/images/08-Minimizing-Costs.jpeg",
            imageAlt: "minimizing costs advertisment"
        },
        {
            imageUrl: "/images/Flying-Private.jpeg",
            imageAlt: "two men stepping into jet"
        }
    ]

    export let firstOffering: any
    export let secondOffering: any

    const offerings = [firstOffering, secondOffering].map((offering, index) => ({
        ...offering,
        ...baseSettings[index]
    }))
</script>

<section class="relative px-5 md:px-0">
    <div class="bg-scorpion-tan absolute top-0 bottom-0 left-0 z-0 hidden md:block w-1/2" />
    <div class="grid grid-cols-1 md:grid-cols-2 max-w-7xl md:gap-y-32 z-10 mx-auto md:py-32">
        {#each offerings as offering}
            <Offering {...offering} />
        {/each}
    </div>
</section>

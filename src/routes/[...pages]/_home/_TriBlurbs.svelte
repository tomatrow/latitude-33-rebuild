<script lang="ts">
    const baseSettings = [
        {
            logoUrl: "/icons/blue-plane.png"
        },
        {
            logoUrl: "/icons/blue-time-is-money.png"
        },
        {
            logoUrl: "/icons/blue-handshake.png"
        }
    ]

    export let items = []

    const blurbs = items.map(({ contentHtml, title }, index) => ({
        contentHtml,
        title,
        ...baseSettings[index]
    }))
</script>

<section class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-5 md:px-12 pb-24">
    {#each blurbs as { logoUrl, title, contentHtml }}
        <div>
            <img class="pb-2 w-32 h-32" alt="plane in the sunset" src={logoUrl} />
            <h6 class="text-either-gray-blue font-display py-2 text-xl">{title}</h6>
            <p class="tracking-wide font-light">{@html contentHtml}</p>
        </div>
    {/each}
</section>

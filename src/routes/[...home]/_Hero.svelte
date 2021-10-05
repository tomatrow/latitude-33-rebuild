<script lang="ts">
    import type { AcfLink } from "$lib/index.type"
    import { Banner } from "$lib/components"

    export let brandName: string
    export let title: string
    export let pageLink: AcfLink
</script>

<Banner {title} subheading={brandName} footer={{ link: pageLink }} backgroundImage={{ 
        src: "/videos/hero-poster.webp", 
        alt: "family embarking of plane trip" 
    }}>
    <svelte:fragment slot="sources">
        <source src="/videos/hero-mobile.mp4" media="all and (max-width: 640px)" type="video/mp4" />
        <source src="/videos/hero-desktop.mp4" type="video/mp4" />
    </svelte:fragment>
</Banner>

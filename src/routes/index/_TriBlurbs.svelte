<script>
    const blurbs = [
        {
            logoUrl: "/icons/blue-plane.png",
            title: "Private Jet Charter Services",
            content:
                "Latitude 33 Aviation provides private charter services that maximize flexibility, convenience, privacy, and efficiency. Travel on your own terms and schedule, skip the lines and connecting flights, and have the freedom and privacy to make the most of your time in the sky. Since our founding in 2006, we have been backed by an unparalleled aviation safety record."
        },
        {
            logoUrl: "/icons/blue-time-is-money.png",
            title: "Extensive Aircraft Management Services",
            content:
                "Our round-the-clock management maximizes the efficiency and safety of your plane, as proper management is paramount to private aircraft ownership. The benefits of our aviation management services include maintenance discounts, reduced fleet fuel rates, trip concierge services, aircraft detailing, and other vital support gained by working with our team of industry professionals."
        },
        {
            logoUrl: "/icons/blue-handshake.png",
            title: "Jet Acquisition & Brokerage Services",
            content:
                "Our dedicated aircraft experts provide acquisition and aviation broker services for clients looking to buy a private jet, using a unique turnkey process. From initial inquiry to the final signature, we guide our clients through the entire ownership cycle to save them time and maximize their investment. Our personal approach to aircraft operations appeals to buyers and sellers alike."
        }
    ]
</script>

<section class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-5 md:px-12 pb-24">
    {#each blurbs as { logoUrl, title, content }}
        <div>
            <img class="pb-2 w-32 h-32" alt="plane in the sunset" src={logoUrl} />
            <h6 class="text-either-gray-blue font-display py-2 text-xl">{title}</h6>
            <p class="tracking-wide font-light">{content}</p>
        </div>
    {/each}
</section>

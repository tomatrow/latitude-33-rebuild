<script>
    import Offering from "./_Offering.svelte"

    const offerings = [
        {
            subheading: "Going Somewhere?",
            heading: "Private Jet Charter Flights For Leisure",
            contentHtml: `<p>Fly on a private jet for your next pleasure excursion for comfort and relaxation. When you arrive at the airport, you can bypass the security lines and board your jet, so your getaway can start immediately. During your flight, indulge in our personal services to meet your every need. Your <a href="https://l33jets.com/what-is-it-like-to-fly-private">private jet experience</a> is tailored to you for the ultimate VIP treatment.</p><p>Ski the slopes in <a href="https://l33jets.com/locations/private-jet-to-aspen">Aspen, Colorado</a>, dine on Cajun cuisine in <a href="https://l33jets.com/locations/private-jet-to-new-orleans">New Orleans, Louisiana</a>, or soak up the sun in <a href="https://l33jets.com/locations/private-jet-to-maui">Maui, Hawaii</a> — any place you want to go, Latitude 33 can take you there. We can fly to <a href="https://l33jets.com/locations">many locations around the world</a>, including smaller airports that may be closer to your destination. Our expansive destination possibilities open your travel itinerary and offer the chance to explore the hidden gems in the U.S. and beyond.</p>`,
            linkTitle: "Book Your Trip",
            href: "#",
            imageUrl: "/images/08-Minimizing-Costs.jpeg",
            imageAlt: "minimizing costs advertisment"
        },
        {
            subheading: "Forget Business Class",
            heading: "Flying For Business In Private Jets",
            contentHtml:
                "<p>Private jet charters for business allow you to focus on your work — Latitude 33 will take care of everything else. Unlike commercial flights, private jet charters will give you quiet and privacy. You and your colleagues can prepare for your business meeting or collaborate on a project as we fly you to your destination. Many options in our jet fleet have in-flight productivity options available, such as Wi-Fi.</p>",
            linkTitle: "Reserve Your Charter Flight",
            href: "#",
            imageUrl: "/images/Flying-Private.jpeg",
            imageAlt: "two men stepping into jet"
        }
    ]
</script>

<section class="relative px-5 md:px-0">
    <div class="bg-scorpion-tan absolute top-0 bottom-0 left-0 z-0 hidden md:block w-1/2" />
    <div class="grid grid-cols-1 md:grid-cols-2 max-w-7xl md:gap-y-32 z-10 mx-auto md:py-32">
        {#each offerings as offering}
            <Offering {...offering} />
        {/each}
    </div>
</section>

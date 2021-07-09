<script lang="ts">
    import { Link, Arrow } from "$lib/components"
    import Colors from "$lib/data/colors"
</script>

<section class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-xl py-18 mx-auto px-5">
    <div class="max-w-lg">
        <h1 class="text-3.5xl lg:text-5.5xl font-display my-6 font-bold">
            One-Way Private Jet and Empty Leg Flights
        </h1>

        <div
            class="injected-content text-tinted-rear-window"
            style="--injected-link-color: {Colors['disappointment-blue']}"
        >
            Every so often, one of Latitude 33 Aviation’s private charter jets flies without
            passengers. These are called “empty leg” flights, and although they are not ideal, they
            are sometimes necessary. An empty leg flight may occur because:
            <ul>
                <li>The jet is returning to its home base after a charter leg.</li>
                <li>The aircraft is going back to its base after being serviced elsewhere.</li>
                <li>
                    The jet is flying to another destination to prepare for its next charter flight.
                </li>
                <li>The client will not be flying back to their starting destination.</li>
                <li>
                    It is more cost-effective for the jet and crew to return to the home base than
                    wait for the return leg.
                </li>
            </ul>
            If one of our one-way charter flights out of our<a
                href="https://l33jets.com/locations/san-diego-international-airport-san"
                >San Diego</a
            >
            or
            <a href="https://l33jets.com/los-angeles-international-airport-lax">Los Angeles</a> area
            airports happen to be traveling to your desired destination, it is a
            one-of-a-kind opportunity to score a fantastic deal on a private jet excursion. Latitude
            33 Aviation offers exclusive deals on these empty leg flights, making them a great
            chance to book a one-way private jet experience for a lower cost.
        </div>

        <Link
            class="space-x-4 flex items-center my-4 text-black font-light text-xl"
            arrow="sarcastic-orange"
            href="#deals"
            >View One-Way Flights <Arrow class="text-sarcastic-orange ml-2 w-4 h-4" /></Link
        >
    </div>

    <img class="rounded-xl" alt="entrance" src="/images/entrance.png" />
</section>

<script>
    const first = {
        title: `Premier Aircraft Fleet For Luxury & Style`,
        imageUrl: "/images/Latitude33Aviation2020.jpeg",
        imageAlt: "private jet cabin",
        contentHtml: `
        <p>
            Among charter flight companies in the USA, we have the largest and newest fleet of
            light, midsize, and super-midsize aircraft available. Every jet option is top of the
            line for the elite traveler's comfort. When you fly an aircraft charter flight with
            Latitude 33, you can fly in:
        </p>
        <ul>
            <li><strong>Very light jets (VLJs)</strong></li>
            <li><strong>Small/light jets</strong></li>
            <li><strong>Midsize jets</strong></li>
            <li><strong>Super-midsize jets</strong></li>
            <li><strong>Heavy/large jets</strong></li>
        </ul>
        <p>
            All of our charter aircraft options are lavish and upscale. Our jets are engineered for
            your comfort, with features such as luxury seating, refreshment centers, lavatories, and
            in-flight access to baggage.
        </p>`
    }

    const second = {
        title: `Benefits Of Our Elite Aviation Support`,
        imageUrl: "/images/Flying-Private.jpeg",
        imageAlt: "two men embacking onto a private jet",
        contentHtml: `
<p>
                Latitude 33 Aviation offers the expertise and guidance to make aircraft management,
                charter, and acquisition and sales more personal and enjoyable. Our professionals
                specialize in creating private charter flights that make luxury travel your new
                standard, and they likewise assist with aircraft acquisition, management, and
                brokerage services in order to make aircraft ownership a smooth and stress-free
                process.Some of the benefits of working with us include:
            </p>
            <ul>
                <li>
                    <strong>Comprehensive aviation services:</strong>
                    <div>
                        We are your one-stop resource for a wealth of aircraft services, offering
                        professional guidance on aircraft acquisitions, management, or charters.
                    </div>
                </li>
                <li>
                    <strong>Unmatched customer service:</strong> ‍
                    <div>
                        Our highly qualified and extensively trained crew members provide dedicated
                        customer service to meet your every need.
                    </div>
                </li>
                <li>
                    <strong>Flying with the best:</strong>
                    <div>
                        Have peace of mind knowing you are flying with the industry's most
                        experienced aviation professionals. We are part of the exclusive top 5% of
                        private jet operators that have received the industry’s highest safety
                        rating and have more than 40,000 safely operated flights.
                    </div>
                </li>
                <li>
                    <strong>24/7 fleet management:</strong>
                    <div>
                        Our fleet management is available 24 hours a day, seven days a week, for
                        constant care of your valuable jet.
                    </div>
                </li>
                <li>
                    <strong>Seamless chartering, ownership, and acquisition:</strong>
                    <div>
                        Latitude 33 has the ability to make aircraft charters, ownership, or
                        acquisitions seamless for clients, providing all three services under one
                        roof.
                    </div>
                </li>
                <li>
                    <strong>More destination options:</strong>
                    <div>
                        With access to thousands of additional airports that commercial airlines
                        don’t use, you can truly fly anywhere you want in the world.
                    </div>
                </li>
            </ul>
        `
    }
</script>

<section class="services-section bg-either-gray-blue grid grid-cols-2 gap-y-24 text-white">
    <div class="space-y-3 mx-auto pt-24" style="max-width: 32rem">
        <h4 class="font-display pr-20 font-black text-5xl">{first.title}</h4>
        <div class="injected-content">{@html first.contentHtml}</div>
    </div>
    <img src={first.imageUrl} alt={first.imageAlt} class="rounded-bl-2xl w-full" />

    <div class="space-y-3 mx-auto py-24" style="max-width: 32rem">
        <h4 class="font-display pr-20 font-black text-5xl">{second.title}</h4>
        <div class="injected-content">
            {@html second.contentHtml}
        </div>
    </div>
    <img
        src={second.imageUrl}
        alt={second.imageAlt}
        class="rounded-2xl ml-auto"
        style="max-width: 37.5rem"
    />
</section>

<style global lang="postcss">
    .services-section .injected-content {
        @apply space-y-3;
        p {
            @apply tracking-wide font-light text-xl;
        }
        ul {
            @apply space-y-4 pl-10 list-disc;
        }
        strong {
            @apply font-semibold;
        }
    }
</style>

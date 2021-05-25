<script>
    const heading = "Southern California's Premier Private Jet Charter & Aircraft Manager"
    const subheading = "Why Choose Latitude 33?"
    const imageUrl = "/images/Latitude33Aviation-2020.jpeg"
    const contentHtml =
        "<p>Experience the finest in air travel with Latitude 33 Aviation, Southern California’s premier company for private jet charter, aircraft management, and aircraft sales. We offer the epitome of luxury and lifestyle, with top aircraft and dedicated services for every client.</p><p>Our variety of aircraft services has made Latitude 33 a trusted partner in private aviation. We help our clients with many aspects of flying a private charter, including aircraft charter leases and brokerage services.</p>"
</script>

<section class="grid sm:grid-cols-2">
    <div class="pl-14 pt-24 pb-12">
        <h5 class="font-display text-either-gray-blue font-bold text-xl">{subheading}</h5>
        <h4 class="font-display pt-10 pr-20 pb-6 font-black text-5xl">{heading}</h4>
        <div class="space-y-10 tracking-wider font-light text-xl">
            {@html contentHtml}
        </div>
    </div>
    <img class="rounded-bl-3xl ml-auto" alt="plane" src={imageUrl} style="max-width: 600px" />
</section>

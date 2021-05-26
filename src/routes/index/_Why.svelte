<script>
    const heading = "Southern California's Premier Private Jet Charter & Aircraft Manager"
    const subheading = "Why Choose Latitude 33?"
    const imageUrl = "/images/Latitude33Aviation-2020.jpeg"
    const contentHtml =
        "<p>Experience the finest in air travel with Latitude 33 Aviation, Southern California’s premier company for private jet charter, aircraft management, and aircraft sales. We offer the epitome of luxury and lifestyle, with top aircraft and dedicated services for every client.</p><p>Our variety of aircraft services has made Latitude 33 a trusted partner in private aviation. We help our clients with many aspects of flying a private charter, including aircraft charter leases and brokerage services.</p>"
</script>

<section class="grid grid-cols-1 md:grid-cols-2 p-5 md:p-0">
    <div class="md:pl-14 md:pt-24 pb-6 md:pb-12">
        <h5 class="font-display text-either-gray-blue font-bold text-base sm:text-xl">
            {subheading}
        </h5>
        <h4 class="font-display pt-5 md:pt-10 md:pr-20 pb-6 font-black text-2xl sm:text-5xl">
            {heading}
        </h4>
        <div class="space-y-10 tracking-wider font-light text-xl">
            {@html contentHtml}
        </div>
    </div>
    <img
        class="rounded-3xl rounded-bl-3xl mr-auto md:mr-0 ml-auto w-full md:rounded-tl-none md:rounded-tr-none md:rounded-br-none"
        alt="plane"
        src={imageUrl}
        style="max-width: 600px"
    />
</section>

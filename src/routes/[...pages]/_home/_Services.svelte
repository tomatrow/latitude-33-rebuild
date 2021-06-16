<script lang="ts">
    export let firstService: any
    export let secondService: any

    const first = {
        imageUrl: "/images/Latitude33Aviation2020.jpeg",
        imageAlt: "private jet cabin",
        ...firstService
    }
    const second = {
        imageUrl: "/images/Flying-Private.jpeg",
        imageAlt: "two men embacking onto a private jet",
        ...secondService
    }
</script>

<section
    class="services-section bg-either-gray-blue grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-0 md:gap-y-24 py-12 md:py-0 px-5 md:px-0 text-white"
>
    <div class="space-y-3 mx-auto md:pt-24 md:pr-5 md:pl-6 max-w-lg">
        <h4 class="font-display md:pr-20 font-black text-3xl md:text-5xl">{first.title}</h4>
        <div class="injected-content">{@html first.contenthtml}</div>
    </div>
    <img
        src={first.imageUrl}
        alt={first.imageAlt}
        class="rounded-2xl w-full md:rounded-tl-none md:rounded-tr-none md:rounded-br-none"
    />

    <div class="space-y-3 mx-auto py-6 md:py-24 md:pr-5 md:pl-6 max-w-lg">
        <h4 class="font-display md:pr-20 font-black text-3xl md:text-5xl">{second.title}</h4>
        <div class="injected-content">
            {@html second.contenthtml}
        </div>
    </div>
    <img
        src={second.imageUrl}
        alt={second.imageAlt}
        class="rounded-2xl mx-auto md:mr-0 w-full max-w-xl"
    />
</section>

<style global lang="postcss">
    .services-section .injected-content {
        @apply space-y-3;
        p {
            @apply tracking-wide font-light md:text-xl;
        }
        ul {
            @apply space-y-1 md:space-y-4 pl-10 list-disc;
        }
        strong {
            @apply font-semibold;
        }
    }
</style>

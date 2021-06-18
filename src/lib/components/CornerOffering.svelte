<script lang="ts">
    export let image: any
    export let subheading: string
    export let title: string
    export let contentHtml: string
    export let link: any

    export let full = false
    export let accent = ""
</script>

<div class="my-4 md:my-0 mx-auto md:pt-24 md:pr-5 md:pl-6">
    <div class="space-y-3 mx-auto max-w-lg lg:max-w-xl">
        {#if subheading}
            <h5 class="{accent} font-display font-bold md:text-xl">
                {subheading}
            </h5>
        {/if}
        <h4 class="font-display md:pr-20 font-black text-3xl md:text-5xl">{title}</h4>
        <div class="offering-injected-content">{@html contentHtml}</div>
    </div>
</div>

<div class="relative w-full h-full">
    <img
        {...image}
        class="{full
            ? ''
            : 'absolute max-w-xl top-0 right-0'} rounded-2xl my-4 md:my-0 w-full md:rounded-tl-none md:rounded-tr-none md:rounded-br-none "
    />
</div>

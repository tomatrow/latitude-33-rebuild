<script lang="ts">
    import Form from "./Form.svelte"
    import type { ACfLink } from "$lib/index.type"
    
    let clazz = ""
    export { clazz as class }
    export let airports: any[]
    export let fleet: any[]
    export let successPageLink: AcfLink
</script>

<div
    class="{clazz} flex flex-col md:flex-row gap-8 md:gap-0"
>
    <div class="flex flex-col gap-y-8 relative md:h-auto md:w-[70%] trip-text-card w-full h-full">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img
            class="md:hidden h-full object-top object-cover border-opacity-80 mx-auto w-full border border-white"
            src="/images/Pilatus-PC-12-NG-Exterior-2-1-1024x683.jpeg"
        />
        <div class="font-display flex items-center justify-center  h-full px-8  w-full text-white">
            <div class="flex items-start flex-col my-auto  max-w-md">
                <h2 class="uppercase" style="letter-spacing: 2px;font-size: 1.75rem">Tristique</h2>
                <h1
                    class="whitespace-pre-line font-thin"
                    style="letter-spacing: 0.6px; font-size: 2.375rem; line-height: 2.75rem"
                >
                    Pellentesque Etiam
                </h1>
                Sed posuere consectetur est at lobortis. Cras justo odio, dapibus ac facilisis in, egestas
                eget quam. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
            </div>
        </div>
    </div>

    <Form
        {airports}
        {fleet}
        {successPageLink}
        id="trip-planner-form"
        class="mx-auto my-4 md:my-12 md:w-[30%] flex-shrink-0 md:p-2"
    />
</div>

<style lang="postcss">
    @screen md {
        .trip-text-card {
            background-position: center, center;
            background-repeat: no-repeat, no-repeat;
            background-size: cover, cover;
            background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                url("/images/Pilatus-PC-12-NG-Exterior-2-1-1024x683.jpeg");
        }
    }
</style>

<script lang="ts">
    export let active = false
    let element

    function toggle() {
        active = !active
    }

    // Close Dropdown content after outside click
    function eventEndHandler({ target }) {
        if (element !== target && !element.contains(target)) active = false
    }
</script>

<svelte:body on:pointerup={eventEndHandler} />

<li
    bind:this={element}
    class:vsm-open={active}
    class="vsm-mob-container vsm-mob-show"
    {...$$restProps}
>
    <div class="vsm-mob" on:click={toggle}>
        <slot name="hamburger">
            <div class="vsm-mob__hamburger">
                <div class="vsm-mob-line" />
                <div class="vsm-mob-line" />
                <div class="vsm-mob-line" />
            </div>
        </slot>
    </div>
    <div class="vsm-mob-content">
        {#if active}
            <slot name="close">
                <div class="vsm-mob-close" on:click={toggle} />
            </slot>
            <div transiton:fade class="vsm-mob-content__wrap">
                <slot />
            </div>
        {/if}
    </div>
</li>

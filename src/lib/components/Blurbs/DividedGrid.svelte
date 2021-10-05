<script lang="ts">
    let clazz = ""
    export { clazz as class }
</script>

<div class="grid grid-center-4 sm:divide-x {clazz}">
    <slot />
</div>

<style lang="postcss">
    @screen sm {
        .grid-center-4 > :nth-child(2n + 1) {
            border-left-style: none;
        }
    }
    @screen md {
        .grid-center-4 > * {
            &:nth-child(2n + 1) {
                border-left-style: solid;
            }

            &:nth-child(3n + 1) {
                border-left-style: none;
            }
        }
    }
    @screen lg {
        .grid-center-4 > * {
            &:nth-child(4n) {
                border-left-style: solid;
            }
            &:nth-child(4n + 1) {
                border-left-style: none;
            }
            &:nth-child(4n + 3) {
                border-left-style: solid;
            }
        }
    }
</style>

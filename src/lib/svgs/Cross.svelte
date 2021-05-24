<script>
    export let size = "100%"
    export let strokeWidth = 1
    export { clazz as class }
    let clazz = ""
    if (size !== "100%") {
        size =
            size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em" : parseInt(size) + "px"
    }
</script>

<svg
    width={size}
    height={size}
    stroke="black"
    stroke-width={strokeWidth}
    class={clazz}
    fill="currentColor"
    stroke-miterlimit="10"
    viewBox="-4 0 18 17"
    ><g transform="rotate(45)"
        ><path d="m0 0h7v-7h5v7h7v5h-7v7h-5v-7h-7z" /><path
            d="m1 1h7v-7h3v7h7v3h-7v7h-3v-7h-7z"
        /></g
    ></svg
>

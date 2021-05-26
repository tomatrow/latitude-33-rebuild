<script>
    export let size = "100%"
    export let strokeWidth = 2
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
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
    class={clazz}
    viewBox="0 0 16 16"
>
    <path d="M8.00065 3.33337L12.6673 8.00004L8.00065 12.6667M3.33398 8.00004H12.0007H3.33398Z" />
</svg>

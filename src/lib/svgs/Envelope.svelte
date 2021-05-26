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
    stroke="currentColor"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
    class={clazz}
    viewBox="0 0 24 24"
    fill="none"
    stroke-miterlimit="10"
    xmlns="http://www.w3.org/2000/svg"
>
    <path d="M22.5 4.5H1.5V19.5H22.5V4.5Z" />
    <path d="M6 9L12 14.25L18 9" />
    <path d="M9.45 12L6 15" />
    <path d="M18.0001 15L14.55 12" />
</svg>

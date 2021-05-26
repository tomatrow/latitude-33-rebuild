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
    viewBox="0 0 36 36"
    stroke-miterlimit="10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path d="M3.375 16.875L21.375 30.375L31.5 3.375L3.375 16.875Z" />
    <path d="M31.5 3.375L11.25 23.625V32.625L16.0875 26.4375" />
</svg>

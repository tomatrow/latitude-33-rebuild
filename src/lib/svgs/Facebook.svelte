<script>
    export let size = "100%"
    export let strokeWidth = 2
    export { clazz as class }
    export let fill = "none"
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
    stroke-miterlimit="10"
    {fill}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
>
    <path
        d="M13.789 23.9943V13.0493H17.3269L17.8566 8.78383H13.789V6.06047C13.789 4.82555 14.1192 3.98389 15.8248 3.98389L18 3.98284V0.167893C17.6236 0.1161 16.3325 0 14.8304 0C11.6942 0 9.54712 1.98771 9.54712 5.63825V8.78395H6V13.0494H9.54701V23.9944L13.789 23.9943Z"
    />
</svg>

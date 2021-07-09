<script lang="ts">
    export let length: number

    function isSingular(length: number, chunk: number, index: number) {
        return index === length - 1 && length % chunk === 1
    }

    function createChildClasses(index: number) {
        const two = isSingular(length, 2, index)
        const three = isSingular(length, 3, index)
        return [
            three && "lg:aspect-w-16 lg:aspect-h-9",
            two && "md:aspect-w-16 md:aspect-h-9",
            two && !three && "lg:aspect-none"
        ]
            .filter(Boolean)
            .join(" ")
    }
</script>

<slot containerClasses="grid grid-custom" {createChildClasses} />

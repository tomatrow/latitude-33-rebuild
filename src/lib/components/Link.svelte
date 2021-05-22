<script lang="ts">
    import { line as lineAction } from "../actions/line"
    import type { LineActionConfig } from "../actions/line"
    export let href: string
    export let line: LineActionConfig = false
</script>

<a {href} {...$$restProps} use:lineAction={line}>
    <slot />
</a>

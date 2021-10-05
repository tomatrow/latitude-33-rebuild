<script lang="ts">
    export let quote: string
    export let name: string
    export let position: string
</script>

<div
    class="gap-y-3 p-9 border-pre-coffee-sky-blue flex flex-col justify-between border text-sm"
>
    <div class="leading-6 font-thin">
        {'"'}{quote}{'"'}
    </div>
    <div class="text-tinted-rear-window flex flex-col font-light text-lg">
        <span class="h-8 uppercase">
            {#if name}
                {"—"}
                {name}{#if position},{/if}
            {/if}
        </span>
        <span class="h-8 uppercase">
            {#if position}
                {position}
            {/if}
        </span>
    </div>
</div>

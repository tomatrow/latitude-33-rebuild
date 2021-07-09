<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"

    export enum ContentType {
        BLURBS = "BLURBS",
        OFFERINGS = "OFFERINGS",
        BANNER = "BANNER",
        CHECKERS = "CHECKERS"
    }

    function rowType(fields?: object) {
        return Object.keys(ContentType).find(contentType => fields?.[contentType]) as ContentType
    }

    export const BannerPsudoFragment = graphql`
        title
        contentHtml
        backgroundImage {
            ...MediaItemFragment
        }
        footer {
            blurb
            link {
                ...AcfLinkFragment
            }
        }
    `

    export function createFlexiblePsudoFragment(base: string) {
        return graphql`
            genericPageFields {
                flexibleContent {
                    ... on ${base}_Genericpagefields_FlexibleContent_OfferingList {
                        ${ContentType.OFFERINGS}: fieldGroupName
                        style {
                            backgroundColor
                            hasCorner
                            largeCornerImage
                            layout
                        }
                        offerings {
                            title
                            subheading
                            contentHtml
                            link {
                                ...AcfLinkFragment
                            }
                            image {
                                ...MediaItemFragment
                            }
                        }
                    }
                    ... on ${base}_Genericpagefields_FlexibleContent_BlurbList {
                        ${ContentType.BLURBS}: fieldGroupName
                        blurbs {
                            title
                            contentHtml
                            icon {
                                ...MediaItemFragment
                            }
                        }
                    }
                    ... on ${base}_Genericpagefields_FlexibleContent_Banner {
                        ${ContentType.BANNER}: fieldGroupName
                        ${BannerPsudoFragment}
                    }
                    ... on ${base}_Genericpagefields_FlexibleContent_CheckeredList {
                        ${ContentType.CHECKERS}: fieldGroupName
                        checkers {
                            title
                            contentHtml
                            image {
                                ...MediaItemFragment
                            }
                            icon {
                                ...MediaItemFragment
                            }
                        }
                    }
                }
            }
        `
    }
</script>

<script lang="ts">
    export let content = []
    const rows = content.map(rowType)

    function loadRow(contentType: ContentType) {
        switch (contentType) {
            case ContentType.BLURBS:
                return import("./Blurbs.svelte")
            case ContentType.OFFERINGS:
                return import("./Offerings/index.svelte")
            case ContentType.BANNER:
                return import("./Banner.svelte")
            case ContentType.CHECKERS:
                return import("./Checkers/CheckerList.svelte")
        }
    }

    function spacing(index: number) {
        const isOffering = (value: string) => ContentType.OFFERINGS === value

        const curr = rows[index]

        if (!isOffering(curr)) return {}

        const prev = rows[index - 1]
        const next = rows[index + 1]

        return {
            isFlush: {
                top:
                    (index === 0 && [ContentType.BANNER, ContentType.CHECKERS].includes(curr)) ||
                    // ([curr, prev].every(isOffering)  ||
                    (ContentType.OFFERINGS === curr && content[index].style.hasCorner) ||
                    [ContentType.BANNER, ContentType.CHECKERS].includes(prev),
                bottom:
                    (index === content.length - 1 &&
                        [ContentType.BANNER, ContentType.CHECKERS, ContentType.OFFERINGS].includes(
                            curr
                        )) ||
                    [curr, next].every(isOffering)
            }
        }
    }
</script>

{#each content as fields, index}
    <slot name="before" {index} {rows} />
    {#await loadRow(rows[index]) then module}
        <svelte:component this={module?.default} {...fields} {...spacing(index)} />
    {/await}
    <slot name="after" {index} {rows} />
{/each}

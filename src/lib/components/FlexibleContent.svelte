<script lang="ts" context="module">
    import { graphql } from "$lib/scripts/apollo"

    export enum ContentType {
        BLURBS = "BLURBS",
        OFFERINGS = "OFFERINGS",
        BANNER = "BANNER",
        CHECKERS = "CHECKERS",
        CALL = "CALL"
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
                        anchorId
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
                        anchorId
                        blurbs {
                            title
                            contentHtml
                            link {
                                ...AcfLinkFragment
                            }
                            icon {
                                ...MediaItemFragment
                            }
                        }
                    }
                    ... on ${base}_Genericpagefields_FlexibleContent_Banner {
                        ${ContentType.BANNER}: fieldGroupName
                        anchorId
                        ${BannerPsudoFragment}
                    }
                    ... on ${base}_Genericpagefields_FlexibleContent_CheckeredList {
                        ${ContentType.CHECKERS}: fieldGroupName
                        anchorId
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
                    ...on ${base}_Genericpagefields_FlexibleContent_CallToAction {
                        ${ContentType.CALL}: fieldGroupName
                        anchorId
                        contentHtml
                        link {
                            ...AcfLinkFragment
                        }
                    }
                }
            }
        `
    }
</script>

<script lang="ts">
    import Blurbs from "./Blurbs/index.svelte"
    import Offerings from "./Offerings/index.svelte"
    import Banner from "./Banner.svelte"
    import Checkers from "./Checkers/CheckerList.svelte"
    import CtaBar from "./CtaBar.svelte"

    export let content = []
    export let topFlush: boolean = true
    export let bottomFlush: boolean = true
    const rows = content.map(rowType)

    function spacing(index: number) {
        const isOffering = (value: string) => ContentType.OFFERINGS === value

        const curr = rows[index]

        if (!isOffering(curr)) return {}

        function sameColorOfferings(leftIndex: number, rightIndex: number) {
            if (!(isOffering(rows[leftIndex]) && isOffering(rows[rightIndex]))) return false

            return (
                content[leftIndex].style.backgroundColor ===
                content[rightIndex].style.backgroundColor
            )
        }

        function top() {
            if (content[index].style.hasCorner) return true
            else if (index === 0) return topFlush
            else if (sameColorOfferings(index - 1, index)) return true
            else return true
        }

        function bottom() {
            if (index === rows.length - 1) return bottomFlush
            else if (sameColorOfferings(index, index + 1)) return true
            else return true
        }

        return {
            top: top(),
            bottom: bottom()
        }
    }
</script>

{#each content as fields, index}
    <slot name="before" {index} {rows} />
    {#if rows[index] === ContentType.BLURBS}
        <Blurbs isFlush={spacing(index)} {...fields} />
    {:else if rows[index] === ContentType.OFFERINGS}
        <Offerings isFlush={spacing(index)} {...fields} />
    {:else if rows[index] === ContentType.BANNER}
        <Banner isFlush={spacing(index)} {...fields} />
    {:else if rows[index] === ContentType.CHECKERS}
        <Checkers isFlush={spacing(index)} {...fields} />
    {:else if rows[index] === ContentType.CALL}
        <CtaBar isFlush={spacing(index)} {...fields} />
    {/if}
    <slot name="after" {index} {rows} />
{/each}

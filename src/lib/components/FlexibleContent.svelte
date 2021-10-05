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
    
    type ContentBase = Partial<typeof ContentType> & Record<string, any>
    interface Content extends ContentBase {
        anchorId?: string
    }
</script>

<script lang="ts">
    import Blurbs from "./Blurbs/index.svelte"
    import Offerings from "./Offerings/index.svelte"
    import Banner from "./Banner.svelte"
    import Checkers from "./Checkers/CheckerList.svelte"
    import CtaBar from "./CtaBar.svelte"

    export let content: Content[] = []
    
    $: rows = content.map(rowType)
    
    function mutable(value: any) {
        return JSON.parse(JSON.stringify(value))
    }
    
    function tag(_content: typeof content) {
        return _content.map(fields => ({ fields: mutable(fields), type: rowType(fields) }))
    }
    
    // todo: remove the need for this 
    function deChecker({ anchorId, checkers }: Content) {
        return {
            anchorId,
            offerings: checkers.map(({ title, image, contentHtml }) => ({
                title,
                image,
                contentHtml
            }))
        }
    }
</script>

{#each tag(content) as { fields, type }, index}
    <slot name="before" {index} {rows} />
    {#if type === ContentType.BLURBS}
        <Blurbs {...fields} />
    {:else if type === ContentType.OFFERINGS}
        <Offerings {...fields} />
    {:else if type === ContentType.BANNER}
        <Banner  {...fields} />
    {:else if type === ContentType.CHECKERS}
        <Offerings {...deChecker(fields)} />
    {:else if type === ContentType.CALL}
        <CtaBar {...fields} />
    {/if}
    <slot name="after" {index} {rows} />
{/each}

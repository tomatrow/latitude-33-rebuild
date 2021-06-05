import { graphql } from "$lib/scripts/apollo"

export const AcfLinkFragment = graphql`
    fragment AcfLinkFragment on AcfLink {
        url
        title
        target
    }
`

export const MediaItemFragment = graphql`
    fragment MediaItemFragment on MediaItem {
        id
        altText
        sourceUrl(size: LARGE)
    }
`

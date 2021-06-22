import { graphql } from "$lib/scripts/apollo"

export const AcfLinkFragment = graphql`
    fragment AcfLinkFragment on AcfLink {
        href: url
        title
        target
    }
`

export const MediaItemFragment = graphql`
    fragment MediaItemFragment on MediaItem {
        id
        alt: altText
        src: sourceUrl(size: LARGE)
    }
`

export const OfferingFragment = graphql`
    fragment OfferingFragment on Offering {
        id
        offering {
            contentHtml
            title
            subheading
            link {
                ...AcfLinkFragment
            }
            image {
                ...MediaItemFragment
            }
        }
    }
`

export const BannerFragment = graphql`
    fragment BannerFragment on Banner {
        id
        bannerFields {
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
        }
    }
`

export const TermFragment = graphql`
    fragment TermFragment on TermNode {
        id
        uri
        name
    }
`

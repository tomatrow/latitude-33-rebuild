import { graphql } from "$lib/scripts/apollo"

export const options = `
    acfOptionsTaxonomies {
        postsTaxonomyFields {
            gridHeading
            fieldGroupName
            noPostsMessage
            allPostsLabel
            emailForm {
                heading
                submitLabel
                termsNotice
                subheading
                placeholder
            }
        }
    }
`
export function createTaxonomyPsuedoFragment(term: string) {
    return graphql`
        others: ${term} {
            edges {
                node {
                    id
                    name
                    href: uri 
                }
            }
        }
    `
}

export const PostFragment = graphql`
    fragment PostFragment on Post {
        id
        dateGmt
        title
        href: uri
        postFields {
            class {
                href: uri
                postClassFields {
                    singularLabel
                    color
                    isMedia
                }
            }
            featuredImage {
                ...MediaItemFragment
            }
        }
    }
`

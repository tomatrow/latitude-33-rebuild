import { graphql } from "$lib/scripts/apollo"

export const ContactFragment = graphql`
    fragment ContactFragment on Template_Contact {
        contactPageFields {
            subHeading
            sidebar {
                blurb
                email1
                email2
                phone
                socialMediaHeading
                title
                bookingLink {
                    url
                    title
                }
                address {
                    title
                    content
                }
            }
        }
    }
`

export const GetPageQuery = graphql`
    query GetPage($id: ID!) {
        page(id: $id) {
            id
            slug
            title
            template {
                ...ContactFragment
            }
        }
    }
    ${ContactFragment}
`

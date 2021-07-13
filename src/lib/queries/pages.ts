import { graphql } from "$lib/scripts/apollo"

export const PageFragment = graphql`
    fragment PageFragment on Page {
        id
        slug
        title
        seo {
            title
            fullHead
        }
    }
`

export const ContactPageFragment = graphql`
    fragment ContactPageFragment on Template_Contact {
        contactPageFields {
            subHeading
            form {
                ...ContactFormFragment
            }
        }
    }
`

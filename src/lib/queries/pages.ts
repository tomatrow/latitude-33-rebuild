import { graphql } from "$lib/scripts/apollo"
import { AcfLinkFragment } from "./utility"
import { ContactFormFragment } from "./contactForms"

export const ContactFragment = graphql`
    fragment ContactFragment on Template_Contact {
        contactPageFields {
            subHeading
            form {
                ...ContactFormFragment
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
    ${ContactFormFragment}
    ${AcfLinkFragment}
`

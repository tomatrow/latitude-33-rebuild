import { graphql } from "$lib/scripts/apollo"
import { AcfLinkFragment } from "./utility"
import { ContactFormFragment } from "./contactForms"

export const PageFragment = graphql`
    fragment PageFragment on Page {
        id
        slug
        title
    }
`

export const AboutPageFragment = graphql`
    fragment AboutPageFragment on Template_About {
        aboutPageFields {
            contentHtml
            footer {
                blurb
                link {
                    ...AcfLinkFragment
                }
            }
            vimeo {
                title
                vimeoId
                previewImage {
                    altText
                    mediaItemUrl
                }
            }
        }
    }
`

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
            ...PageFragment
            template {
                ...ContactFragment
                ...AboutPageFragment
            }
        }
    }
    ${PageFragment}
    ${ContactFragment}
    ${ContactFormFragment}
    ${AboutPageFragment}
    ${AcfLinkFragment}
`

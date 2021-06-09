import { graphql } from "$lib/scripts/apollo"
import { AcfLinkFragment } from "./utility"
import { ContactFormFragment } from "./contactForms"

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

export const FleetPageFragment = graphql`
    fragment FleetPageFragment on 
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

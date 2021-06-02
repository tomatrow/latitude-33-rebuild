import { graphql } from "$lib/scripts/apollo"
import { AcfLinkFragment } from "./utility"

export const ContactFormFragment = graphql`
    fragment ContactFormFragment on ContactForm {
        id
        contactFormFields {
            form {
                emailLabel
                nameLabel
                phoneLabel
                serviceChoices
                servicesLabel
            }
            sidebar {
                blurb
                bookingLink {
                    ...AcfLinkFragment
                }
                email1
                email2
                phone
                socialMedia {
                    heading
                    visibility
                }
                title
                address {
                    content
                    title
                }
            }
        }
    }
`

export const FloatingContactFormQuery = graphql`
    query {
        themeGeneralSettings {
            themeSettingsFields {
                floatingContactForm {
                    ...ContactFormFragment
                }
            }
        }
    }
    ${ContactFormFragment}
    ${AcfLinkFragment}
`

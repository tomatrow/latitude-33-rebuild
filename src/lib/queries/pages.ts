import { graphql } from "$lib/scripts/apollo"

export const ContactFragment = graphql`
    fragment ContactFragment on Template_Contact {
        contactPageFields {
            heading
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

export const AllPagesFragment = graphql`
    fragment AllPagesFragment on RootQuery {
        pages(first: 100, where: { status: PUBLISH, hasPassword: false }) {
            edges {
                node {
                    id
                    slug
                    template {
                        templateName
                    }
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
  
  ${ContactFragment}
}



`

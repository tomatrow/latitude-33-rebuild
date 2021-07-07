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

export const TermFragment = graphql`
    fragment TermFragment on TermNode {
        id
        uri
        name
    }
`
export const EmployeeFragment = `
fragment EmployeeFragment on Employee {
  id 
  name: title 
  employeeFields {
    bio
    position
    image: featuredImage {
      ...MediaItemFragment
    }
  }
}
`

export const ResourceFragment = `
    fragment ResourceFragment on ContentNode {
    	__typename
      id 
      uri
    }
`

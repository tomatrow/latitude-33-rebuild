import { graphql } from "$lib/scripts/apollo"
export const AcfLinkFragment = graphql`
    fragment AcfLinkFragment on AcfLink {
        url
        title
        target
    }
`

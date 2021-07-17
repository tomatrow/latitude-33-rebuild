import { graphql } from "$lib/scripts/apollo"

export const ResourcesPsuedoFragment = graphql`
    airports(first: 500) {
        edges {
            node {
                __typename
                id
                uri
            }
        }
    }
    
    fleet(first: 500) {
        edges {
            node {
                __typename
                id
                uri
            }
        }
    }
    
    subfleets(first: 500) {
        edges {
            node {
                __typename
                id
                uri
            }
        }
    }
    
    properties(first: 500) {
        edges {
            node {
                __typename
                id
                uri
            }
        }
    }
    
    posts(first: 500) {
        edges {
            node {
                __typename
                id
                uri
            }
        }
    }
    
    pages(first: 500) {
        edges {
            node {
                __typename
                id
                uri
                template {
                    templateName
                }
            }
        }
    }
`
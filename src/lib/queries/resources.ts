import { graphql } from "$lib/scripts/apollo"

export const ResourcesPsuedoFragment = graphql`
    airports(first: 500) {
        edges {
            node {
                __typename
                id
                href: uri
            }
        }
    }
    
    fleet(first: 500) {
        edges {
            node {
                __typename
                id
                href: uri
            }
        }
    }
    
    subfleets(first: 500) {
        edges {
            node {
                __typename
                id
                href: uri
            }
        }
    }
    
    properties(first: 500) {
        edges {
            node {
                __typename
                id
                href: uri
            }
        }
    }
    
    posts(first: 500) {
        edges {
            node {
                __typename
                id
                href: uri
            }
        }
    }

    categories(first: 500) {
        edges {
            node {
                __typename
                id
                href: uri
            }
        }
    }

    tags(first: 1000) {
        edges {
            node {
                __typename
                id
                href: uri
            }
        }
    }

    classes(first: 500) {
        edges {
            node {
                __typename
                id
                href: uri
            }
        }
    }
    
    pages(first: 500) {
        edges {
            node {
                __typename
                id
                href: uri
                isPostsPage
                template {
                    templateName
                }
            }
        }
    }
`

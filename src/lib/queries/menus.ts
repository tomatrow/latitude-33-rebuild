import { graphql } from "$lib/scripts/apollo"

export const MenuItemFragment = graphql`
    fragment MenuItemFragment on MenuItem {
        id
        label
        url
    }
`

export const MenuFragment = graphql`
    fragment MenuFragment on Menu {
        id
        menuItems {
            edges {
                node {
                    ...MenuItemFragment
                }
            }
        }
    }
`

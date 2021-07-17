import { graphql } from "$lib/scripts/apollo"

export const MenuItemFragment = graphql`
    fragment MenuItemFragment on MenuItem {
        id
        label
        url
        target
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

export const MenusPsuedoFragment = graphql`
    primary: menus(first: 1, where: { location: PRIMARY }) {
        edges {
            node {
                id
                menuItems(where: { parentDatabaseId: 0 }) {
                    edges {
                        node {
                            ...MenuItemFragment
                            childItems {
                                edges {
                                    node {
                                        ...MenuItemFragment
                                        childItems {
                                            edges {
                                                node {
                                                    ...MenuItemFragment
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    secondary: menus(first: 1, where: { location: SECONDARY }) {
        edges {
            node {
                ...MenuFragment
                fields: footerFields {
                    brandname
                    email
                    phone
                    physicaladdress
                }
            }
        }
    }

    secondarySmall: menus(first: 1, where: { location: SECONDARY_SMALL }) {
        edges {
            node {
                ...MenuFragment
            }
        }
    }

    secondaryLarge: menus(first: 1, where: { location: SECONDARY_LARGE }) {
        edges {
            node {
                id
                menuItems {
                    edges {
                        node {
                            ...MenuItemFragment
                            fields: secondaryLargeMenuFields {
                                icon
                            }
                        }
                    }
                }
            }
        }
    }
}
`
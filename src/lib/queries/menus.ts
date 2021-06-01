import { graphql } from "$lib/scripts/apollo"
export default graphql`
    query MyQuery {
        primary: menus(where: { location: PRIMARY }) {
            edges {
                node {
                    ...MenuFragment
                }
            }
        }
        secondary: menus(where: { location: SECONDARY }) {
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
        secondarySmall: menus(where: { location: SECONDARY_SMALL }) {
            edges {
                node {
                    ...MenuFragment
                }
            }
        }
        secondaryLarge: menus(where: { location: SECONDARY_LARGE }) {
            edges {
                node {
                    id
                    menuItems {
                        edges {
                            node {
                                id
                                label
                                url
                                fields: secondaryLargeMenuFields {
                                    icon
                                }
                            }
                        }
                    }
                }
            }
        }
        social: menus(where: { location: SOCIAL }) {
            edges {
                node {
                    id
                    menuItems {
                        edges {
                            node {
                                id
                                label
                                url
                                fields: socialMenuFields {
                                    icon
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    fragment MenuFragment on Menu {
        id
        menuItems {
            edges {
                node {
                    id
                    label
                    url
                }
            }
        }
    }
`

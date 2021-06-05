import { MenuItemFragment, MenuFragment, MenusFragment } from "$lib/queries/menus"
import { AllPagesFragment } from "$lib/queries/pages"
import { query, graphql } from "$lib/scripts/apollo"

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession: import("@sveltejs/kit").GetSession = async () => {
    try {
        const q = graphql`
            query SessionQuery {
                fleet(first: 100, where: { status: PUBLISH, hasPassword: false }) {
                    edges {
                        node {
                            id
                            slug
                        }
                    }
                }
                pages(first: 100, where: { status: PUBLISH, hasPassword: false }) {
                    edges {
                        node {
                            id
                            slug
                            isFrontPage
                            template {
                                templateName
                            }
                        }
                    }
                }
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
                social: menus(where: { location: SOCIAL }) {
                    edges {
                        node {
                            id
                            menuItems {
                                edges {
                                    node {
                                        ...MenuItemFragment
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

            ${MenuItemFragment}
            ${MenuFragment}
        `

        const result = await query(q)

        const { primary, secondary, secondaryLarge, secondarySmall, social, pages, fleet } =
            result.data

        function smoothEdges(resource) {
            return resource.edges.map(edge => edge.node)
        }

        function formatMenu(menu) {
            return smoothEdges(menu).map(({ menuItems, fields }) => ({
                menuItems: menuItems.edges.map(edge => edge.node),
                fields
            }))[0]
        }

        return {
            pages: smoothEdges(pages),
            fleet: smoothEdges(fleet),
            menus: {
                primary: formatMenu(primary),
                secondary: formatMenu(secondary),
                secondaryLarge: formatMenu(secondaryLarge),
                secondarySmall: formatMenu(secondarySmall),
                social: formatMenu(social)
            }
        }
    } catch (error) {
        console.error(error)
    }

    return {}
}

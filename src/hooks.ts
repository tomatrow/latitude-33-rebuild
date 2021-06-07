import { MenuItemFragment, MenuFragment } from "$lib/queries/menus"
import { query, graphql } from "$lib/scripts/apollo"
import type { Handle, GetSession } from "@sveltejs/kit"

async function coreQuery(isHtml: boolean) {
    const q = graphql`
        query SessionQuery($isHtml: Boolean!) {
            themeGeneralSettings @include(if: $isHtml) {
                themeSettingsFields {
                    injection {
                        head
                        footer
                    }
                }
            }

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

    const result = await query(q, { isHtml })

    return result.data
}

export const handle: Handle = async ({ request, resolve }) => {
    const isPage = true // we don't have any endpoints yet

    if (isPage) {
        const coreGraph = await coreQuery(true)
        request.locals.coreGraph = coreGraph
    }

    let { status, headers, body } = await resolve(request)

    if (headers["content-type"] === "text/html" && typeof body === "string") {
        const { head, footer } =
            request.locals.coreGraph.themeGeneralSettings.themeSettingsFields.injection
        body = (body as string)
            .replace("%wordpress.head%", head ?? "")
            .replace("%wordpress.footer%", footer ?? "")
    }

    return {
        status,
        headers,
        body
    }
}

export const getSession: GetSession = async ({ locals }) => {
    const { coreGraph } = locals
    const { primary, secondary, secondaryLarge, secondarySmall, social, pages, fleet } = coreGraph

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
}

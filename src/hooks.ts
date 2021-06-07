import { MenuItemFragment, MenuFragment } from "$lib/queries/menus"
import { query, graphql } from "$lib/scripts/apollo"
import type { Handle, GetSession, ServerRequest, ServerResponse } from "@sveltejs/kit"
import UrlPattern from "url-pattern"

async function coreQueryMiddleware(request: ServerRequest) {
    const q = graphql`
        query SessionQuery {
            themeGeneralSettings {
                themeSettingsFields {
                    injection {
                        head
                        footer
                    }
                    redirections {
                        origin
                        status
                        target
                        matchType
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

    const result = await query(q)

    request.locals.coreGraph = result.data
}

function redirectionMiddleware(request: ServerRequest) {
    const { coreGraph } = request.locals
    if (!coreGraph) return
    const redirection = coreGraph.themeGeneralSettings.themeSettingsFields.redirections.find(
        ({ origin, matchType }) => {
            try {
                let pattern: UrlPattern
                if (matchType === "pattern") pattern = new UrlPattern(origin)
                else if (matchType === "regex") pattern = new UrlPattern(new RegExp(origin))
                else throw new Error("Unknown redirection match type")
                return pattern.match(request.path)
            } catch (error) {
                console.error(error)
                return false
            }
        }
    )
    if (redirection)
        return {
            status: redirection.status,
            headers: {
                Location: redirection.target // todo replacement
            }
        }
}

function injectionMiddleware(request: ServerRequest, response: ServerResponse) {
    if (!(response.headers["content-type"] === "text/html" && typeof response.body === "string"))
        return
    const { head, footer } =
        request.locals.coreGraph.themeGeneralSettings.themeSettingsFields.injection
    response.body = (response.body as string)
        .replace("%wordpress.head%", head ?? "")
        .replace("%wordpress.footer%", footer ?? "")
}

export const handle: Handle = async ({ request, resolve }) => {
    await coreQueryMiddleware(request)

    const redirection = redirectionMiddleware(request)
    if (redirection) return redirection

    let response = await resolve(request)

    injectionMiddleware(request, response)

    return response
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

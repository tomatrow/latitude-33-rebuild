import type { Handle, GetSession, ServerRequest, ServerResponse } from "@sveltejs/kit"
import UrlPattern from "url-pattern"
import { MenuItemFragment, MenuFragment } from "$lib/queries/menus"
// import { ResourceFragment } from "$lib/queries/utility"
import { smoothEdges } from "$lib/scripts/utility"
import { normalizePath } from "$lib/scripts/router"
import { query, graphql } from "$lib/scripts/apollo"

async function coreQueryMiddleware(request: ServerRequest) {
    const q = graphql`
        query SessionQuery {
            seo {
                social {
                    facebook {
                        url
                    }
                    instagram {
                        url
                    }
                    linkedIn {
                        url
                    }
                    twitter {
                        username
                    }
                    youTube {
                        url
                    }
                }
            }

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

            posts(first: 500) {
                edges {
                    node {
                        __typename
                        id
                        uri
                    }
                }
            }

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
    console.log("A request for " + request.path)
    await coreQueryMiddleware(request)

    const redirection = redirectionMiddleware(request)
    if (redirection) return redirection

    const response = await resolve(request)

    injectionMiddleware(request, response)

    return response
}

export const getSession: GetSession = async ({ locals }) => {
    const { coreGraph } = locals
    const {
        primary,
        secondary,
        secondaryLarge,
        secondarySmall,
        properties,
        pages,
        posts,
        fleet,
        seo,
        airports,
        subfleets
    } = coreGraph

    function formatMenu(menu) {
        const submap = ({ childItems, ...rest }) => ({
            ...rest,
            childItems: childItems ? smoothEdges(childItems).map(submap) : []
        })
        return smoothEdges(menu).map(({ menuItems, fields }) => ({
            menuItems: smoothEdges(menuItems).map(submap),
            fields
        }))[0]
    }

    const social = Object.entries(seo.social)
        .filter(([key]) => key !== "__typename")
        .map(([service, values]: [string, any]) => {
            const computed =
                service === "twitter" && values.username
                    ? { url: `https://twitter.com/${values.username}` }
                    : {}
            return {
                service,
                ...values,
                ...computed
            }
        })

    return {
        resources: Object.fromEntries(
            [
                ...smoothEdges(posts),
                ...smoothEdges(pages),
                ...smoothEdges(fleet),
                ...smoothEdges(subfleets),
                ...smoothEdges(properties),
                ...smoothEdges(airports)
            ].map(
                // @ts-ignore
                resource => [normalizePath(resource.uri), resource]
            )
        ),
        social,
        menus: {
            primary: formatMenu(primary),
            secondary: formatMenu(secondary),
            secondaryLarge: formatMenu(secondaryLarge),
            secondarySmall: formatMenu(secondarySmall)
        }
    }
}

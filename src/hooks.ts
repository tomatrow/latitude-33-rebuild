import type { Handle, GetSession, ServerRequest, ServerResponse } from "@sveltejs/kit"
import UrlPattern from "url-pattern"
import { ResourcesPsuedoFragment } from "$lib/queries/resources"
import { MenuItemFragment, MenuFragment, MenusPsuedoFragment } from "$lib/queries/menus"
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

            ${ResourcesPsuedoFragment}
            ${MenusPsuedoFragment}

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

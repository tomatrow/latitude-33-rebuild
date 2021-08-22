import type { Handle, GetSession, Request, Response, HandleError } from "@sveltejs/kit"
import UrlPattern from "url-pattern"
import { ResourcesPsuedoFragment } from "$lib/queries/resources"
import { MenuItemFragment, MenuFragment, MenusPsuedoFragment } from "$lib/queries/menus"
import { smoothEdges } from "$lib/scripts/utility"
import { normalizePath } from "$lib/scripts/router"
import { query, graphql } from "$lib/scripts/apollo"

async function coreQueryMiddleware(request: Request) {
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
        }

        ${MenuItemFragment}
        ${MenuFragment}
    `
    try {
        const result = await query(q)

        request.locals.coreGraph = result.data
    } catch (err) {
        console.error(JSON.stringify(err))
    }
}

function redirectionMiddleware({ locals: { coreGraph }, path }: Request) {
    if (!coreGraph) return

    const redirection = coreGraph.themeGeneralSettings.themeSettingsFields.redirections.find(
        ({ origin, matchType }) => {
            try {
                let pattern: UrlPattern
                if (matchType === "pattern") pattern = new UrlPattern(origin)
                else if (matchType === "regex") pattern = new UrlPattern(new RegExp(origin))
                else throw new Error("Unknown redirection match type")
                return pattern.match(path)
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

function injectionMiddleware(request: Request, response: Response) {
    if (!(response.headers["content-type"] === "text/html" && typeof response.body === "string"))
        return
    const { head, footer } =
        request.locals.coreGraph.themeGeneralSettings.themeSettingsFields.injection
    response.body = (response.body as string)
        .replace("%wordpress.head%", head ?? "")
        .replace("%wordpress.footer%", footer ?? "")
}

export function urlFromLocation(request: Request) {
    const url = new URL(request.host)
    url.pathname = request.path
    url.search = request.query.toString()
    return url
}

function hostProxyMiddleware(request: Request) {
    if (request.path.startsWith("/wp-json")) {
        const url = urlFromLocation(request)
        url.host = process.env["BACKEND_HOST"]

        return {
            status: 302,
            headers: {
                location: url.toString()
            }
        }
    }
}

export const handle: Handle = async ({ request, resolve }) => {
    console.log("A request for " + request.path)

    const proxy = hostProxyMiddleware(request)
    if (proxy) {
        console.log({ proxy })
        return proxy
    }

    await coreQueryMiddleware(request)

    const redirection = redirectionMiddleware(request)
    if (redirection) return redirection

    const response = await resolve(request)

    injectionMiddleware(request, response)

    return response
}

export const handleError: HandleError = ({ error }) => {
    console.error(error.stack)
}

export const getSession: GetSession = async ({ locals }) => {
    const { coreGraph } = locals
    const {
        primary,
        secondary,
        secondaryLarge,
        secondarySmall,
        seo,
        airports,
        fleet,
        subfleets,
        properties,
        posts,
        categories,
        tags,
        classes,
        pages,
        destinations
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
                posts,
                pages,
                fleet,
                subfleets,
                properties,
                airports,
                classes,
                categories,
                tags,
                destinations
            ]
                .flatMap(smoothEdges)
                .map(
                    // @ts-ignore
                    resource => [normalizePath(resource.href), resource]
                )
        ),
        // @ts-expect-error
        postsPage: smoothEdges(pages).find(page => page.isPostsPage),
        social,
        menus: {
            primary: formatMenu(primary),
            secondary: formatMenu(secondary),
            secondaryLarge: formatMenu(secondaryLarge),
            secondarySmall: formatMenu(secondarySmall)
        }
    }
}

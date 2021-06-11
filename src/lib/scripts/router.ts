import type { Load } from "@sveltejs/kit"
import { query } from "$lib/scripts/apollo"

export const normalizePath = (path: string) => (path.endsWith("/") ? path.slice(0, -1) : path)

export const matchPath =
    (incoming: string) =>
    ({ uri }) =>
        normalizePath(uri) === normalizePath(incoming)

export function loadPage(templateName: string, graphqlQuery: string): Load {
    return async ({ page, session }) => {
        console.log("matching", templateName)
        const item = session.pages.find(
            item => item?.template?.templateName === templateName && matchPath(page.path)(item)
        )
        console.log({ session })
        if (!item) {
            console.log("no match", templateName, page.path)
            return
        } else {
            console.log({ item }, templateName, page.path)
            const { id } = item

            const { data } = await query(graphqlQuery, {
                id,
                isPreview: page.query.has("preview"),
                nonce: page.query.get("nonce")
            })

            return {
                status: 200,
                props: data
            }
        }
    }
}

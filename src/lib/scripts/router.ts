import type { Load, LoadInput } from "@sveltejs/kit"
import { query } from "$lib/scripts/apollo"

export const normalizePath = (path: string) =>
    path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path

export interface Resource {
    __typename: string
    id: string
    uri: string
}

export enum ResourceTypes {
    Tag = "Tag",
    Class = "Class",
    Category = "Category",
    Page = "Page"
}

type AnyResource = Resource & Record<string, any>

export function matchResource<R extends Resource = AnyResource>(
    { session, page }: LoadInput,
    filter: (resource: R) => boolean = () => true
) {
    const resource = session.resources[normalizePath(page.path)]
    return resource && filter(resource) ? resource : null
}

export function previewVariables({ page }: LoadInput) {
    return {
        isPreview: page.query.has("preview"),
        nonce: page.query.get("nonce")
    }
}

export function loadResource<R extends Resource = AnyResource>(
    graphqlQueryOrFunction: string | ((resource: R, input: LoadInput) => string),
    filter?: (resource: R) => boolean,
    getVariables: (resource: R, input: LoadInput) => object = ({ id }) => ({ id })
): Load {
    return async input => {
        const resource = matchResource(input, filter)

        if (!resource) return
        try {
            const graphqlQuery =
                typeof graphqlQueryOrFunction === "string"
                    ? graphqlQueryOrFunction
                    : graphqlQueryOrFunction(resource, input)
            const { data } = await query(graphqlQuery, getVariables(resource, input))

            return {
                status: 200,
                props: data
            }
        } catch (error) {
            console.error(JSON.stringify(error))
            return {
                status: 500,
                error
            }
        }
    }
}

export function loadPage(templateName: string, graphqlQuery: string) {
    return loadResource(
        graphqlQuery,
        resource =>
            resource.__typename === ResourceTypes.Page &&
            resource.template?.templateName === templateName,
        ({ id }, input) => ({ id, ...previewVariables(input) })
    )
}

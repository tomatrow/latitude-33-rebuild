import type { Load } from "@sveltejs/kit"

export function stripPhone(phone: string) {
    return phone.match(/\d/g)?.join("") ?? ""
}

export function splitChoices(choices: string) {
    return choices.split("\n") ?? []
}

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function createLoad(findResource: any, fetchResource: any): Load {
    return async input => {
        const info = findResource(input)
        if (!info)
            return {
                status: 404,
                error: "Resource not found"
            }

        const variables = {
            id: info.id,
            isPreview: input.page.query.has("preview"),
            nonce: input.page.query.get("nonce")
        }

        return {
            status: 200,
            props: {
                info,
                data: variables.isPreview ? null : await fetchResource(info, variables),
                variables
            }
        }
    }
}

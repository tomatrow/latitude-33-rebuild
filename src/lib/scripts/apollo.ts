import { ApolloClient, gql, HttpLink } from "@apollo/client/core/core.cjs.js"
import { setContext } from "@apollo/client/link/context/context.cjs.js"
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache/cache.cjs.js"

class Client {
    public client: ApolloClient<NormalizedCacheObject>
    private static _instance: Client
    constructor() {
        if (Client._instance) return Client._instance

        Client._instance = this

        this.client = this.setupClient()
    }

    setupClient(): ApolloClient {
        const authLink = setContext(({ variables }, { headers }) => {
            const authHeaders = {}
            if (variables?.nonce) {
                authHeaders["X-WP-Nonce"] = variables.nonce
                delete variables.nonce
            }
            return {
                headers: {
                    ...headers,
                    ...authHeaders
                }
            }
        })
        const httpLink = new HttpLink({
            uri: import.meta.env.VITE_GRAPHQL_ENDPOINT as string,
            credentials: "include",
            fetch
        })
        return new ApolloClient({
            link: authLink.concat(httpLink),
            credentials: "include",
            cache: new InMemoryCache()
        })
    }
}

const client: ApolloClient = new Client().client

export function query(query, variables = {}) {
    return apolloQuery("query", "query", query, variables)
}

export function mutation(query, variables = {}) {
    return apolloQuery("mutate", "mutation", query, variables)
}

function apolloQuery(method, key, query, variables) {
    return client[method]({
        [key]: gql`
            ${query}
        `,
        variables
    }).then(json => {
        if (json.errors) throw new Error(json.errors[0].message)
        return json
    })
}

// just to get prettier to autocorrect syntax
export function graphql(strings: TemplateStringsArray, ...keys: string[]) {
    return strings.reduce((acc, next, index) => {
        return acc + next + (keys[index] ?? "")
    }, "")
}

export default client

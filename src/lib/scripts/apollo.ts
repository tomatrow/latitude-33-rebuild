import { dev } from "$app/env"

// dev start
// import { ApolloClient, gql, HttpLink } from "@apollo/client/core/core.cjs.js"
// import { setContext } from "@apollo/client/link/context/context.cjs.js"
// import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache/cache.cjs.js"
// if (!dev) throw new Error("Swap exports")
//dev end

// production start
import Core from "@apollo/client/core/core.cjs.js"
import Context from "@apollo/client/link/context/context.cjs.js"
import Cache from "@apollo/client/cache/cache.cjs.js"
const { ApolloClient, gql, HttpLink } = Core
const { setContext } = Context
const { InMemoryCache, NormalizedCacheObject } = Cache
if (dev) throw new Error("Swap exports")
// production end

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
            cache: new InMemoryCache({
                typePolicies: {
                    Airport_Locationpostfields: {
                        merge: false
                    },
                    Airport_Airportfields: {
                        merge: false
                    },
                    Template_Deals: {
                        merge: false
                    }
                }
            })
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

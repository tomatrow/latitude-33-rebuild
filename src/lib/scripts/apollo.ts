import { ApolloClient, gql, HttpLink } from "@apollo/client/core"
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache"

class Client {
    public client: ApolloClient<NormalizedCacheObject>
    private static _instance: Client
    constructor() {
        if (Client._instance) return Client._instance

        Client._instance = this

        this.client = this.setupClient()
    }

    setupClient() {
        const link = new HttpLink({
            uri: import.meta.env.VITE_GRAPHQL_ENDPOINT as string,
            fetch
        })

        const client = new ApolloClient({
            link,
            cache: new InMemoryCache()
        })
        return client
    }
}

const client = new Client().client

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
export function graphql(strings, ...keys) {
    return strings.reduce((acc, next, index) => {
        return acc + next + (keys[index] ?? "")
    }, "")
}

export default client

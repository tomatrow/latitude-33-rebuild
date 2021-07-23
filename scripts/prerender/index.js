import fs from "fs"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import { fetch } from "@sveltejs/kit/install-fetch"

console.log({ r: import.meta.url })

const __dirname = dirname(fileURLToPath(import.meta.url))

export const PAGES_PATH = "./pages.json"

export function read(filename) {
    return fs.readFileSync(resolve(__dirname, filename), "utf8")
}

export function write(filename, text) {
    fs.writeFileSync(resolve(__dirname, filename), text)
}

export function getResources() {
    const rawPages = read(PAGES_PATH)
    return JSON.parse(rawPages)
}

export async function fetchResources() {
    const { VITE_GRAPHQL_ENDPOINT } = process.env

    if (!VITE_GRAPHQL_ENDPOINT) throw new Error("VITE_GRAPHQL_ENDPOINT is not set")

    console.log(`fetching predender list from ${VITE_GRAPHQL_ENDPOINT}`)

    const response = await fetch(VITE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: read("./resources.gql"),
            variables: {}
        })
    })

    return response.json()
}

import fs from "fs"
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { fetch } from "@sveltejs/kit/install-fetch"

const __dirname = dirname(fileURLToPath(import.meta.url));

export const PAGES_PATH = "./pages.json"

export function read(filename) {
    return fs.readFileSync(resolve(__dirname, filename), 'utf8')
}

export function write(filename, text) {
    fs.writeFileSync(resolve(__dirname, filename), text)
}

export function getResources() {
    const rawPages = read(PAGES_PATH)
    return JSON.parse(rawPages)
}

export async function fetchResources() {    
    const response = await fetch(process.env.VITE_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: read("./resources.gql"),
            variables: {}
        })
    })
   
   return response.json()
}


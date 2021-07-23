import { fetchResources, PAGES_PATH, write } from "./index.js"

async function run() {
    const { data } = await fetchResources()
    const pages = Object.values(data)
        .flatMap(group => group.edges)
        .map(edge => edge.node.uri)
    console.log("fetched prerender urls")
    console.log(pages)
    write(PAGES_PATH, JSON.stringify(pages))
}

run()

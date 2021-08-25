import preprocess from "svelte-preprocess"
import adapter from "@sveltejs/adapter-static"
import { getResources } from "./scripts/prerender/index.js"
// import format from "@tomatrow/zen-format"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        preprocess({
            postcss: true
        })
    ],

    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        target: "#svelte",
        adapter: adapter({
            pages: process.env.BUILD_FOLDER,
            assets: process.env.BUILD_FOLDER
        }),
        prerender: {
            enabled: true,
            onError: "continue",
            pages: ["/404", ...getResources()],
            crawl: false
        },
        vite() {
            /** @type {import('vite').UserConfig} */
            const result = {}

            if (process.env.NODE_ENV === "development") {
                // @ts-ignore
                // const { default: format } = await import("@tomatrow/zen-format")
                // result.plugins = [format({ load: true })]
            }

            return result
        }
    }
}

export default config

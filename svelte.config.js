import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static';
import { getResources } from "./scripts/prerender/index.js"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
        adapter: adapter({
            pages: process.env.BUILD_FOLDER,
            assets: process.env.BUILD_FOLDER
        }),
        prerender: {
            enabled: true,
            force: true,
            pages: getResources()
        },
        async vite() {
            if (process.env.NODE_ENV !== "development") return {}

            const { default: format } = await import("@tomatrow/zen-format")

            return {
                plugins: [
                    format({ load: true })
                ]
            }
        }
	}
};

export default config;
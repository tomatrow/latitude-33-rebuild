import format from "@tomatrow/zen-format"
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static';
import pages from "./prerender.js"
// import format from "@tomatrow/zen-format"

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
            pages: ".vercel_build_output",
            assets: ".vercel_build_output"
        }),
        prerender: {
            enabled: true,
            force: true,
            pages: ["*", ...pages]
        },
        vite: {
            plugins: [
                // format({ load: true })
            ]
        }
	}
};

export default config;
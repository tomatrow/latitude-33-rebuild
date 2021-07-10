// import format from "@tomatrow/zen-format"
import preprocess from 'svelte-preprocess'
// import vercel from "@sveltejs/adapter-vercel"
import adapter from '@sveltejs/adapter-static';
import pages from "./prerender.js"

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
        // adapter: vercel(),
        prerender: {
            enabled: true,
            force: true,
            pages: ["*", ...pages]
        }
        // vite: {
        //     plugins: [
        //         format({ load: true })
        //     ]
        // }
	}
};

export default config;
// Workaround until SvelteKit uses Vite 2.3.8 (and it's confirmed to fix the Tailwind JIT problem)
// const mode = process.env.NODE_ENV;
// const dev = mode === "development";
// process.env.TAILWIND_MODE = dev ? "watch" : "build";
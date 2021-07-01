import format from "@tomatrow/zen-format"
import preprocess from 'svelte-preprocess'
import netlify from "@sveltejs/adapter-netlify"
import { writeFileSync } from 'fs';

/** @type {import('@sveltejs/kit').Adapter} */
const adapter = {
    name: "faux-netlify",
    async adapt(input) {
        await netlify().adapt(input)
//         const pkg = JSON.stringify({ 
//             type: 'commonjs',
//             scripts: {
//                 build: "npm install"
//             },
//             dependencies: {},
//             devDependencies: {}
//         })
// 
// 		writeFileSync('functions/render/package.json', pkg);
        // writeFileSync('functions/package.json', pkg);
    }
}


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
        adapter: netlify(),
        vite: {
            plugins: [
                format({ load: true })
            ]
        }
	}
};

export default config;

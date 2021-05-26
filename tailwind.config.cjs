const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

module.exports = {
	mode: "aot",
	purge: {
		content: [
			"./src/**/*.{html,js,svelte,ts}",
		],
		options: {
			defaultExtractor: (content) => [
				// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
			],
		},
		safelist: [/^svelte-[\d\w]+$/],
	},
	theme: {
        fontFamily: {
            display: ['Public Sans', "sans-serif"],
            sans: ["Roboto", "sans-serif"]
        },
		extend: {
            colors: {
                "a-taste-of-blueberries": "#24369A",
                "either-gray-blue": "#537FA9",
                "scorpion-tan": "#D6CCBB",
                "pre-coffee-sky-blue": "#9CBADC",
                "calm-summer-horizon":"#89D4E5",
                "dark-charcoal": "#333333"
            },
            boxShadow: { 
                "inner-10xl": "inset 0 200px 200px 200px rgba(0, 0, 0, 0.1)"
            }
        },
	},
	variants: {
		extend: {},
	},
	plugins: [
        require('@tailwindcss/aspect-ratio')
    ],
};

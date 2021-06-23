const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

module.exports = {
	mode: "aot",
    important: '#svelte',
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
		safelist: [
            /^svelte-[\d\w]+$/,
            "bg-a-taste-of-blueberries",
            "bg-either-gray-blue",
            "bg-scorpion-tan",
            "bg-pre-coffee-sky-blue",
            "bg-calm-summer-horizon",
            "bg-dark-charcoal",
            "bg-disappointment-blue",
            "bg-tinted-rear-window",
            "bg-shark",
            "bg-sarcastic-orange",
            "bg-the-girl-is-looking-at-the-sky",
            "text-a-taste-of-blueberries",
            "text-either-gray-blue",
            "text-scorpion-tan",
            "text-pre-coffee-sky-blue",
            "text-calm-summer-horizon",
            "text-dark-charcoal",
            "text-disappointment-blue",
            "text-tinted-rear-window",
            "text-shark",
            "text-sarcastic-orange",
            "text-the-girl-is-looking-at-the-sky",
            "border-a-taste-of-blueberries",
            "border-either-gray-blue",
            "border-scorpion-tan",
            "border-pre-coffee-sky-blue",
            "border-calm-summer-horizon",
            "border-dark-charcoal",
            "border-disappointment-blue",
            "border-tinted-rear-window",
            "border-shark",
            "border-sarcastic-orange",
            "border-the-girl-is-looking-at-the-sky",
        ],
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
                "dark-charcoal": "#333333",
                "disappointment-blue": "#658396",
                "tinted-rear-window": "#2C2D36",
                "shark": "#ABABAB",
                "sarcastic-orange": "#C77853",
                "the-girl-is-looking-at-the-sky": "#B7DFF6"
            },
            boxShadow: { 
                "inner-10xl": "inset 0 200px 200px 200px rgba(0, 0, 0, 0.1)"
            },
            fontSize: {
                "3.5xl": "2rem",
                "4.5xl": "2.5rem",
                "5.5xl": "3.375rem"
            },
            letterSpacing: {
                "px": "0.0625"
            },
            spacing: {
                "18": "4.5rem"
            }  ,
            lineHeight: {
                '12': '3rem',
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

const fs = require('fs')

const colors = JSON.parse(fs.readFileSync("./src/lib/data/colors.json"))

function prefixColors(prefix) {
    return Object.keys(colors).map(color => `${prefix}${color}`)
}

const safelist = [
    ...prefixColors("hover:bg-"),
    ...prefixColors("hover:text-"),
    ...prefixColors("bg-"),
    ...prefixColors("sm:bg-"),
    ...prefixColors("md:bg-"),
    ...prefixColors("lg:bg-"),
    ...prefixColors("text-"),
    ...prefixColors("sm:text-"),
    ...prefixColors("md:text-"),
    ...prefixColors("lg:text-"),
    ...prefixColors("border-")
]

module.exports = {
    mode: "jit",
    important: "#svelte",
    purge: {
        content: ["./src/**/*.{html,js,svelte,ts}"],
        safelist
    },
    theme: {
        fontFamily: {
            display: ["Public Sans", "sans-serif"],
            sans: ["Roboto", "sans-serif"]
        },
        extend: {
            colors,
            boxShadow: {
                "inner-10xl": "inset 0 200px 200px 200px rgba(0, 0, 0, 0.1)",
                "card": "2px 2px 5px 0 rgba(240, 240, 237, 0.47)"
            },
            fontSize: {
                base: ['1rem', '1.5rem'],
                lg: ['1.25rem', '1.875rem'], 
                "3.5xl": ["2rem", "2.375rem"], 
                "4.5xl": "2.5rem",
                "5.5xl": ["3.375rem", '3.75rem'],
                // only for titles so far 
                large: ["2.375rem", "2.75rem"],
                normal: ["2rem", "2.25rem"],
                small: ["1.5rem", "2rem"],
                tiny: ["1.125rem", "1.75rem"]
            },
            letterSpacing: {
                "px": "0.0625rem",
                "2px": "0.125rem"
            },
            spacing: {
                "18": "4.5rem",
                "4.5": "1.125rem"
            },
            lineHeight: {
                "12": "3rem"
            },
            rotate: {
                "315": "315deg"
            },
            borderRadius: {
                '2.5xl' : "1.25rem"
            },
            screens: {
                "full-nav": "1100px"
            }
        }
    },
    plugins: [require("@tailwindcss/aspect-ratio"), require('tailwindcss-scroll-snap')]
}

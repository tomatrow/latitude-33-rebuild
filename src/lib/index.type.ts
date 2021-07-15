import type Colors from "$lib/data/colors.json"

export type PrimaryColor = keyof typeof Colors

export type ColorScheme = Record<string, PrimaryColor>

export interface AcfImage { 
    src: string
    alt: string 
}

export interface AcfLink {
    href: string 
    title: string 
    target: string
}
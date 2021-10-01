import type Colors from "$lib/data/colors.json"

export type PrimaryColor = keyof typeof Colors

export type ColorScheme = Record<string, PrimaryColor>

export interface ResponsiveScheme<Scheme extends ColorScheme = ColorScheme> {
    mobile: Scheme
    desktop?: Scheme
}

export interface AcfImage {
    src: string
    alt: string
}

export interface AcfLink {
    href: string
    title: string
    target?: string
}

export enum VideoService {
    youtube = "youtube",
    vimeo = "vimeo"
}

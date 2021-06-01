import Linkedin from "../svgs/Linkedin.svelte"
import Facebook from "../svgs/Facebook.svelte"
import Twitter from "../svgs/Twitter.svelte"
import Instagram from "../svgs/Instagram.svelte"
import Youtube from "../svgs/Youtube.svelte"

export const icons = {
    facebook: Facebook,
    linkedin: Linkedin,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube
}

export const social = [
    {
        href: "https://www.facebook.com/l33jets",
        name: "facebook",
        icon: Facebook
    },
    {
        href: "https://www.linkedin.com/company/latitude-33-aviation",
        name: "linkedin",
        icon: Linkedin
    },
    {
        href: "https://instagram.com/l33jets/",
        name: "instagram",
        icon: Instagram
    },
    {
        href: "https://twitter.com/L33Jets",
        name: "twitter",
        icon: Twitter
    },
    {
        href: "https://www.youtube.com/channel/UC8-H2tz_KZV6dEUj0B4BflQ",
        name: "youtube",
        icon: Youtube
    }
]

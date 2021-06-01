import menus from "$lib/queries/menus"
import { query } from "$lib/scripts/apollo"

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession: import("@sveltejs/kit").GetSession = async () => {
    try {
        const result = await query(menus)
        const { primary, secondary, secondaryLarge, secondarySmall, social } = result.data

        function form(menu) {
            return menu.edges
                .map(edge => edge.node)
                .map(({ menuItems, fields }) => ({
                    menuItems: menuItems.edges.map(edge => edge.node),
                    fields
                }))[0]
        }

        return {
            menus: {
                primary: form(primary),
                secondary: form(secondary),
                secondaryLarge: form(secondaryLarge),
                secondarySmall: form(secondarySmall),
                social: form(social)
            }
        }
    } catch (error) {
        console.error(error)
    }

    return {}
}

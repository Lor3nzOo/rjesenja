import { redirect } from "@sveltejs/kit";
import fetch from "node-fetch";
export const load = async ({ locals, cookies }) => {
    const session = cookies.get('session')
    if (!locals.user) {
        throw redirect(302, '/prijava')
    } else {
        const data = await fetch('http://localhost:3000/pitanje/me', {
            headers: {
                cookie: `session=${session};`
            }
        })

        const res = await data.json()

        return {
            res
        }
    }
}
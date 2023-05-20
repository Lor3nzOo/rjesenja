import { redirect } from '@sveltejs/kit'
import { loggedIn } from '../../stores';

export const load = async () => {
    throw redirect(302, '/')
}

export const actions = {
    default({ cookies }) {
        cookies.set('session', '', {
            path: '/',
            expires: new Date(0),
        })

        loggedIn.set(false);
        throw redirect(302, '/prijava')
    },
}

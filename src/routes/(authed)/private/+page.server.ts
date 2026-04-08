import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createHmac } from 'crypto';

function makeToken(): string {
	return createHmac('sha256', env.PRIVATE_PASSWORD).update('private-session').digest('hex');
}

export async function load({ cookies, url }) {
	const token = cookies.get('private_session');
	const redirectTo = url.searchParams.get('redirect') ?? null;
	if (token && token === makeToken()) {
		return { authenticated: true, redirectTo };
	}
	return { authenticated: false, redirectTo };
}

export const actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const password = data.get('password') as string;

		if (!password || password !== env.PRIVATE_PASSWORD) {
			return fail(401, { error: 'Incorrect password' });
		}

		cookies.set('private_session', makeToken(), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7
		});

		const redirectTo = url.searchParams.get('redirect') ?? '/private';
		redirect(303, redirectTo);
	}
};

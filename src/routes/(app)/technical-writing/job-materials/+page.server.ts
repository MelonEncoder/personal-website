import { env } from '$env/dynamic/private';
import { createHmac } from 'crypto';

function makeToken(): string {
	return createHmac('sha256', env.PRIVATE_PASSWORD!).update('private-session').digest('hex');
}

export async function load({ cookies }) {
	const token = cookies.get('private_session');
	return { authenticated: !!token && token === makeToken() };
}

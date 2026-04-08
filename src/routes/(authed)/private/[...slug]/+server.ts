import { error, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createHmac } from 'crypto';

function makeToken(): string {
	return createHmac('sha256', env.PRIVATE_PASSWORD).update('private-session').digest('hex');
}

export async function GET({ params, cookies, url }) {
	const token = cookies.get('private_session');
	if (!token || token !== makeToken()) {
		redirect(303, `/private?redirect=${encodeURIComponent(url.pathname)}`);
	}

	const credentials = Buffer.from(`ian:${env.PRIVATE_PASSWORD}`).toString('base64');
	const upstream = await fetch(`https://files.iangillette.net/private/${params.slug}`, {
		headers: {
			Authorization: `Basic ${credentials}`
		}
	});

	if (upstream.status === 404) error(404, 'Not found');
	if (!upstream.ok) error(upstream.status, 'Failed to fetch file');

	return new Response(upstream.body, {
		headers: {
			'Content-Type': upstream.headers.get('Content-Type') ?? 'application/octet-stream',
			'Content-Length': upstream.headers.get('Content-Length') ?? '',
			'Content-Disposition':
				upstream.headers.get('Content-Disposition') ??
				`inline; filename="${params.slug.split('/').pop()}"`
		}
	});
}

import { fail, redirect } from "@sveltejs/kit";
import { PRIVATE_PASSWORD } from "$app/env/private";
import { makeToken, isPrivateAuthenticated, PRIVATE_COOKIE } from "#lib/server/auth.ts";

export async function load({ cookies, url }) {
	const redirectTo = url.searchParams.get("redirect") ?? null;
	if (isPrivateAuthenticated(cookies)) {
		return { authenticated: true, redirectTo };
	}
	return { authenticated: false, redirectTo };
}

export const actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const password = data.get("password") as string;

		if (!password || password !== PRIVATE_PASSWORD) {
			return fail(401, { error: "Incorrect password" });
		}

		cookies.set(PRIVATE_COOKIE, makeToken(), {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 7
		});

		// Only same-site paths: `?redirect=` comes from the URL, so never send visitors off-site.
		const requested = url.searchParams.get("redirect");
		const redirectTo =
			requested?.startsWith("/") &&
			!requested.startsWith("//") &&
			!requested.startsWith("/\\")
				? requested
				: "/private";
		redirect(303, redirectTo);
	}
};

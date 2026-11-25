import { env } from "$env/dynamic/private";
import { createHmac } from "crypto";
import type { Cookies } from "@sveltejs/kit";

export const PRIVATE_COOKIE = "private_session";

export function makeToken(): string {
	return createHmac("sha256", env.PRIVATE_PASSWORD!).update("private-session").digest("hex");
}

export function isPrivateAuthenticated(cookies: Cookies): boolean {
	const token = cookies.get(PRIVATE_COOKIE);
	return !!token && !!env.PRIVATE_PASSWORD && token === makeToken();
}

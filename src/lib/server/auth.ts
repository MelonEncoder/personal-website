import { PRIVATE_PASSWORD } from "$app/env/private";
import { createHmac } from "crypto";
import type { Cookies } from "@sveltejs/kit";

export const PRIVATE_COOKIE = "private_session";

export function makeToken(): string {
	return createHmac("sha256", PRIVATE_PASSWORD!).update("private-session").digest("hex");
}

export function isPrivateAuthenticated(cookies: Cookies): boolean {
	const token = cookies.get(PRIVATE_COOKIE);
	return !!token && !!PRIVATE_PASSWORD && token === makeToken();
}

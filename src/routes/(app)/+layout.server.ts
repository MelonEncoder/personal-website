import { isPrivateAuthenticated } from "#lib/server/auth.ts";
import { BOOT_COOKIE } from "#lib/desktop/session.ts";

export function load({ cookies }) {
	return {
		/** Set by the boot screen for the rest of the browser session. */
		booted: cookies.get(BOOT_COOKIE) === "1",
		privateAuthenticated: isPrivateAuthenticated(cookies)
	};
}

/** Session cookie (no expiry) that records the visitor has passed the boot screen. */
export const BOOT_COOKIE = "ig_session";

export function markBooted() {
	document.cookie = `${BOOT_COOKIE}=1; path=/; SameSite=Lax`;
}

export function clearBooted() {
	document.cookie = `${BOOT_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

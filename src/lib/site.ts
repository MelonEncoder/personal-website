/**
 * Site-wide values: names, version and copyright. Import from here instead of
 * repeating them, e.g. `import { SITE } from "#lib/site.ts"`.
 */

const owner = "Ian Gillette";
const year = new Date().getFullYear();

export const SITE = {
	/** The person the site belongs to. */
	owner,
	/** The desktop's "operating system", shown on the boot screen and in About This Site. */
	osName: "IG-OS",
	/** Shown in the first line of the boot log. */
	biosName: "IG-BIOS",
	version: "0.5.1",
	edition: "Portfolio Edition",
	/** Browser tab title when no window is open; open windows show "<window> · <owner>". */
	title: `${owner} · Portfolio`,
	description: `${owner}'s portfolio: programming projects, video games, graphic design and technical writing.`,
	copyright: {
		/** "© <year> <owner>", e.g. for the taskbar. */
		short: `© ${year} ${owner}`,
		/** The short line plus the rights notice. */
		long: `© ${year} ${owner}. All rights reserved.`
	}
} as const;

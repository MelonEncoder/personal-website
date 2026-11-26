import type { Component } from "svelte";
import type { AppId, SiteRoute, WinProps } from "./types";
import { getFolder, getMedia, fileIcon } from "./fs";

import infoIcon from "#lib/assets/icons/info.svg";
import linkIcon from "#lib/assets/icons/link.svg";
import jobIcon from "#lib/assets/icons/briefcase.svg";
import notesIcon from "#lib/assets/icons/assignment.svg";
import brochureIcon from "#lib/assets/icons/newsmode.svg";
import folderIcon from "#lib/assets/icons/folder.svg";
import computerIcon from "#lib/assets/icons/computer.svg";
import codeIcon from "#lib/assets/icons/code-xml.svg";
import gameIcon from "#lib/assets/icons/joystick.svg";

import About from "#lib/content/About.svelte";
import Links from "#lib/content/Links.svelte";
import Programming from "#lib/content/Programming.svelte";
import Games from "#lib/content/Games.svelte";
import Brochure from "#lib/content/Brochure.svelte";
import Instructions from "#lib/content/Instructions.svelte";
import JobMaterials from "#lib/content/JobMaterials.svelte";
import AboutSite from "#lib/content/AboutSite.svelte";
import FileExplorer from "#lib/components/desktop/apps/FileExplorer.svelte";
import Preview from "#lib/components/desktop/apps/Preview.svelte";

export interface AppDef {
	title: (props: WinProps) => string;
	icon: (props: WinProps) => string;
	/** Route this window represents; focusing it moves the URL here. */
	route?: (props: WinProps) => SiteRoute | undefined;
	/** Windows with the same key are the same window (opening again focuses it). */
	key: (props: WinProps) => string;
	/** Size a window opens at (shrunk to fit a small desktop). */
	size: { w: number; h: number };
	/**
	 * Smallest size the window can be resized to, so its content stays usable. Ignored when
	 * the window is maximized or fills the screen on phones.
	 */
	minSize: { w: number; h: number };
	/** Rendered with `{ props, winId }`; content pages simply ignore them. */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: Component<any>;
}

/**
 * Long text pages (About Me, the reflections): the header plus a readable chunk of text,
 * at a width where the header's subtitle mostly stays on one line.
 */
const TEXT_PAGE_MIN = { w: 400, h: 360 };

function content(
	title: string,
	icon: string,
	route: SiteRoute | undefined,
	component: AppDef["component"],
	{ size = { w: 820, h: 600 }, minSize }: Pick<AppDef, "minSize"> & Partial<Pick<AppDef, "size">>
): AppDef {
	return {
		title: () => title,
		icon: () => icon,
		route: route ? () => route : undefined,
		key: () => "",
		size,
		minSize,
		component
	};
}

export const APPS: Record<AppId, AppDef> = {
	about: content("About Me", infoIcon, "/about", About, { minSize: TEXT_PAGE_MIN }),
	// Tall enough to show every link without scrolling.
	links: content("Links", linkIcon, undefined, Links, {
		size: { w: 480, h: 420 },
		minSize: { w: 360, h: 410 }
	}),
	// Each lists every project as a card (data in projects.ts). The minimum shows the
	// first card: all of it for Programming, the screenshot and title for Video Games.
	programming: content("Programming", codeIcon, "/work/programming", Programming, {
		size: { w: 860, h: 615 },
		minSize: { w: 400, h: 380 }
	}),
	games: content("Video Games", gameIcon, "/work/games", Games, {
		size: { w: 760, h: 630 },
		minSize: { w: 400, h: 480 }
	}),
	brochure: content(
		"UN SDG Brochure — Reflection",
		brochureIcon,
		"/technical-writing/brochure",
		Brochure,
		{ minSize: TEXT_PAGE_MIN }
	),
	instructions: content(
		"Instructions — Reflection",
		notesIcon,
		"/technical-writing/instructions",
		Instructions,
		{ minSize: TEXT_PAGE_MIN }
	),
	jobMaterials: content(
		"Job Materials — Reflection",
		jobIcon,
		"/technical-writing/job-materials",
		JobMaterials,
		{ minSize: TEXT_PAGE_MIN }
	),
	// Tall enough to show everything without scrolling.
	aboutSite: content("About This Site", computerIcon, undefined, AboutSite, {
		size: { w: 440, h: 420 },
		minSize: { w: 360, h: 364 }
	}),
	explorer: {
		title: (p) => `File Explorer — ${getFolder(p.path ?? "")?.name ?? "Home"}`,
		icon: () => folderIcon,
		// Folders without their own route (e.g. UN SDG Brochure) leave the URL alone.
		route: (p) => getFolder(p.path ?? "")?.route,
		key: () => "",
		size: { w: 860, h: 540 },
		// The toolbar, one row of files and the status bar (the folder tree folds away).
		minSize: { w: 360, h: 300 },
		component: FileExplorer
	},
	preview: {
		title: (p) => `Preview — ${getMedia(p.path ?? "")?.name ?? "Untitled"}`,
		icon: (p) => {
			const file = getMedia(p.path ?? "");
			return file ? fileIcon(file) : infoIcon;
		},
		key: (p) => p.path ?? "",
		size: { w: 760, h: 640 },
		// The toolbar and a usable view of the file, with its info stacked below.
		minSize: { w: 360, h: 400 },
		component: Preview
	}
};

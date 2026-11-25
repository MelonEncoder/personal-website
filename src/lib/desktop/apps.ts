import type { Component } from "svelte";
import type { Pathname } from "$app/types";
import type { AppId, WinProps } from "./types";
import { getFolder, getMedia, fileIcon } from "./fs";

import infoIcon from "$lib/assets/icons/info.svg";
import linkIcon from "$lib/assets/icons/link.svg";
import codeIcon from "$lib/assets/icons/code-xml.svg";
import gameIcon from "$lib/assets/icons/joystick.svg";
import jobIcon from "$lib/assets/icons/briefcase.svg";
import notesIcon from "$lib/assets/icons/assignment.svg";
import brochureIcon from "$lib/assets/icons/newsmode.svg";
import folderIcon from "$lib/assets/icons/folder.svg";
import computerIcon from "$lib/assets/icons/computer.svg";

import About from "$lib/content/About.svelte";
import Links from "$lib/content/Links.svelte";
import Programming from "$lib/content/Programming.svelte";
import Games from "$lib/content/Games.svelte";
import Brochure from "$lib/content/Brochure.svelte";
import Instructions from "$lib/content/Instructions.svelte";
import JobMaterials from "$lib/content/JobMaterials.svelte";
import AboutSite from "$lib/content/AboutSite.svelte";
import FileExplorer from "$lib/components/desktop/apps/FileExplorer.svelte";
import Preview from "$lib/components/desktop/apps/Preview.svelte";

export interface AppDef {
	title: (props: WinProps) => string;
	icon: (props: WinProps) => string;
	/** Route this window represents; focusing it moves the URL here. */
	route?: (props: WinProps) => Pathname | undefined;
	/** Windows with the same key are the same window (opening again focuses it). */
	key: (props: WinProps) => string;
	size: { w: number; h: number };
	/** Content windows get padding and a max content width; tool apps lay themselves out. */
	padded: boolean;
	/** Rendered with `{ props, winId }`; content pages simply ignore them. */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: Component<any>;
}

function content(
	title: string,
	icon: string,
	route: Pathname | undefined,
	component: AppDef["component"],
	size = { w: 820, h: 600 }
): AppDef {
	return {
		title: () => title,
		icon: () => icon,
		route: route ? () => route : undefined,
		key: () => "",
		size,
		padded: true,
		component
	};
}

export const APPS: Record<AppId, AppDef> = {
	about: content("About Me", infoIcon, "/about", About),
	links: content("Links", linkIcon, undefined, Links, { w: 520, h: 480 }),
	programming: content("Programming", codeIcon, "/work/programming", Programming, {
		w: 900,
		h: 620
	}),
	games: content("Video Games", gameIcon, "/work/games", Games, { w: 900, h: 620 }),
	brochure: content(
		"UN SDG Brochure — Reflection",
		brochureIcon,
		"/technical-writing/brochure",
		Brochure
	),
	instructions: content(
		"Instructions — Reflection",
		notesIcon,
		"/technical-writing/instructions",
		Instructions
	),
	jobMaterials: content(
		"Job Materials",
		jobIcon,
		"/technical-writing/job-materials",
		JobMaterials
	),
	aboutSite: content("About This Site", computerIcon, undefined, AboutSite, { w: 440, h: 420 }),
	explorer: {
		title: (p) => `File Explorer — ${getFolder(p.path ?? "")?.name ?? "Home"}`,
		icon: () => folderIcon,
		// Folders without their own route (e.g. UN SDG Brochure) leave the URL alone.
		route: (p) => getFolder(p.path ?? "")?.route,
		key: () => "",
		size: { w: 860, h: 540 },
		padded: false,
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
		padded: false,
		component: Preview
	}
};

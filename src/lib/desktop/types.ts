import type { Pathname } from "$app/types";

export type AppId =
	| "about"
	| "links"
	| "brochure"
	| "instructions"
	| "jobMaterials"
	| "explorer"
	| "preview"
	| "aboutSite";

/** Props passed to a window's app. `path` is a virtual filesystem path for Explorer/Preview. */
export interface WinProps {
	path?: string;
}

export interface FolderNode {
	kind: "folder";
	id: string;
	name: string;
	children: FsNode[];
	/** Site route this folder corresponds to, if any. */
	route?: Pathname;
}

export interface AppFileNode {
	kind: "app";
	id: string;
	name: string;
	icon: string;
	app: AppId;
}

export interface MediaFileNode {
	kind: "image" | "pdf";
	id: string;
	name: string;
	src: string;
	title: string;
	description?: string;
	date?: string;
}

/** A portfolio project (a program or a game); opens in Preview. */
export interface ProjectFileNode {
	kind: "project";
	id: string;
	name: string;
	icon: string;
	category: "program" | "game";
	title: string;
	description: string;
	href: string;
	date: string;
	tags?: string[];
	image?: string;
}

export type FileNode = AppFileNode | MediaFileNode | ProjectFileNode;
export type FsNode = FolderNode | FileNode;

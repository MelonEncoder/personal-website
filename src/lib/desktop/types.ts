import type { Path } from "$app/types";

/** A site pathname, such as "/work". Kit 3's `Path` drops the leading slash. */
export type SiteRoute = `/${Path}`;

export type AppId =
	| "about"
	| "links"
	| "programming"
	| "games"
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
	route?: SiteRoute;
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

export type FileNode = AppFileNode | MediaFileNode;
export type FsNode = FolderNode | FileNode;

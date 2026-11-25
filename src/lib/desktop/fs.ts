import type { FileNode, FolderNode, FsNode, MediaFileNode } from "./types";

import folderIcon from "$lib/assets/icons/folder.svg";
import infoIcon from "$lib/assets/icons/info.svg";
import linkIcon from "$lib/assets/icons/link.svg";
import codeIcon from "$lib/assets/icons/code-xml.svg";
import gameIcon from "$lib/assets/icons/joystick.svg";
import imageIcon from "$lib/assets/icons/image.svg";
import jobIcon from "$lib/assets/icons/briefcase.svg";
import documentIcon from "$lib/assets/icons/description.svg";
import notesIcon from "$lib/assets/icons/assignment.svg";

import magazineCover from "$lib/assets/media/graphic-design/magazine-cover.webp";
import theQueensGambitPoster from "$lib/assets/media/graphic-design/the-queens-gambit-poster.webp";
import businessCard from "$lib/assets/media/graphic-design/business-card.webp";
import mountain from "$lib/assets/media/graphic-design/mountain.webp";
import flatSpace from "$lib/assets/media/graphic-design/flat-space.webp";
import teaParty from "$lib/assets/media/graphic-design/tea-party.webp";
import robot from "$lib/assets/media/graphic-design/robot.webp";
import jibiRamen from "$lib/assets/media/graphic-design/jibi-ramen.webp";
import brochurePdf from "$lib/assets/media/technical-writing/udl-brochure.pdf?url";
import brochureWriteupPdf from "$lib/assets/media/technical-writing/udl-brochure-writeup.pdf?url";
import instructionsPdf from "$lib/assets/media/technical-writing/instructions.pdf?url";

function image(
	id: string,
	src: string,
	title: string,
	description: string,
	date: string
): MediaFileNode {
	return { kind: "image", id, name: `${id}.webp`, src, title, description, date };
}

export const root: FolderNode = {
	kind: "folder",
	id: "",
	name: "Home",
	route: "/",
	children: [
		{ kind: "app", id: "about", name: "About Me", icon: infoIcon, app: "about" },
		{ kind: "app", id: "links", name: "Links", icon: linkIcon, app: "links" },
		{
			kind: "folder",
			id: "work",
			name: "Work",
			route: "/work",
			children: [
				{
					kind: "app",
					id: "programming",
					name: "Programming",
					icon: codeIcon,
					app: "programming"
				},
				{ kind: "app", id: "games", name: "Video Games", icon: gameIcon, app: "games" },
				{
					kind: "folder",
					id: "graphic-design",
					name: "Graphic Design",
					route: "/work/design",
					children: [
						image(
							"magazine-cover",
							magazineCover,
							"National Geographic Magazine Cover",
							"Magazine cover utilizing layered photography and different typography hierarchies.",
							"2022"
						),
						image(
							"the-queens-gambit-poster",
							theQueensGambitPoster,
							"The Queen's Gambit Movie Poster",
							"Movie poster inspired by the The Queen's Gambit that explores the contrast between the themes of chess master and substance abuse.",
							"2023"
						),
						image(
							"business-card",
							businessCard,
							"Personal Business Card",
							"Print-ready, vertically oriented business card.",
							"2025"
						),
						image(
							"mountain",
							mountain,
							"Blackout Mountain",
							"Created this artwork to put on my climbing bag.",
							"2025"
						),
						image(
							"flat-space",
							flatSpace,
							"Flat Space",
							"Flat-illustration study focused on a space theme.",
							"2023"
						),
						image(
							"tea-party",
							teaParty,
							"Tea Party",
							"A royal figure bathing in red tea, celebrating their success. Created during a competition and selected as the winner.",
							"2023"
						),
						image(
							"robot",
							robot,
							"Robot Squared",
							"Concept art for a colorful, boxy robot.",
							"2023"
						),
						image(
							"jibi-ramen",
							jibiRamen,
							"Jibi Ramen Branding",
							"Created the branding for a fake business named Jibi Ramen.",
							"2023"
						)
					]
				}
			]
		},
		{
			kind: "folder",
			id: "technical-writing",
			name: "Technical Writing",
			route: "/technical-writing",
			children: [
				{
					kind: "app",
					id: "job-materials",
					name: "Job Materials",
					icon: jobIcon,
					app: "jobMaterials"
				},
				{
					kind: "folder",
					id: "un-sdg-brochure",
					name: "UN SDG Brochure",
					children: [
						{
							kind: "app",
							id: "reflection",
							name: "Reflection",
							icon: notesIcon,
							app: "brochure"
						},
						{
							kind: "pdf",
							id: "udl-brochure",
							name: "udl-brochure.pdf",
							src: brochurePdf,
							title: "UN SDG Brochure",
							description: "Brochure explaining UDL principles to teachers at UCF."
						},
						{
							kind: "pdf",
							id: "udl-brochure-writeup",
							name: "udl-brochure-writeup.pdf",
							src: brochureWriteupPdf,
							title: "UN SDG Brochure Writeup",
							description: "Research writeup that accompanies the brochure."
						}
					]
				},
				{
					kind: "folder",
					id: "instructions",
					name: "Instructions",
					children: [
						{
							kind: "app",
							id: "reflection",
							name: "Reflection",
							icon: notesIcon,
							app: "instructions"
						},
						{
							kind: "pdf",
							id: "instructions",
							name: "instructions.pdf",
							src: instructionsPdf,
							title: "Installing a Blender Extension",
							description:
								"Step-by-step instructions for installing an extension in Blender."
						}
					]
				}
			]
		}
	]
};

const index = new Map<string, FsNode>();

function walk(node: FsNode, path: string) {
	index.set(path, node);
	if (node.kind === "folder") {
		for (const child of node.children) walk(child, path ? `${path}/${child.id}` : child.id);
	}
}
walk(root, "");

/** Virtual paths look like `work/graphic-design/robot`; the root is `""`. */
export function getNode(path: string): FsNode | undefined {
	return index.get(path);
}

export function getFolder(path: string): FolderNode | undefined {
	const node = index.get(path);
	return node?.kind === "folder" ? node : undefined;
}

export function getMedia(path: string): MediaFileNode | undefined {
	const node = index.get(path);
	return node && (node.kind === "image" || node.kind === "pdf") ? node : undefined;
}

export function joinPath(parent: string, id: string) {
	return parent ? `${parent}/${id}` : id;
}

export function parentPath(path: string) {
	const i = path.lastIndexOf("/");
	return i === -1 ? "" : path.slice(0, i);
}

/** Folders from the root down to `path`, inclusive. */
export function breadcrumbs(path: string): { path: string; folder: FolderNode }[] {
	const crumbs = [{ path: "", folder: root }];
	if (!path) return crumbs;
	let acc = "";
	for (const segment of path.split("/")) {
		acc = joinPath(acc, segment);
		const folder = getFolder(acc);
		if (folder) crumbs.push({ path: acc, folder });
	}
	return crumbs;
}

export function folderForRoute(route: string): string | undefined {
	for (const [path, node] of index) {
		if (node.kind === "folder" && node.route === route && path !== "") return path;
	}
	return undefined;
}

export function fileIcon(file: FileNode): string {
	if (file.kind === "app") return file.icon;
	return file.kind === "image" ? imageIcon : documentIcon;
}

export { folderIcon };

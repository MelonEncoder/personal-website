import type { FileNode, FolderNode, FsNode, MediaFileNode, ProjectFileNode } from "./types";

import folderIcon from "$lib/assets/icons/folder.svg";
import infoIcon from "$lib/assets/icons/info.svg";
import linkIcon from "$lib/assets/icons/link.svg";
import codeIcon from "$lib/assets/icons/code-xml.svg";
import gameIcon from "$lib/assets/icons/joystick.svg";
import imageIcon from "$lib/assets/icons/image.svg";
import jobIcon from "$lib/assets/icons/briefcase.svg";
import pdfIcon from "$lib/assets/icons/file-pdf.svg";
import notesIcon from "$lib/assets/icons/assignment.svg";

import magazineCover from "$lib/assets/media/graphic-design/magazine-cover.webp";
import theQueensGambitPoster from "$lib/assets/media/graphic-design/the-queens-gambit-poster.webp";
import businessCard from "$lib/assets/media/graphic-design/business-card.webp";
import mountain from "$lib/assets/media/graphic-design/mountain.webp";
import flatSpace from "$lib/assets/media/graphic-design/flat-space.webp";
import teaParty from "$lib/assets/media/graphic-design/tea-party.webp";
import robot from "$lib/assets/media/graphic-design/robot.webp";
import jibiRamen from "$lib/assets/media/graphic-design/jibi-ramen.webp";
import whiteButtonScreenshot from "$lib/assets/media/video-games/white-button-screenshot.png";
import blackedOut from "$lib/assets/media/video-games/blacked-out.png";
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

/** Project entries are named after their title, like an app ("PDF to Video"). */
function project(
	id: string,
	icon: string,
	data: Omit<ProjectFileNode, "kind" | "id" | "name" | "icon">
): ProjectFileNode {
	return { kind: "project", id, name: data.title, icon, ...data };
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
					kind: "folder",
					id: "programming",
					name: "Programming",
					route: "/work/programming",
					children: [
						project("personal-website", codeIcon, {
							title: "Personal Website (this site)",
							description:
								"Made using Svelte with the intention to showcase myself and my work.",
							href: "https://github.com/MelonEncoder/personal-website",
							tags: ["Svelte", "TypeScript", "HTML/CSS"],
							date: "2024"
						}),
						project("pdf-to-video", codeIcon, {
							title: "PDF to Video",
							description:
								"This is a program that converts a .pdf file into a .mp4 file. You can set the FPS, duration, resolution, and even animate the pdf.",
							href: "https://github.com/MelonEncoder/pdf-to-video",
							tags: ["C++", "Meson", "OpenCV", "Poppler"],
							date: "2023"
						}),
						project("html-image-parser", codeIcon, {
							title: "HTML Image Parser",
							description:
								'I created this program to test out the Go programming language. Just describe the prefix you want to look for like "src=" and then all the respective images will downloaded.',
							href: "https://github.com/MelonEncoder/img-downloader",
							tags: ["Go"],
							date: "2023"
						}),
						project("wallpaper-switcher", codeIcon, {
							title: "Linux Wallpaper Switcher",
							description:
								"A lightweight wallpaper switcher for Linux that rotates images from a folder with simple keyboard controls.",
							href: "https://github.com/MelonEncoder/simple-wallpaper-switcher",
							tags: ["C++", "SFML"],
							date: "2023"
						}),
						project("pong", codeIcon, {
							title: "PONG",
							description: "Recreated the classic game of Pong with a little twist.",
							href: "https://github.com/MelonEncoder/pong",
							tags: ["C", "RayLib"],
							date: "2023"
						})
					]
				},
				{
					kind: "folder",
					id: "games",
					name: "Video Games",
					route: "/work/games",
					children: [
						project("white-button", gameIcon, {
							title: "White Button",
							description:
								"White Button was created during a week long game jam where the theme was 1-bit color palette. Your goal is to click all the buttons before the lava reaches you.",
							href: "https://karpoonz.itch.io/white-button",
							image: whiteButtonScreenshot,
							date: "2025"
						}),
						project("blacked-out", gameIcon, {
							title: "Blacked Out",
							description:
								"Someone knocked you out and trapped you inside of a pitch black room. Your goal is to escape by using a flashlight and keys you find lying around in the environment.",
							href: "https://karpoonz.itch.io/blacked-out",
							image: blackedOut,
							date: "2024"
						})
					]
				},
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

export function getProject(path: string): ProjectFileNode | undefined {
	const node = index.get(path);
	return node?.kind === "project" ? node : undefined;
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
	if (file.kind === "app" || file.kind === "project") return file.icon;
	return file.kind === "image" ? imageIcon : pdfIcon;
}

export { folderIcon };

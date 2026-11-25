import whiteButtonScreenshot from "$lib/assets/media/video-games/white-button-screenshot.png";
import blackedOut from "$lib/assets/media/video-games/blacked-out.png";

/** A portfolio project, shown as a card in the Programming or Video Games app. */
export interface Project {
	id: string;
	title: string;
	description: string;
	href: string;
	date: string;
	tags?: string[];
	/** A screenshot; it also opens in Preview as an image file. */
	screenshot?: { src: string; name: string };
}

export const PROGRAMMING_PROJECTS: Project[] = [
	{
		id: "personal-website",
		title: "Personal Website (this site)",
		description: "Made using Svelte with the intention to showcase myself and my work.",
		href: "https://github.com/MelonEncoder/personal-website",
		tags: ["Svelte", "TypeScript", "HTML/CSS"],
		date: "2024"
	},
	{
		id: "pdf-to-video",
		title: "PDF to Video",
		description:
			"This is a program that converts a .pdf file into a .mp4 file. You can set the FPS, duration, resolution, and even animate the pdf.",
		href: "https://github.com/MelonEncoder/pdf-to-video",
		tags: ["C++", "Meson", "OpenCV", "Poppler"],
		date: "2023"
	},
	{
		id: "html-image-parser",
		title: "HTML Image Parser",
		description:
			'I created this program to test out the Go programming language. Just describe the prefix you want to look for like "src=" and then all the respective images will downloaded.',
		href: "https://github.com/MelonEncoder/img-downloader",
		tags: ["Go"],
		date: "2023"
	},
	{
		id: "wallpaper-switcher",
		title: "Linux Wallpaper Switcher",
		description:
			"A lightweight wallpaper switcher for Linux that rotates images from a folder with simple keyboard controls.",
		href: "https://github.com/MelonEncoder/simple-wallpaper-switcher",
		tags: ["C++", "SFML"],
		date: "2023"
	},
	{
		id: "pong",
		title: "PONG",
		description: "Recreated the classic game of Pong with a little twist.",
		href: "https://github.com/MelonEncoder/pong",
		tags: ["C", "RayLib"],
		date: "2023"
	}
];

export const GAME_PROJECTS: Project[] = [
	{
		id: "white-button",
		title: "White Button",
		description:
			"White Button was created during a week long game jam where the theme was 1-bit color palette. Your goal is to click all the buttons before the lava reaches you.",
		href: "https://karpoonz.itch.io/white-button",
		screenshot: { src: whiteButtonScreenshot, name: "white-button.png" },
		date: "2025"
	},
	{
		id: "blacked-out",
		title: "Blacked Out",
		description:
			"Someone knocked you out and trapped you inside of a pitch black room. Your goal is to escape by using a flashlight and keys you find lying around in the environment.",
		href: "https://karpoonz.itch.io/blacked-out",
		screenshot: { src: blackedOut, name: "blacked-out.png" },
		date: "2024"
	}
];

/** Where a game's screenshot lives for Preview (not shown in the Explorer). */
export function screenshotPath(project: Project) {
	return `work/games/${project.id}-screenshot`;
}

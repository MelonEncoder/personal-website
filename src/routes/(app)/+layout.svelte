<script lang="ts">
	import { onMount } from "svelte";
	import { afterNavigate } from "$app/navigation";
	import { page } from "$app/state";
	import { resolve } from "$app/paths";

	import favicon from "$lib/assets/brand/favicon.svg";
	import monogram from "$lib/assets/brand/monogram.svg";
	import folderIcon from "$lib/assets/icons/folder.svg";
	import codeFileIcon from "$lib/assets/icons/code-xml.svg";
	import gameFileIcon from "$lib/assets/icons/joystick.svg";
	import designFileIcon from "$lib/assets/icons/image.svg";
	import aboutFileIcon from "$lib/assets/icons/info.svg";
	import menuIcon from "$lib/assets/icons/menu.svg";
	import jobIcon from "$lib/assets/icons/briefcase.svg";
	import instructionsIcon from "$lib/assets/icons/assignment.svg";
	import brochureIcon from "$lib/assets/icons/newsmode.svg";
	import type { ResolvedPathname } from "$app/types";

	interface RouteTreeNode {
		label: string;
		depth: number;
		type: "root" | "folder" | "file";
		url: ResolvedPathname;
		icon?: string;
	}

	const treeNodes: RouteTreeNode[] = [
		{ label: "HOME", depth: 0, type: "root", url: "/" },
		{ label: "About", depth: 1, type: "file", url: "/about", icon: aboutFileIcon },
		{ label: "WORK", depth: 1, type: "folder", url: "/work" },
		{
			label: "Programming",
			depth: 2,
			type: "file",
			url: "/work/programming",
			icon: codeFileIcon
		},
		{ label: "Video Games", depth: 2, type: "file", url: "/work/games", icon: gameFileIcon },
		{
			label: "Graphic Design",
			depth: 2,
			type: "file",
			url: "/work/design",
			icon: designFileIcon
		},
		{ label: "TECHNICAL WRITING", depth: 1, type: "folder", url: "/technical-writing" },
		{
			label: "Job Materials",
			depth: 2,
			type: "file",
			url: "/technical-writing/job-materials",
			icon: jobIcon
		},
		{
			label: "Instructions",
			depth: 2,
			type: "file",
			url: "/technical-writing/instructions",
			icon: instructionsIcon
		},
		{
			label: "UN SDG Brochure",
			depth: 2,
			type: "file",
			url: "/technical-writing/brochure",
			icon: brochureIcon
		}
	];

	let { children } = $props();
	let year = new Date().getFullYear().toString();
	let menuVisible: boolean = $state(false);
	let contentElement: HTMLDivElement | undefined;
	const WORK_MEDIA_PRELOADED_KEY = "ig-work-media-preloaded-v1";

	function closeMenu() {
		menuVisible = false;
	}

	function normalizePath(path: string) {
		return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
	}

	function isActive(url: string) {
		return normalizePath(page.url.pathname) === normalizePath(url);
	}

	// Scrolls new route content to top of scroll container.
	afterNavigate(({ to }) => {
		if (!contentElement || !to || to.url.hash) return;
		contentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
	});

	const workMediaSources = [
		"https://files.iangillette.net/public/digital-media/magazine-cover.webp",
		"https://files.iangillette.net/public/digital-media/the-queens-gambit-poster.webp",
		"https://files.iangillette.net/public/digital-media/business-card.webp",
		"https://files.iangillette.net/public/digital-media/mountain.webp",
		"https://files.iangillette.net/public/digital-media/flat-space.webp",
		"https://files.iangillette.net/public/digital-media/tea-party.webp",
		"https://files.iangillette.net/public/digital-media/robot.webp",
		"https://files.iangillette.net/public/digital-media/jibi-ramen.webp",
		"https://files.iangillette.net/public/video-games/white-button-screenshot.png",
		"https://files.iangillette.net/public/video-games/blacked-out.png"
	];

	function preloadWorkMedia() {
		for (const src of workMediaSources) {
			const image = new Image();
			image.src = src;
		}
	}

	onMount(() => {
		// Preloads in media found on site before user navigates to the work pages.
		if (localStorage.getItem(WORK_MEDIA_PRELOADED_KEY) === "1") return;
		const timer = window.setTimeout(() => {
			preloadWorkMedia();
			localStorage.setItem(WORK_MEDIA_PRELOADED_KEY, "1");
		}, 300);

		return () => window.clearTimeout(timer);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="page">
	<div class="grid">
		<div class="gridTop"></div>
		<div class="gridLeft"></div>
		<div class="gridRight"></div>
		<div class="gridBottom"></div>

		<div class="monogramContainer">
			<img class="monogram" src={monogram} alt="monogram" width="75px" />
		</div>

		<div class="copyrightContainer">
			<p>{year} &copy; Ian Gillette</p>
		</div>

		<div class="gridCenterCell">
			<section class="contentContainer">
				{#if menuVisible}
					<button
						type="button"
						class="menuBackdrop"
						aria-label="Close route menu"
						onclick={closeMenu}
					></button>
				{/if}
				<nav id="routeTreeMenu" class="fileTreeMenu {menuVisible ? 'is-open' : ''}">
					<div class="treeTitle">File Explorer</div>
					{#each treeNodes as node, i (i)}
						{#if node.url}
							<a
								class="treeRow {node.type} {isActive(node.url) ? 'isActive' : ''}"
								href={resolve(node.url)}
								style="--depth: {node.depth};"
								onclick={closeMenu}
							>
								<div class="treeText">
									<img
										class="treeIcon"
										src={node.type === "file" ? node.icon : folderIcon}
										alt=""
										aria-hidden="true"
									/>
									<span>{node.label}</span>
								</div>
							</a>
						{/if}
					{/each}
				</nav>
				<header class="menuBar">
					<button
						type="button"
						class="menuButton"
						class:isActive={menuVisible}
						aria-pressed={menuVisible}
						aria-expanded={menuVisible}
						aria-controls="routeTreeMenu"
						onclick={() => (menuVisible = !menuVisible)}
					>
						<div class="buttonContent">
							<img src={menuIcon} alt="folder-icon" />
							Menu
						</div>
					</button>
				</header>
				<div class="content" bind:this={contentElement}>
					<div class="contentInner">
						{@render children?.()}
					</div>
				</div>
			</section>
		</div>
	</div>
</div>

<style>
	.page {
		min-height: 100dvh;
		width: 100%;
		background-color: var(--off-white);
		position: relative;
		overflow: hidden;
	}

	.grid {
		display: grid;
		grid-template-columns: 4rem minmax(0, 1fr) 4rem;
		grid-template-rows: 4rem minmax(0, 1fr) 4rem;
		position: relative;
		z-index: 1;
		height: 100dvh;
		width: 100%;
	}

	.gridTop {
		grid-column: 1 / 4;
		grid-row: 1 / 2;
		display: grid;
		grid-template-columns: 4rem auto 4rem;
		border-bottom: 2px solid var(--black);
	}

	.gridLeft {
		grid-column: 1 / 2;
		grid-row: 1 / 4;
		grid-template-rows: 4rem 1fr 4rem;
		border-right: 2px solid var(--black);
	}

	.gridRight {
		grid-column: 3 / 4;
		grid-row: 1 / 4;
		grid-template-rows: 4rem 1fr 4rem;
		border-left: 2px solid var(--black);
	}

	.gridBottom {
		grid-column: 1 / 4;
		grid-row: 3 / 4;
		grid-template-columns: 4rem 1fr 4rem;
		border-top: 2px solid var(--black);
	}

	.gridCenterCell {
		grid-column: 2 / 3;
		grid-row: 2 / 3;

		box-sizing: border-box;
		height: 100%;
		width: 100%;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
		background-color: var(--black);
		padding: 0;
		border: 10px solid var(--black);
	}

	.contentContainer {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		background-color: var(--backlight);
		position: sticky;
		scrollbar-color: var(--accent) var(--black);
	}

	.contentContainer::before {
		content: "";
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 100;
		background:
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 3px,
				rgba(0, 0, 0, 0.04) 3px,
				rgba(0, 0, 0, 0.04) 4px
			),
			radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.13) 100%);
	}

	.content {
		padding: clamp(1.25rem, 2.5vw, 3rem);
		box-sizing: border-box;
		overflow: auto;
		overscroll-behavior: contain;
		width: 100%;
		height: 100%;
		-webkit-overflow-scrolling: touch;
	}

	.contentInner {
		max-width: var(--content-max-width);
		margin: 0 auto;
		min-height: 100%;
	}

	.fileTreeMenu {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		background-color: var(--backlight-2);
		border-right: 2px solid var(--black);
		width: min(21rem, 40vw);
		min-width: 15rem;
		overflow: auto;
		opacity: 1;
		pointer-events: auto;
		transform: translateX(-102%);
		box-shadow: 0 0 0 transparent;
		z-index: 4;
		transition: 0.2s ease;
	}

	.fileTreeMenu.is-open {
		transform: translateX(0);
		box-shadow: 0.75rem 0 2rem rgba(0, 0, 0, 0.18);
	}

	.treeTitle {
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: color-mix(in srgb, var(--black), white 30%);
		padding: 0.9rem 1rem 0.65rem 1rem;
		border-bottom: 1px solid color-mix(in srgb, var(--black), white 68%);
		white-space: nowrap;
	}

	.treeRow {
		--depth: 0;
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body);
		line-height: 1.35;
		color: var(--black);
		white-space: nowrap;
	}

	.treeRow.root {
		font-weight: normal;
	}

	.treeRow.folder {
		font-weight: normal;
	}

	.treeRow.file {
		font-weight: normal;
	}

	.treeText {
		margin-left: calc(0.9rem + (var(--depth) * 0.95rem));
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.4rem 0;
		padding-left: 0.5rem;
	}

	.treeIcon {
		width: 1rem;
		height: 1rem;
		flex: 0 0 auto;
	}

	.treeRow.file .treeText,
	.treeRow.folder .treeText {
		border-left: 1px solid black;
	}

	a.treeRow {
		text-decoration: none;
	}

	a.treeRow:hover {
		background-color: var(--accent-2);
	}

	a.treeRow.isActive {
		background-color: color-mix(in srgb, var(--accent-2), var(--accent) 42%);
		font-weight: 700;
	}

	.menuBar {
		display: flex;
		background-color: var(--backlight-2);
		border-bottom: 2px solid var(--black);
	}

	.menuBackdrop {
		display: block;
		position: absolute;
		inset: 0;
		z-index: 3;
		border: 0;
		padding: 0;
		background-color: rgba(0, 0, 0, 0.26);
	}
	.menuButtonContainer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		padding: 1rem;
	}

	.menuButton {
		cursor: pointer;
		font-size: var(--fs-h3);
		font-weight: 700;
		color: var(--black);
		background-color: transparent;
		padding: 0 0.25rem;
		padding-right: 0.4rem;
		transition: 0.15s ease;
		height: fit-content;
		border: none;
		border-right: 2px solid var(--black);
	}

	.menuButton:hover {
		background-color: var(--accent-2);
	}

	.buttonContent {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		height: 100%;
		padding: 0.25rem;
	}

	.buttonContent img {
		width: 1.75rem;
	}

	.monogramContainer {
		grid-column: 2 / 3;
		grid-row: 1 / 2;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.monogramContainer .monogram {
		width: 2.25rem;
		aspect-ratio: 1 / 1;
	}

	.copyrightContainer {
		grid-column: 2 / 3;
		grid-row: 3 / 4;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.copyrightContainer p {
		font-size: var(--fs-body);
		margin: 0;
		color: var(--black);
		font-weight: 400;
	}

	/* Tablet */
	@media (max-width: 1200px) {
		.grid {
			grid-template-columns: 1.5rem minmax(0, 1fr) 1.5rem;
			grid-template-rows: 3.5rem minmax(0, 1fr) 3.5rem;
		}

		.centerContent {
			padding: 1rem;
		}
	}

	/* Phone */
	@media (max-width: 600px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: 3rem minmax(0, 1fr) 3rem;
		}

		.gridTop,
		.gridLeft,
		.gridRight,
		.gridBottom {
			visibility: hidden;
			grid-column: 1 / 2;
		}

		.gridCenterCell {
			grid-column: 1 / 2;
		}

		.monogramContainer {
			grid-column: 1 / 2;
		}

		.copyrightContainer {
			grid-column: 1 / 2;
		}

		.fileTreeMenu {
			width: min(20rem, 82vw);
			min-width: 0;
		}

		.fileTreeMenu.is-open {
			width: min(20rem, 82vw);
			min-width: 0;
		}
	}
</style>

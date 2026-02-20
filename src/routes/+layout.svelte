<script lang="ts">
	import { page } from "$app/state";
	import { resolve } from "$app/paths";

	import favicon from "$lib/assets/brand/favicon.svg";
	import folderIcon from "$lib/assets/icons/folder.svg";
	import monogram from "$lib/assets/brand/monogram.svg";

	interface RouteTreeNode {
		label: string;
		depth: number;
		type: "root" | "folder" | "file";
		url?: Parameters<typeof resolve>[0];
	}

	const treeNodes: RouteTreeNode[] = [
		{ label: "Home", depth: 0, type: "root", url: "/" },
		{ label: "About", depth: 1, type: "folder", url: "/about" },
		{ label: "Work", depth: 1, type: "folder", url: "/work" },
		{ label: "Programming", depth: 2, type: "file", url: "/work/programming" },
		{ label: "Games", depth: 2, type: "file", url: "/work/games" },
		{ label: "Design", depth: 2, type: "file", url: "/work/design" }
	];

	let { children } = $props();
	let year = new Date().getFullYear().toString();
	let menuVisible: boolean = $state(false);

	function closeMenu() {
		menuVisible = false;
	}

	function normalizePath(path: string) {
		return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
	}

	function isActive(url: Parameters<typeof resolve>[0]) {
		return normalizePath(page.url.pathname) === normalizePath(url);
	}
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
			<p>&copy; {year} Ian Gillette</p>
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
									{node.label}
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
							<img src={folderIcon} alt="folder-icon" />
							Menu
						</div>
					</button>
				</header>
				<div class="content">
					{@render children?.()}
				</div>
			</section>
		</div>
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
	:global(:root) {
		/* Fonts */
		--font-title: "Press Start 2P";
		--font-body: "Inter";
		--font-mono: "IBM Plex Sans";

		/* Colors */
		--black: rgb(33 33 35);
		--white: rgb(251 250 245);
		--primary: rgb(236 228 230);
		--menuButton: rgb(252, 201, 238);
		--accent: rgb(250, 73, 109);
		--accent-2: color-mix(in srgb, var(--accent), white 70%);
		--backlight: rgb(210, 242, 219);
		--backlight-2: rgb(235, 246, 255);
		--gradient: linear-gradient(45deg, var(--accent), var(--accent-2));

		/* Font Sizes */
		--fs-title: clamp(2rem, 4vw, 2.6rem);
		--fs-h1: clamp(1.5rem, 2.2vw, 1.75rem);
		--fs-h2: clamp(1.7rem, 3vw, 2rem);
		--fs-h3: clamp(1.15rem, 1.6vw, 1.3rem);
		--fs-body: 1rem;

		/* Radius */
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 16px;

		/* Constraints */
		--content-max-width: 1500px;
	}

	:global(body) {
		font-family: var(--font-body), sans-serif, serif;
		margin: 0;
		background-color: var(--white);
	}

	.page {
		min-height: 100dvh;
		width: 100%;
		background-color: var(--white);
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
	}

	.content {
		padding: clamp(1.25rem, 2.5vw, 3rem);
		box-sizing: border-box;
		overflow: auto;
		overscroll-behavior: contain;
		width: 100%;
		-webkit-overflow-scrolling: touch;
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
		font-weight: 700;
	}

	.treeRow.folder {
		font-weight: 700;
	}

	.treeRow.file {
		font-weight: 500;
	}

	.treeText {
		margin-left: calc(0.9rem + (var(--depth) * 0.95rem));
		padding: 0.4rem 0;
		padding-left: 0.5rem;
	}

	.treeRow.file .treeText {
		border-left: 2px solid black;
	}

	a.treeRow {
		text-decoration: none;
	}

	a.treeRow:hover {
		background-color: var(--accent-2);
	}

	a.treeRow.isActive {
		background-color: color-mix(in srgb, var(--accent-2), var(--accent) 42%);
		color: color-mix(in srgb, var(--accent), black 28%);
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
		transition: 0.15s ease;
		height: fit-content;
		border: none;
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

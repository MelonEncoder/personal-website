<script lang="ts">
	import { page } from "$app/state";
	import { resolve } from "$app/paths";

	import favicon from "$lib/assets/brand/favicon.svg";
	import folderIcon from "$lib/assets/icons/folder.svg";
	import monogram from "$lib/assets/brand/monogram.svg";

	interface RouteTreeNode {
		label: string;
		depth: number;
		type: "folder" | "file";
		url?: string;
	}

	const treeNodes: RouteTreeNode[] = [
		{ label: "Home", depth: 0, type: "folder", url: "/" },
		{ label: "About", depth: 1, type: "file", url: "/about" },
		{ label: "Work", depth: 1, type: "file", url: "/work" }
	];

	let { children } = $props();
	let year = new Date().getFullYear().toString();
	let menuVisible: boolean = $state(false);

	function closeMenu() {
		menuVisible = false;
	}

	function isActive(url: string) {
		return url === "/" ? page.url.pathname === "/" : page.url.pathname.startsWith(url);
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

		<div class="brandContainer">
			<img class="monogram" src={monogram} alt="monogram" width="75px" />
			<p>&copy; {year} Ian Gillette</p>
		</div>

		<div class="gridMenuButton">
			<section class="menuButtonContainer">
				<button
					type="button"
					class="menuButton gb-btn gb-btn--icon {menuVisible ? 'is-active' : ''}"
					aria-pressed={menuVisible}
					aria-expanded={menuVisible}
					aria-controls="routeTreeMenu"
					onclick={() => (menuVisible = !menuVisible)}
				>
					<div class="buttonContent">
						<img src={folderIcon} alt="" />
						Menu
					</div>
				</button>
			</section>
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
								class="treeRow treeRow--{node.type} {isActive(node.url)
									? 'is-active'
									: ''}"
								href={resolve(node.url)}
								style="--depth: {node.depth};"
								onclick={closeMenu}
							>
								{node.type === "folder" ? "" : "└"}
								{node.label}
							</a>
						{:else}
							<div
								class="treeRow treeRow--{node.type}"
								style="--depth: {node.depth};"
							>
								{node.type === "folder" ? "▾" : "└"}
								{node.label}
							</div>
						{/if}
					{/each}
				</nav>
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
	:root {
		/* Fonts */
		--font-1: "Inter";
		--font-2: "IBM Plex Sans";

		/* Colors */
		--black: rgb(33 33 35);
		--white: rgb(251 250 245);
		--accent: rgb(250, 73, 109);
		--backlight: rgb(210, 242, 219);
		--gradient: linear-gradient(45deg, var(--accent), var(--accent-2));

		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 16px;
	}

	:global(body) {
		font-family: var(--font-1), sans-serif, serif;
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
		grid-template-rows: 4rem minmax(0, 1fr) auto;
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
		overflow: hidden;

		background-color: var(--black);
		padding: 0;

		border: 10px solid var(--black);
	}

	.contentContainer {
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		background-color: rgb(210, 242, 219);
		position: relative;
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
		background-color: rgb(235, 246, 255);
		border-right: 2px solid var(--black);
		width: min(21rem, 40vw);
		min-width: 15rem;
		overflow: auto;
		opacity: 1;
		pointer-events: auto;
		transform: translateX(-102%);
		box-shadow: 0 0 0 transparent;
		z-index: 4;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.fileTreeMenu.is-open {
		transform: translateX(0);
		box-shadow: 0.75rem 0 2rem rgba(0, 0, 0, 0.18);
	}

	.treeTitle {
		font-family: var(--font-2), sans-serif;
		font-size: 0.8rem;
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
		font-family: "IBM Plex Sans", monospace;
		font-size: 0.95rem;
		line-height: 1.35;
		padding: 0.45rem 0.9rem;
		padding-left: calc(0.9rem + (var(--depth) * 0.95rem));
		color: var(--black);
		white-space: nowrap;
	}

	.treeRow--folder {
		font-weight: 700;
	}

	.treeRow--file {
		font-weight: 500;
	}

	a.treeRow {
		text-decoration: none;
	}

	a.treeRow:hover {
		background-color: color-mix(in srgb, var(--accent), white 82%);
	}

	a.treeRow.is-active {
		background-color: color-mix(in srgb, var(--accent), white 72%);
		color: color-mix(in srgb, var(--accent), black 28%);
		font-weight: 700;
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

	.gridMenuButton {
		grid-column: 2 / 3;
		grid-row: 3 / 4;
		height: 100%;
	}

	.menuButtonContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		padding: 1rem;
	}

	.gridMenu,
	.gridCenterCell {
		min-width: 0;
		min-height: 0;
	}

	.brandContainer {
		grid-column: 2 / 3;
		grid-row: 1 / 2;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.75rem;
		justify-content: center;
	}

	.brandContainer p {
		font-size: 0.875rem;
		margin: 0;
		color: var(--black);
		font-weight: 400;
	}

	.brandContainer .monogram {
		width: 1.75rem;
		aspect-ratio: 1 / 1;
	}

	.menuButton {
		cursor: pointer;
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--black);

		padding: 1.1rem 1.25rem;
		width: clamp(18rem, 18vw, 30rem);

		background-color: var(--white);
		border: 2px solid var(--black);

		box-shadow: 0 4px 0 4px var(--black);
		transform: translateY(-4px);
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;
	}

	.menuButton[aria-pressed="true"] {
		border-color: var(--accent);
		box-shadow: 0 4px 0 4px var(--accent);
	}

	.menuButton:hover {
		transform: translateY(-12px);
		box-shadow: 0 10px var(--accent);
		border-color: var(--accent);
		box-shadow: 0 12px 0 4px var(--accent);
	}

	.menuButton:active {
		transition:
			transform 0.042s ease,
			box-shadow 0.042s ease;
		box-shadow: 0 0 var(--accent);
		border-color: var(--accent);
		transform: translateY(0);
	}

	.buttonContent {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.buttonContent img {
		width: 1.75rem;
	}

	/* Tablet */
	@media (max-width: 1200px) {
		.grid {
			grid-template-columns: 1.5rem minmax(0, 1fr) 1.5rem;
			grid-template-rows: 3.5rem minmax(0, 1fr) auto;
		}

		.gridMenuButton {
			grid-column: 2 / 3;
			grid-row: 3 / 4;
			width: 100%;
		}

		.menuButtonContainer {
			padding: 0.75rem;
			gap: 0.75rem;
		}

		.menuButton {
			width: 100%;
			font-size: 1.05rem;
			padding: 0.95rem 0.9rem;

			transform: translateY(-2px);
			box-shadow: 0 3px 0 3px var(--black);
		}

		.menuButton:hover {
			transform: translateY(-4px);
			box-shadow: 0 6px 0 3px var(--accent);
		}

		.buttonContent {
			justify-content: center;
			width: 100%;
		}

		.buttonContent img {
			width: 1.4rem;
		}

		.centerContent {
			padding: 1rem;
		}
	}

	/* Phone */
	@media (max-width: 600px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: 3rem minmax(0, 1fr) auto;
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

		.gridMenuButton {
			grid-column: 1 / 2;
		}

		.brandContainer {
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

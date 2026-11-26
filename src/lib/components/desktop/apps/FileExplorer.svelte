<script lang="ts">
	import {
		root,
		getFolder,
		joinPath,
		parentPath,
		breadcrumbs,
		fileIcon,
		folderIcon
	} from "#lib/desktop/fs.ts";
	import type { FolderNode, FsNode, WinProps } from "#lib/desktop/types.ts";
	import { getWindowManager } from "#lib/desktop/windows.svelte.ts";
	import { SvelteSet } from "svelte/reactivity";
	import FolderGlyph from "../FolderGlyph.svelte";
	import PdfGlyph from "../PdfGlyph.svelte";
	import AppGlyph from "../AppGlyph.svelte";
	import ImageGlyph from "../ImageGlyph.svelte";

	let { props, winId }: { props: WinProps; winId: string } = $props();

	const wm = getWindowManager();
	const path = $derived(getFolder(props.path ?? "") ? (props.path ?? "") : "");
	const folder = $derived(getFolder(path) ?? root);
	const crumbs = $derived(breadcrumbs(path));

	let sidebarOpen = $state(false);
	const expanded = new SvelteSet<string>(["", "work", "technical-writing"]);

	/** Image thumbnails that have finished loading; the rest show ImageGlyph instead. */
	const loadedThumbs = new SvelteSet<string>();

	/**
	 * Marks a thumbnail loaded. It may already be loaded (from cache or before hydration),
	 * so its load event can be missed; check `complete` as well.
	 */
	function trackLoad(src: string) {
		return (img: HTMLImageElement) => {
			const done = () => loadedThumbs.add(src);
			if (img.complete && img.naturalWidth) done();
			else img.addEventListener("load", done, { once: true });
		};
	}

	// Keep the folder you're in (and its parents) expanded in the sidebar.
	$effect(() => {
		for (const crumb of crumbs) expanded.add(crumb.path);
	});

	function navigate(to: string) {
		sidebarOpen = false;
		if (to === path) return;
		const win = wm.get(winId);
		if (win) win.props = { path: to };
	}

	/**
	 * Back goes up one folder toward the root (/home/ian), so it always leads home no matter
	 * which folder the window opened in.
	 */
	function back() {
		if (path) navigate(parentPath(path));
	}

	function activate(node: FsNode, nodePath: string) {
		if (node.kind === "folder") navigate(nodePath);
		else wm.openPath(nodePath);
	}

	function toggle(nodePath: string) {
		if (expanded.has(nodePath)) expanded.delete(nodePath);
		else expanded.add(nodePath);
	}

	function iconFor(node: FsNode) {
		return node.kind === "folder" ? folderIcon : fileIcon(node);
	}

	function countLabel(node: FolderNode) {
		const n = node.children.length;
		return `${n} item${n === 1 ? "" : "s"}`;
	}
</script>

{#snippet tree(node: FolderNode, nodePath: string)}
	{@const isOpen = expanded.has(nodePath)}
	<li role="treeitem" aria-expanded={isOpen} aria-selected={nodePath === path}>
		<div class="treeRow folder" class:current={nodePath === path} class:open={isOpen}>
			<button
				type="button"
				class="twisty"
				aria-label="{isOpen ? 'Collapse' : 'Expand'} {node.name}"
				onclick={() => toggle(nodePath)}
			>
				<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" /></svg>
			</button>
			<button
				type="button"
				class="treeLabel"
				title={node.name}
				onclick={() => navigate(nodePath)}
			>
				<img src={folderIcon} alt="" aria-hidden="true" />
				<span>{node.name}</span>
			</button>
		</div>
		{#if isOpen}
			<ul role="group" class="branch">
				{#each node.children as child (child.id)}
					{@const childPath = joinPath(nodePath, child.id)}
					{#if child.kind === "folder"}
						{@render tree(child, childPath)}
					{:else}
						<li role="treeitem" aria-selected="false">
							<div class="treeRow file">
								<span class="twisty" aria-hidden="true"></span>
								<button
									type="button"
									class="treeLabel"
									title={child.name}
									onclick={() => activate(child, childPath)}
								>
									<img src={iconFor(child)} alt="" aria-hidden="true" />
									<span>{child.name}</span>
								</button>
							</div>
						</li>
					{/if}
				{/each}
			</ul>
		{/if}
	</li>
{/snippet}

<!-- Finder-style: the folder tree is a full-height column; the toolbar, files and
     status bar stack beside it. -->
<div class="explorer">
	<aside id="{winId}-sidebar" class="sidebar" class:open={sidebarOpen}>
		<div class="sidebarHeader">
			<p class="sidebarTitle">Folders</p>
			<!-- Narrow windows only: closes the slide-over folder tree. -->
			<button
				type="button"
				class="toolButton sidebarClose"
				aria-label="Close folders"
				title="Close folders"
				onclick={() => (sidebarOpen = false)}
			>
				<!-- The menu's three bars, with a left chevron cut into their right ends. -->
				<svg class="menuGlyph" viewBox="0 0 24 24" aria-hidden="true">
					<mask id="{winId}-close-mask">
						<rect width="24" height="24" fill="white" />
						<!-- Clears the bars inside the chevron's opening, too. -->
						<path d="M15.5 12 24 3.5V20.5Z" fill="black" />
						<path
							d="M21 6.5 15.5 12l5.5 5.5"
							fill="none"
							stroke="black"
							stroke-width="7"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</mask>
					<g mask="url(#{winId}-close-mask)">
						<rect x="2" y="4" width="20" height="3.2" rx="1.6" />
						<rect x="2" y="10.4" width="20" height="3.2" rx="1.6" />
						<rect x="2" y="16.8" width="20" height="3.2" rx="1.6" />
					</g>
					<path
						d="M21 6.5 15.5 12l5.5 5.5"
						fill="none"
						stroke="currentColor"
						stroke-width="3.2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
		<ul class="tree" role="tree" aria-label="All files">
			{@render tree(root, "")}
		</ul>
	</aside>

	<div class="content">
		<div class="toolbar">
			<button
				type="button"
				class="toolButton sidebarToggle"
				aria-expanded={sidebarOpen}
				aria-controls="{winId}-sidebar"
				onclick={() => (sidebarOpen = !sidebarOpen)}
			>
				<!-- Three rounded bars, filled like the window bar icons. -->
				<svg class="menuGlyph" viewBox="0 0 24 24" aria-hidden="true">
					<rect x="2" y="4" width="20" height="3.2" rx="1.6" />
					<rect x="2" y="10.4" width="20" height="3.2" rx="1.6" />
					<rect x="2" y="16.8" width="20" height="3.2" rx="1.6" />
				</svg>
				<span class="srOnly">Toggle folders</span>
			</button>
			<button
				type="button"
				class="toolButton"
				disabled={path === ""}
				onclick={back}
				aria-label="Back"
				title="Back"
			>
				<svg class="chevron" viewBox="0 0 16 16" aria-hidden="true">
					<path d="M10 3 5 8l5 5" />
				</svg>
			</button>
			<nav class="address" aria-label="Current folder">
				<!-- UNIX-style path: /home/ian/work/graphic-design, each segment clickable. -->
				{#each crumbs as crumb, i (crumb.path)}
					<span class="sep">/</span>
					<button
						type="button"
						class="crumb"
						title={crumb.folder.name}
						aria-label={crumb.folder.name}
						aria-current={crumb.path === path ? "location" : undefined}
						onclick={() => navigate(crumb.path)}
						>{i === 0 ? "home/ian" : crumb.folder.id}</button
					>
				{/each}
			</nav>
		</div>

		<ul class="pane" aria-label="Contents of {folder.name}">
			{#each folder.children as child (child.id)}
				{@const childPath = joinPath(path, child.id)}
				<li>
					<button
						type="button"
						class="item {child.kind}"
						title={child.kind === "pdf" && child.locked
							? "Password protected"
							: undefined}
						onclick={() => activate(child, childPath)}
					>
						{#if child.kind === "folder"}
							<FolderGlyph size="4.4rem" />
						{:else if child.kind === "image"}
							{@const loaded = child.src !== undefined && loadedThumbs.has(child.src)}
							<span class="thumb" class:loaded>
								<span class="placeholder"><ImageGlyph size="4.4rem" /></span>
								{#if child.src}
									<img
										src={child.src}
										alt=""
										loading="lazy"
										decoding="async"
										{@attach trackLoad(child.src)}
									/>
								{/if}
							</span>
						{:else if child.kind === "pdf"}
							<PdfGlyph size="4.4rem" locked={child.locked} />
						{:else if child.kind === "app"}
							<AppGlyph app={child.app} size="4.4rem" />
						{/if}
						<span class="itemName">{child.name}</span>
					</button>
				</li>
			{:else}
				<li class="empty">This folder is empty.</li>
			{/each}
		</ul>

		<div class="statusBar">
			<span>{countLabel(folder)}</span>
		</div>
	</div>
</div>

<style>
	.explorer {
		position: relative;
		display: grid;
		grid-template-columns: minmax(13rem, 17rem) minmax(0, 1fr);
		height: 100%;
		min-height: 0;
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body-sm);
		color: var(--black);
	}

	button {
		font: inherit;
		color: inherit;
		cursor: pointer;
	}

	button:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: 1px;
	}

	.toolbar {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.5rem;
		border-bottom: 2px solid var(--black);
		background: var(--backlight-2);
	}

	.toolButton {
		display: grid;
		place-items: center;
		min-width: 2rem;
		height: 1.9rem;
		padding: 0 0.4rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		font-weight: 700;
	}

	.toolButton:hover:not(:disabled) {
		background: var(--accent-2);
	}

	.toolButton:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.chevron {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2.25;
		stroke-linecap: square;
		stroke-linejoin: miter;
	}

	.menuGlyph {
		width: 1.2rem;
		height: 1.2rem;
		fill: currentColor;
	}

	.sidebarToggle,
	.sidebarClose {
		display: none;
	}

	.address {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 0;
		height: 1.9rem;
		padding: 0 0.5rem;
		box-sizing: border-box;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		overflow-x: auto;
		white-space: nowrap;
		scrollbar-width: none;
	}

	.sep {
		color: color-mix(in srgb, var(--black), white 45%);
	}

	.crumb {
		padding: 0.05rem 0.1rem;
		border: none;
		border-radius: 2px;
		background: transparent;
	}

	.crumb:hover {
		background: var(--accent-2);
	}

	.crumb[aria-current="location"] {
		font-weight: 700;
	}

	.content {
		min-width: 0;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}

	.sidebar {
		min-height: 0;
		overflow: auto;
		border-right: 2px solid var(--black);
		background: color-mix(in srgb, var(--backlight-2), white 45%);
	}

	.sidebarHeader {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.sidebarTitle {
		margin: 0;
		padding: 0.75rem 0.9rem 0.45rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: color-mix(in srgb, var(--black), white 30%);
	}

	/*
	 * Folder tree: rounded rows inset from the sidebar's edges. Clicking a row opens it;
	 * the chevron beside it is its own button that expands or collapses the folder.
	 */
	.tree {
		--row-h: 2.25rem;
		--twisty: 1.6rem;
		--row-pad: 0.25rem;
		--row-border: 2px;
		padding: 0 0.45rem 0.75rem;
	}

	.tree,
	.tree :global(ul) {
		margin: 0;
		list-style: none;
	}

	.tree :global(ul) {
		padding: 0;
	}

	/* Each open folder's contents hang off a guide line under its chevron. */
	.tree .branch {
		margin: 2px 0 0 calc(var(--row-border) + var(--row-pad) + var(--twisty) / 2 - 1px);
		padding-left: 0.3rem;
		border-left: 2px solid color-mix(in srgb, var(--black), transparent 85%);
	}

	.treeRow {
		display: flex;
		align-items: center;
		gap: 0.1rem;
		min-height: var(--row-h);
		margin-bottom: 2px;
		padding: 0 var(--row-pad);
		box-sizing: border-box;
		border: var(--row-border) solid transparent;
		border-radius: var(--radius-md);
		white-space: nowrap;
		transition: background 0.12s ease;
	}

	.treeRow:hover {
		background: color-mix(in srgb, var(--accent), white 82%);
	}

	.treeRow.current {
		border-color: var(--black);
		background: var(--accent-2);
		font-weight: 700;
	}

	.twisty {
		flex: 0 0 var(--twisty);
		display: grid;
		place-items: center;
		width: var(--twisty);
		height: var(--twisty);
		padding: 0;
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
	}

	button.twisty:hover {
		background: var(--glyph-mid);
	}

	.twisty svg {
		width: 0.95rem;
		height: 0.95rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2.25;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: transform 0.15s ease;
	}

	.treeRow.open .twisty svg {
		transform: rotate(90deg);
	}

	/* The label fills the rest of the row, so the whole row is clickable. */
	.treeLabel {
		flex: 1;
		align-self: stretch;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0 0.35rem 0 0.2rem;
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
		text-align: left;
	}

	.treeLabel span {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.treeLabel img {
		width: 1.25rem;
		height: 1.25rem;
		flex: 0 0 auto;
	}

	/* Touch screens get taller rows and a bigger chevron. */
	@media (pointer: coarse) {
		.tree {
			--row-h: 2.75rem;
			--twisty: 2rem;
		}
	}

	.pane {
		flex: 1;
		min-height: 0;
		overflow: auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
		align-content: start;
		gap: 0.5rem;
		margin: 0;
		padding: 0.9rem;
		list-style: none;
		background:
			radial-gradient(
					circle,
					color-mix(in srgb, var(--black), transparent 90%) 1px,
					transparent 1px
				)
				0 0 / 16px 16px,
			var(--white);
	}

	.item {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		padding: 0.6rem 0.35rem;
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		background: transparent;
		text-align: center;
	}

	.item:hover,
	.item:focus-visible {
		--glyph-light: var(--accent-2);
		--glyph-mid: color-mix(in srgb, var(--accent), white 45%);
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent), white 82%);
		outline: none;
	}

	/* ImageGlyph and the thumbnail share one cell; the thumbnail replaces it once loaded. */
	.thumb {
		display: grid;
		place-items: center;
		width: 4.4rem;
		height: 4.4rem;
	}

	.thumb > * {
		grid-area: 1 / 1;
	}

	.thumb img {
		box-sizing: border-box;
		width: 4rem;
		height: 4rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--off-white);
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.thumb.loaded img {
		opacity: 1;
	}

	/* Hidden only after the thumbnail has faded in over it. */
	.thumb.loaded .placeholder {
		visibility: hidden;
		transition: visibility 0s 0.2s;
	}

	.itemName {
		max-width: 100%;
		line-height: 1.3;
		overflow-wrap: anywhere;
	}

	.empty {
		grid-column: 1 / -1;
		margin: 2rem auto;
		color: color-mix(in srgb, var(--black), white 40%);
	}

	.statusBar {
		flex: 0 0 auto;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.3rem 0.75rem;
		border-top: 2px solid var(--black);
		background: var(--backlight-2);
		white-space: nowrap;
		overflow: hidden;
	}

	.srOnly {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}

	/* Narrow windows: the folder tree slides over the pane behind a toggle. */
	@container (max-width: 620px) {
		.sidebarToggle,
		.sidebarClose {
			display: grid;
		}

		/* Lines the close button up with the menu button in the toolbar beside it. */
		.sidebarHeader {
			padding: 0.4rem 0.5rem 0.25rem 0;
		}

		.sidebarHeader .sidebarTitle {
			padding: 0 0.9rem;
		}

		.explorer {
			grid-template-columns: minmax(0, 1fr);
		}

		.sidebar {
			position: absolute;
			inset: 0 auto 0 0;
			z-index: 2;
			width: min(18rem, 85%);
			transform: translateX(-102%);
			transition: transform 0.18s ease;
		}

		.sidebar.open {
			transform: none;
			box-shadow: 0.5rem 0 1.5rem rgba(0, 0, 0, 0.18);
		}
	}
</style>

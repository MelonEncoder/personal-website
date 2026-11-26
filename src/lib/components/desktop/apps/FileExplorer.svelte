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

	let { props, winId }: { props: WinProps; winId: string } = $props();

	const wm = getWindowManager();
	const path = $derived(getFolder(props.path ?? "") ? (props.path ?? "") : "");
	const folder = $derived(getFolder(path) ?? root);
	const crumbs = $derived(breadcrumbs(path));

	let sidebarOpen = $state(false);
	const expanded = new SvelteSet<string>(["", "work", "technical-writing"]);

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

{#snippet tree(node: FolderNode, nodePath: string, depth: number)}
	{@const isOpen = expanded.has(nodePath)}
	<li role="treeitem" aria-expanded={isOpen} aria-selected={nodePath === path}>
		<div class="treeRow folder" class:current={nodePath === path} style:--depth={depth}>
			<button
				type="button"
				class="twisty"
				aria-label="{isOpen ? 'Collapse' : 'Expand'} {node.name}"
				onclick={() => toggle(nodePath)}
			>
				{isOpen ? "▾" : "▸"}
			</button>
			<button type="button" class="treeLabel" onclick={() => navigate(nodePath)}>
				<img src={folderIcon} alt="" aria-hidden="true" />
				<span>{node.name}</span>
			</button>
		</div>
		{#if isOpen}
			<ul role="group">
				{#each node.children as child (child.id)}
					{@const childPath = joinPath(nodePath, child.id)}
					{#if child.kind === "folder"}
						{@render tree(child, childPath, depth + 1)}
					{:else}
						<li role="treeitem" aria-selected="false">
							<div class="treeRow file" style:--depth={depth + 1}>
								<span class="twisty spacer" aria-hidden="true"></span>
								<button
									type="button"
									class="treeLabel"
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
		<p class="sidebarTitle">Folders</p>
		<ul class="tree" role="tree" aria-label="All files">
			{@render tree(root, "", 0)}
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
				☰ <span class="srOnly">Toggle folders</span>
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
							<span class="thumb">
								<img src={child.src} alt="" loading="lazy" decoding="async" />
							</span>
						{:else if child.kind === "pdf"}
							<PdfGlyph size="4.4rem" locked={child.locked} />
						{:else}
							<span class="glyph">
								<img src={iconFor(child)} alt="" aria-hidden="true" />
							</span>
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
		grid-template-columns: minmax(12rem, 15rem) minmax(0, 1fr);
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

	.sidebarToggle {
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

	.sidebarTitle {
		margin: 0;
		padding: 0.6rem 0.75rem 0.4rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: color-mix(in srgb, var(--black), white 30%);
	}

	.tree,
	.tree :global(ul) {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.treeRow {
		--depth: 0;
		display: flex;
		align-items: center;
		padding-left: calc(0.35rem + var(--depth) * 0.9rem);
		white-space: nowrap;
	}

	.treeRow:hover {
		background: var(--accent-2);
	}

	.treeRow.current {
		background: color-mix(in srgb, var(--accent-2), var(--accent) 42%);
		font-weight: 700;
	}

	.twisty {
		flex: 0 0 1.1rem;
		width: 1.1rem;
		padding: 0;
		border: none;
		background: transparent;
		font-size: 0.75rem;
	}

	.treeLabel {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.3rem 0.5rem 0.3rem 0.15rem;
		border: none;
		background: transparent;
		text-align: left;
	}

	.treeLabel span {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.treeLabel img {
		width: 1rem;
		height: 1rem;
		flex: 0 0 auto;
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
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent), white 82%);
		outline: none;
	}

	.glyph,
	.thumb {
		position: relative;
		display: grid;
		place-items: center;
		width: 4rem;
		height: 4rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		box-shadow: 0 3px 0 0 var(--black);
		overflow: hidden;
	}

	.item.pdf:hover,
	.item.pdf:focus-visible {
		--page-fill: color-mix(in srgb, var(--accent), white 80%);
	}

	.item.folder:hover,
	.item.folder:focus-visible {
		--folder-back: color-mix(in srgb, var(--accent), white 35%);
		--folder-front: color-mix(in srgb, var(--accent), white 60%);
	}

	.glyph img {
		width: 2rem;
		height: 2rem;
	}

	.thumb {
		background: var(--off-white);
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
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
		.sidebarToggle {
			display: grid;
		}

		.explorer {
			grid-template-columns: minmax(0, 1fr);
		}

		.sidebar {
			position: absolute;
			inset: 0 auto 0 0;
			z-index: 2;
			width: min(16rem, 85%);
			transform: translateX(-102%);
			transition: transform 0.18s ease;
		}

		.sidebar.open {
			transform: none;
			box-shadow: 0.5rem 0 1.5rem rgba(0, 0, 0, 0.18);
		}
	}
</style>

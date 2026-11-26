<script lang="ts">
	import { getNode, fileIcon } from "#lib/desktop/fs.ts";
	import { getWindowManager } from "#lib/desktop/windows.svelte.ts";
	import FolderGlyph from "./FolderGlyph.svelte";
	import PdfGlyph from "./PdfGlyph.svelte";

	/**
	 * A file inside a content window, shown as a row like an Explorer item. Clicking it
	 * opens the file in its own window (PDFs and images in Preview).
	 */
	let { path }: { path: string } = $props();

	const wm = getWindowManager();
	const node = $derived(getNode(path));

	const kind = $derived.by(() => {
		switch (node?.kind) {
			case "pdf":
				return node.locked ? "PDF document · Password protected" : "PDF document";
			case "image":
				return "Image";
			case "folder":
				return "Folder";
			default:
				return "App";
		}
	});
</script>

{#if node}
	<button type="button" class="fileRow" onclick={() => wm.openPath(path)}>
		{#if node.kind === "pdf"}
			<PdfGlyph size="2.6rem" locked={node.locked} />
		{:else if node.kind === "folder"}
			<FolderGlyph size="2.6rem" />
		{:else}
			<span class="tile"><img src={fileIcon(node)} alt="" aria-hidden="true" /></span>
		{/if}
		<span class="text">
			<span class="name">{node.name}</span>
			<span class="kind">{kind}</span>
		</span>
		<span class="open" aria-hidden="true">Open</span>
	</button>
{/if}

<style>
	.fileRow {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		width: 100%;
		padding: 0.5rem 0.6rem;
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--black);
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body-sm);
		text-align: left;
		cursor: pointer;
	}

	/* Highlights like items in the Explorer. */
	.fileRow:hover,
	.fileRow:focus-visible {
		--page-fill: color-mix(in srgb, var(--accent), white 80%);
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent), white 82%);
		outline: none;
	}

	.tile {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 2.6rem;
		height: 2.6rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		box-shadow: 0 3px 0 0 var(--black);
	}

	.tile img {
		width: 1.4rem;
		height: 1.4rem;
	}

	.text {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	.name {
		font-size: var(--fs-body);
		font-weight: 700;
		overflow-wrap: anywhere;
	}

	.kind {
		color: color-mix(in srgb, var(--black), white 35%);
	}

	.open {
		flex: 0 0 auto;
		font-weight: 700;
		color: color-mix(in srgb, var(--black), white 45%);
	}

	.fileRow:hover .open,
	.fileRow:focus-visible .open {
		color: var(--accent);
	}
</style>

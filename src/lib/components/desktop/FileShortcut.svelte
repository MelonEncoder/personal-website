<script lang="ts">
	import { getNode } from "#lib/desktop/fs.ts";
	import { getWindowManager } from "#lib/desktop/windows.svelte.ts";
	import FolderGlyph from "./FolderGlyph.svelte";
	import PdfGlyph from "./PdfGlyph.svelte";
	import AppGlyph from "./AppGlyph.svelte";
	import ImageGlyph from "./ImageGlyph.svelte";

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
		{:else if node.kind === "app"}
			<AppGlyph app={node.app} size="2.6rem" />
		{:else}
			<ImageGlyph size="2.6rem" />
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
		--glyph-light: var(--accent-2);
		--glyph-mid: color-mix(in srgb, var(--accent), white 45%);
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent), white 82%);
		outline: none;
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

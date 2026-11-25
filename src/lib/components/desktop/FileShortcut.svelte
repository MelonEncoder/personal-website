<script lang="ts">
	import { getNode, fileIcon, folderIcon } from "$lib/desktop/fs";
	import { getWindowManager } from "$lib/desktop/windows.svelte";

	/** A clickable file inside a content window that opens the file in its own window. */
	let { path }: { path: string } = $props();

	const wm = getWindowManager();
	const node = $derived(getNode(path));
</script>

{#if node}
	<button type="button" class="fileShortcut" onclick={() => wm.openPath(path)}>
		<img src={node.kind === "folder" ? folderIcon : fileIcon(node)} alt="" aria-hidden="true" />
		<span class="name">{node.name}</span>
		{#if node.kind === "pdf"}<span class="badge">PDF</span>{/if}
	</button>
{/if}

<style>
	.fileShortcut {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 0.9rem;
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body);
		font-weight: 600;
		color: var(--black);
		background: var(--white);
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		box-shadow: 0 4px 0 0 var(--black);
		transform: translateY(-4px);
		cursor: pointer;
		transition: 0.12s ease;
	}

	.fileShortcut:hover {
		border-color: var(--accent);
		box-shadow: 0 4px 0 0 var(--accent);
		background-color: color-mix(in srgb, var(--accent), white 65%);
	}

	.fileShortcut:active {
		transform: translateY(0);
		box-shadow: 0 0 0 0 var(--accent);
	}

	.fileShortcut:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: 3px;
	}

	img {
		width: 1.5rem;
		height: 1.5rem;
	}

	.badge {
		font-size: 0.7rem;
		font-weight: 700;
		padding: 0.1rem 0.35rem;
		border: 1.5px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--accent-2);
	}
</style>

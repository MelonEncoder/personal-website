<script lang="ts">
	import { getWindowManager } from "#lib/desktop/windows.svelte.ts";
	import type { AppId } from "#lib/desktop/types.ts";
	import FolderGlyph from "./FolderGlyph.svelte";
	import AppGlyph from "./AppGlyph.svelte";

	const wm = getWindowManager();

	/** Apps get their own icon shape (My Computer is a File Explorer window); folders a folder. */
	type Icon =
		| { kind: "app"; label: string; app: AppId; action: () => void }
		| { kind: "folder"; label: string; action: () => void };

	const icons: Icon[] = [
		{
			kind: "app",
			label: "My Computer",
			app: "explorer",
			action: () => wm.open("explorer", { path: "" })
		},
		{ kind: "app", label: "About Me", app: "about", action: () => wm.open("about") },
		{ kind: "app", label: "Links", app: "links", action: () => wm.open("links") },
		{ kind: "folder", label: "Work", action: () => wm.open("explorer", { path: "work" }) },
		{
			kind: "folder",
			label: "Technical Writing",
			action: () => wm.open("explorer", { path: "technical-writing" })
		}
	];
</script>

<ul class="icons" aria-label="Desktop">
	{#each icons as item (item.label)}
		<li>
			<button type="button" class="icon {item.kind}" onclick={item.action}>
				{#if item.kind === "folder"}
					<FolderGlyph size="3.4rem" />
				{:else}
					<AppGlyph app={item.app} size="3.4rem" />
				{/if}
				<span class="label">{item.label}</span>
			</button>
		</li>
	{/each}
</ul>

<style>
	.icons {
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		bottom: 0.75rem;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-content: flex-start;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
		width: 6.25rem;
		padding: 0.45rem 0.25rem;
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--black);
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body-sm);
		font-weight: 600;
		text-align: center;
		cursor: pointer;
	}

	.label {
		padding: 0.05rem 0.3rem;
		line-height: 1.25;
		border-radius: 2px;
		background: color-mix(in srgb, var(--white), transparent 25%);
	}

	/* Same highlight as items in the File Explorer. */
	.icon:hover,
	.icon:focus-visible {
		--glyph-light: var(--accent-2);
		--glyph-mid: color-mix(in srgb, var(--accent), white 45%);
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent), white 82%);
		outline: none;
	}

	.icon:hover .label,
	.icon:focus-visible .label {
		background: transparent;
	}

	@media (max-width: 700px) {
		.icons {
			right: 0.75rem;
			bottom: auto;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
			justify-items: center;
		}

		.icon {
			width: 5.5rem;
		}
	}
</style>

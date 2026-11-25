<script lang="ts">
	import { getWindowManager } from "$lib/desktop/windows.svelte";
	import FolderGlyph from "./FolderGlyph.svelte";
	import infoIcon from "$lib/assets/icons/info.svg";
	import linkIcon from "$lib/assets/icons/link.svg";
	import computerIcon from "$lib/assets/icons/computer.svg";

	const wm = getWindowManager();

	/** Apps get a square tile with an icon; folders get a folder shape. */
	type Icon =
		| { kind: "app"; label: string; icon: string; action: () => void }
		| { kind: "folder"; label: string; action: () => void };

	const icons: Icon[] = [
		{
			kind: "app",
			label: "My Computer",
			icon: computerIcon,
			action: () => wm.open("explorer", { path: "" })
		},
		{ kind: "app", label: "About Me", icon: infoIcon, action: () => wm.open("about") },
		{ kind: "app", label: "Links", icon: linkIcon, action: () => wm.open("links") },
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
					<span class="glyph"><img src={item.icon} alt="" aria-hidden="true" /></span>
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

	/* Same footprint for app tiles and folders so labels line up. */
	.glyph {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		margin: 0.2rem 0;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		box-shadow: 0 3px 0 0 var(--black);
	}

	.glyph img {
		width: 1.75rem;
		height: 1.75rem;
	}

	.label {
		padding: 0.05rem 0.3rem;
		line-height: 1.25;
		border-radius: 2px;
		background: color-mix(in srgb, var(--white), transparent 25%);
	}

	.icon.app:hover .glyph,
	.icon.app:focus-visible .glyph {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent), white 65%);
		box-shadow: 0 3px 0 0 var(--accent);
	}

	.icon.folder:hover,
	.icon.folder:focus-visible {
		--folder-back: color-mix(in srgb, var(--accent), white 35%);
		--folder-front: color-mix(in srgb, var(--accent), white 60%);
	}

	.icon:focus-visible {
		outline: none;
	}

	.icon:focus-visible .label {
		background: var(--accent);
		color: var(--white);
	}

	.icon.app:active .glyph {
		transform: translateY(3px);
		box-shadow: none;
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

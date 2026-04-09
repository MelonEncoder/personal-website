<script lang="ts">
	import { resolve } from "$app/paths";
	import type { ResolvedPathname } from "$app/types";

	let {
		href,
		tag,
		title,
		icon,
		iconAlt = "",
		description
	}: {
		href: ResolvedPathname;
		tag: string;
		title: string;
		icon: string;
		iconAlt: string;
		description?: string;
	} = $props();
</script>

<a class="fileLink" href={resolve(href)}>
	<div class="folderButton" aria-hidden="true">
		<div class="folderTab">{tag ?? ""}</div>
		<div class="folderBody">
			<img class="folderIcon" src={icon} alt={iconAlt} aria-hidden="true" />
			<span class="folderTitle">{title}</span>
			{#if description}
				<span class="folderDesc">{description}</span>
			{/if}
		</div>
	</div>
</a>

<style>
	.fileLink {
		text-decoration: none;
		color: var(--black);
		display: block;
	}

	.fileLink:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: 4px;
	}

	.folderButton {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 2rem 1fr;
		box-sizing: border-box;
	}

	.folderTab {
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: start;
		padding: 0 1.5rem;
		border: 2px solid var(--black);
		border-bottom: 0;
		width: fit-content;
		border-top-left-radius: var(--radius-sm);
		border-top-right-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--backlight-3), white 30%);
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body);
		font-weight: 700;
		color: var(--black);
		transform: translateY(-4px);
		transition: 0.12s ease;
	}

	.folderBody {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		width: 100%;
		aspect-ratio: 4 / 2.5;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		border-top-left-radius: 0;
		background: color-mix(in srgb, var(--backlight-3), white 55%);
		box-shadow: 0 4px 0 0 var(--black);
		transform: translateY(-4px);
		transition: 0.12s ease;
		text-align: center;
	}

	.folderIcon {
		width: 2rem;
	}

	.folderTitle {
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-h3);
		font-weight: 700;
		letter-spacing: 0.02em;
		color: var(--black);
	}

	.folderDesc {
		font-size: var(--fs-body-sm);
		line-height: 1.5;
		color: var(--black);
	}

	.fileLink:hover .folderTab {
		border-color: var(--accent);
		background-color: color-mix(in srgb, var(--accent), white 50%);
	}

	.fileLink:hover .folderBody {
		border-color: var(--accent);
		background-color: color-mix(in srgb, var(--accent), white 65%);
		box-shadow: 0 4px 0 0 var(--accent);
	}

	.fileLink:active .folderTab,
	.fileLink:active .folderBody {
		transform: translateY(0);
		box-shadow: 0 0 0 0 var(--accent);
	}
</style>

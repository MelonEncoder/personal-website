<script lang="ts">
	import type { Snippet } from "svelte";
	import type { AppId } from "#lib/desktop/types.ts";
	import AppHeader from "./AppHeader.svelte";

	/**
	 * The shared frame for simple content apps (About Me, Links, the Technical Writing
	 * projects): a header strip over a white body, scrolling together so the header moves
	 * out of the way of long pages. Inside the body, use
	 * `<section class="section">`, `<h2 class="label">` and `<div class="prose">` for the
	 * standard section, label and paragraph styles.
	 */
	let {
		app,
		title,
		subtitle,
		children
	}: { app: AppId; title: string; subtitle?: string; children: Snippet } = $props();
</script>

<div class="app">
	<AppHeader {app} {title} {subtitle} />
	<div class="body">
		{@render children()}
	</div>
</div>

<style>
	/* The whole page scrolls, header included. */
	.app {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		overflow: auto;
		background: var(--white);
		color: var(--black);
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body-sm);
		scrollbar-color: var(--accent) transparent;
	}

	/* Grows to fill a short page, and to fit its content on a long one. */
	.body {
		flex: 1 0 auto;
		padding: 0.5rem 1.25rem 1.5rem;
	}

	.body :global(.section) {
		max-width: 46rem;
		padding-top: 1rem;
	}

	/* Small uppercase section labels, like the Explorer's "Folders". */
	.body :global(.label) {
		margin: 0 0 0.6rem;
		padding-bottom: 0.35rem;
		border-bottom: 1px solid color-mix(in srgb, var(--black), white 80%);
		font-size: var(--fs-body-sm);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: color-mix(in srgb, var(--black), white 30%);
	}

	.body :global(.prose p) {
		margin: 0 0 0.8rem;
		font-family: var(--font-body), sans-serif;
		font-size: var(--fs-body);
		line-height: 1.65;
	}

	.body :global(.prose p:last-child) {
		margin-bottom: 0;
	}
</style>

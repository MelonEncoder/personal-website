<script lang="ts">
	import type { Snippet } from "svelte";
	import AppHeader from "./AppHeader.svelte";

	/**
	 * The shared frame for simple content apps (About Me, Links, the Technical Writing
	 * projects): a header strip and a white scrolling body. Inside the body, use
	 * `<section class="section">`, `<h2 class="label">` and `<div class="prose">` for the
	 * standard section, label and paragraph styles.
	 */
	let {
		icon,
		title,
		subtitle,
		children
	}: { icon: string; title: string; subtitle?: string; children: Snippet } = $props();
</script>

<div class="app">
	<AppHeader {icon} {title} {subtitle} />
	<div class="body">
		{@render children()}
	</div>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		color: var(--black);
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body-sm);
	}

	.body {
		flex: 1;
		min-height: 0;
		overflow: auto;
		padding: 0.5rem 1.25rem 1.5rem;
		background: var(--white);
		scrollbar-color: var(--accent) transparent;
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

<script lang="ts">
	import monogram from "$lib/assets/brand/monogram.svg";
	import type { Snippet } from "svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	let {
		title,
		children,
		showHeader = true
	}: { title?: string; children: Snippet; showHeader?: boolean } = $props();
</script>

<div class="page">
	<div class="grid">
		<div class="gridTop">
			{#if showHeader}
				<header class="gridHeader">
					<button class="backBtn" type="button" onclick={() => goto(resolve("/"))}
						>←</button
					>
					{#if title}
						<span class="pageTitle">{title}</span>
					{/if}
				</header>
			{/if}
		</div>

		<div class="gridColumnLeft"></div>
		<div class="gridColumnRight"></div>

		<div class="gridCenterCell">
			{@render children?.()}
		</div>

		<div class="gridBottomRow"></div>
	</div>
</div>

<style>
	.page {
		min-height: 100dvh;
		width: 100%;
		background-color: var(--white);
		position: relative;
		overflow: hidden; /* keep the page "one screen" */
	}

	.page::before {
		content: "";
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.18;
		background-image:
			linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
		background-size: 24px 24px;
	}

	.grid {
		position: relative;
		z-index: 1;
		display: grid;
		height: 100dvh; /* lock to screen */
		width: 100%;
		grid-template-columns: 4rem minmax(0, 1fr) 4rem;
		grid-template-rows: 4rem 1fr 4rem;
	}

	.gridTop {
		grid-column: 1 / 4;
		grid-row: 1 / 2;
		display: grid;
		grid-template-columns: 4rem auto 4rem;
		border-bottom: 2px solid var(--black);
	}

	.gridHeader {
		grid-column: 2 / 3;

		/* layout */
		display: grid;
		grid-template-columns: 5rem 1fr 5rem;
		align-items: center;

		width: 100%;

		/* sit above the rule layer */
		position: relative;
		z-index: 2;
	}

	.gridHeader button {
		margin-left: 1rem;
	}

	.pageTitle {
		text-align: center;
	}

	.backBtn {
		all: unset;
		cursor: pointer;

		display: inline-flex;
		align-items: center;
		justify-content: center;

		width: 2.25rem;
		height: 2.25rem;

		border: 2px solid var(--black);
		background-color: var(--white);

		font-size: 1.1rem;
		font-weight: 800;
		line-height: 1;

		transform: translateY(-3px);
		box-shadow: 0 3px var(--black);

		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;
	}

	.backBtn:hover {
		transform: translateY(-6px);
		box-shadow: 0 6px var(--accent);
		border-color: var(--accent);
	}

	.backBtn:active {
		transform: translateY(0);
		box-shadow: 0 0 var(--accent);
		border-color: var(--accent);
	}

	.backBtn:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 2px var(--white),
			0 0 0 4px var(--accent);
	}
	.monogram {
		height: 2rem;
		width: 100%;
		aspect-ratio: 1 / 1;
	}

	.pageTitle {
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-size: 0.95rem;
	}

	.gridColumnLeft {
		grid-column: 1 / 2;
		grid-row: 1 / 4;
		border-right: 2px solid var(--black);
	}

	.gridColumnRight {
		grid-column: 3 / 4;
		grid-row: 1 / 4;
		border-left: 2px solid var(--black);
	}

	.gridCenterCell {
		grid-column: 2 / 3;
		grid-row: 2 / 3;

		padding: clamp(2rem, 4vw, 5rem);

		/* content can scroll within the "paper" if it overflows */
		overflow: auto;

		display: grid;
		align-content: start;
		gap: 1.75rem;
	}

	.gridBottomRow {
		grid-column: 1 / 4;
		grid-row: 3 / 4;
		border-top: 2px solid var(--black);
	}

	@media (max-width: 656px) {
		.grid {
			grid-template-columns: 2.75rem minmax(0, 1fr) 2.75rem;
		}
		.gridCenterCell {
			padding: 1.5rem;
		}
	}
</style>

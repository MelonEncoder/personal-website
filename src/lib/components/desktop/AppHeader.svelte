<script lang="ts">
	import type { AppId } from "#lib/desktop/types.ts";
	import AppGlyph from "./AppGlyph.svelte";

	/**
	 * The header strip at the top of simple apps (About Me, Links): the app's icon, a name
	 * and a one-line subtitle, styled like the Explorer and Preview toolbars.
	 */
	let { app, title, subtitle }: { app: AppId; title: string; subtitle?: string } = $props();
</script>

<header class="appHeader">
	<AppGlyph {app} size="3rem" />
	<div class="text">
		<h1 class="title">{title}</h1>
		{#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
	</div>
</header>

<style>
	.appHeader {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding: 0.9rem 1rem;
		border-bottom: 2px solid var(--black);
		background: var(--backlight-2);
		font-family: var(--font-mono), sans-serif;
		color: var(--black);
	}

	.text {
		min-width: 0;
	}

	.title {
		margin: 0;
		font-size: var(--fs-h3);
		font-weight: 700;
		line-height: 1.25;
	}

	.subtitle {
		margin: 0.15rem 0 0;
		font-size: var(--fs-body-sm);
		color: color-mix(in srgb, var(--black), white 35%);
	}
</style>

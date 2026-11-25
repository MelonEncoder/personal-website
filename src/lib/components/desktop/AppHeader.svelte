<script lang="ts">
	/**
	 * The header strip at the top of simple apps (About Me, Links): a square app tile, a name
	 * and a one-line subtitle, styled like the Explorer and Preview toolbars.
	 */
	let { icon, title, subtitle }: { icon: string; title: string; subtitle?: string } = $props();
</script>

<header class="appHeader">
	<span class="tile">
		<img src={icon} alt="" aria-hidden="true" />
	</span>
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

	/* Flat: no border or shadow, so it doesn't read as a button. */
	.tile {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 2.75rem;
		height: 2.75rem;
	}

	.tile img {
		width: 100%;
		height: 100%;
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

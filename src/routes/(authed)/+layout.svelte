<script lang="ts">
	import { page } from "$app/state";
	import favicon from "$lib/assets/brand/favicon.svg";
	import monogram from "$lib/assets/brand/monogram.svg";

	let { children } = $props();
	let embedded = $derived(page.url.searchParams.get('embed') === '1');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="page">
	{#if !embedded}
		<header class="header">
			<a href="/" class="homeLink" aria-label="Go home">
				<img class="monogram" src={monogram} alt="Ian Gillette monogram" />
			</a>
		</header>
	{/if}
	<main class="main">
		{@render children()}
	</main>
</div>

<style>
	.page {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		background-color: var(--off-white);
	}

	.header {
		display: flex;
		align-items: center;
		padding: 1rem 1.5rem;
		border-bottom: 2px solid var(--black);
		background-color: var(--white);
	}

	.homeLink {
		display: flex;
		align-items: center;
	}

	.monogram {
		width: 2rem;
		height: auto;
	}

	.main {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(1.5rem, 4vw, 3rem);
	}
</style>

<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap');
	:root {
		--black-1: rgb(33 33 35);
		--black-2: rgb(63 63 67);

		--white-1: rgb(251 250 245);
		--white-2: rgb(221 220 215);
	}

	:global(body) {
		font-family: 'Inter';
		min-height: 100vh;
		margin: 0;
		background-color: var(--white-1);
	}
	:global(h1) {
		font-family: 'Google Sans Code';
		font-size: 1.875rem;
		font-weight: bold;
		margin: 0;
		margin-bottom: 1rem;
	}
	:global(h2) {
		font-size: 1.25rem;
		font-weight: bold;
	}
	:global(h3) {
		font-size: 1rem;
		font-weight: normal;
		text-decoration: underline;
	}
	:global(p) {
		font-size: 1rem;
		font-weight: normal;
		margin: 0;
	}
</style>

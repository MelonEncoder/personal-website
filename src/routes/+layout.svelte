<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Cascadia+Mono:ital,wght@0,200..700;1,200..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
	:root {
		--black-1: rgb(33 33 35);

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
		font-family: 'Cascadia Mono';
	}
	:global(p) {
		font-family: 'Inter';
	}
</style>

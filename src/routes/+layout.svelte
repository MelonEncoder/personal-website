<script lang="ts">
	import favicon from "$lib/assets/brand/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<style>
	@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap");
	:root {
		/* Fonts */
		--font-1: "Inter";
		--font-2: "IBM Plex Sans";

		/* Colors */
		--black: rgb(33 33 35);
		--white: rgb(251 250 245);
		--accent: rgb(250, 73, 109);
		--backlight: rgb(210, 242, 219);
		--gradient: linear-gradient(45deg, var(--accent), var(--accent-2));

		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 16px;
	}

	:global(body) {
		font-family: var(--font-1), sans-serif, serif;
		margin: 0;
		background-color: var(--white);
	}
</style>

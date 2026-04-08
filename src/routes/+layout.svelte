<script lang="ts">
	let { children } = $props();
</script>

{@render children()}

<style>
	@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

	:global(:root) {
		/* Fonts */
		--font-title: "Press Start 2P";
		--font-body: "Inter";
		--font-mono: "IBM Plex Sans";

		/* Colors */
		--black: rgb(33 33 35);
		--white: rgb(248 248 248);
		--off-white: rgb(226 218 220);
		--accent: rgb(250, 73, 109);
		--accent-2: color-mix(in srgb, var(--accent), white 70%);
		--backlight: rgb(188, 235, 200);
		--backlight-2: rgb(235, 246, 255);
		--backlight-3: rgb(252, 201, 238);
		--gradient: linear-gradient(45deg, var(--accent), var(--accent-2));

		/* Font Sizes */
		--fs-title: clamp(2rem, 4vw, 2.6rem);
		--fs-h1: clamp(1.5rem, 2.2vw, 1.75rem);
		--fs-h2: clamp(1.7rem, 3vw, 2rem);
		--fs-h3: clamp(1.15rem, 1.6vw, 1.3rem);
		--fs-body: 1rem;
		--fs-body-sm: 0.825rem;

		/* Radius */
		--radius-sm: 0.25rem;
		--radius-md: 0.5rem;
		--radius-lg: 1rem;

		/* Constraints */
		--content-max-width: 1300px;
	}

	:global(body) {
		font-family: var(--font-body), sans-serif, serif;
		margin: 0;
		background-color: var(--white);
	}
</style>

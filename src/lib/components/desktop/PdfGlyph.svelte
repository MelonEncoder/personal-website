<script lang="ts">
	/**
	 * A page-shaped PDF icon in a square box, like FolderGlyph for folders. The page color
	 * comes from `--page-fill`, which parents set on hover. `locked` adds a padlock badge for
	 * password-protected files.
	 */
	let { size = "3rem", locked = false }: { size?: string; locked?: boolean } = $props();
</script>

<svg class="pdfGlyph" viewBox="0 0 64 64" style:width={size} style:height={size} aria-hidden="true">
	<!-- Hard drop shadow, matching the other icons. -->
	<path class="shadow" d="M14 5h25l13 13v40H14z" transform="translate(0 3)" />
	<!-- Page with a dog-eared corner. -->
	<path class="page" d="M14 5h25l13 13v40H14z" />
	<path class="fold" d="M39 5v13h13" />
	<!-- Text lines. -->
	<path class="lines" d="M20 14h13M20 20h26M20 49h26M20 54h18" />
	<!-- Label band that sticks out past the page edge. -->
	<rect class="band" x="7" y="27" width="40" height="16" rx="2" />
	<text class="label" x="27" y="39.5" text-anchor="middle">PDF</text>
	{#if locked}
		<!-- Padlock badge on the bottom-right corner, with the same hard shadow. -->
		<g class="lock">
			<rect class="shadow" x="39" y="47" width="22" height="16" rx="2" />
			<path class="shackle" d="M44 44v-4a6 6 0 0 1 12 0v4" />
			<rect class="lockBody" x="39" y="44" width="22" height="16" rx="2" />
			<path class="keyhole" d="M50 49.5v4.5" />
		</g>
	{/if}
</svg>

<style>
	.pdfGlyph {
		display: block;
		flex: 0 0 auto;
		overflow: visible;
	}

	.shadow {
		fill: var(--black);
	}

	.page {
		fill: var(--page-fill, var(--white));
		stroke: var(--black);
		stroke-width: 2.5;
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke;
		transition: fill 0.12s ease;
	}

	.fold {
		fill: color-mix(in srgb, var(--black), white 82%);
		stroke: var(--black);
		stroke-width: 2.5;
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke;
	}

	.lines {
		fill: none;
		stroke: color-mix(in srgb, var(--black), white 70%);
		stroke-width: 2.5;
		stroke-linecap: round;
	}

	.band {
		fill: var(--accent);
		stroke: var(--black);
		stroke-width: 2.5;
		vector-effect: non-scaling-stroke;
	}

	.label {
		fill: var(--white);
		font-family: var(--font-mono), sans-serif;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.06em;
	}

	.shackle {
		fill: none;
		stroke: var(--black);
		stroke-width: 3.5;
		stroke-linecap: round;
	}

	.lockBody {
		fill: var(--accent-2);
		stroke: var(--black);
		stroke-width: 2.5;
		vector-effect: non-scaling-stroke;
	}

	.keyhole {
		fill: none;
		stroke: var(--black);
		stroke-width: 3;
		stroke-linecap: round;
	}
</style>

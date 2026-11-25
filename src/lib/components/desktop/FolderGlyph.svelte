<script lang="ts">
	/**
	 * A folder-shaped icon in a square box, so folders read differently from the square app
	 * tiles. Colors come from `--folder-back` / `--folder-front`, which parents set on hover.
	 */
	let { size = "3rem" }: { size?: string } = $props();
</script>

<svg
	class="folderGlyph"
	viewBox="0 0 64 64"
	style:width={size}
	style:height={size}
	aria-hidden="true"
>
	<!-- Hard drop shadow, matching the 3px offset used by the app tiles. -->
	<path class="shadow" d="M3 15h20l5 5h33v38H3z" transform="translate(0 3)" />
	<!-- Back panel with the tab. -->
	<path class="back" d="M3 15a2 2 0 0 1 2-2h17.5l5 5H59a2 2 0 0 1 2 2v38H3z" />
	<!-- Front flap. -->
	<path class="front" d="M3 25h58v31a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
	<path class="shine" d="M8 30h48" />
</svg>

<style>
	.folderGlyph {
		display: block;
		flex: 0 0 auto;
		overflow: visible;
	}

	path {
		stroke: var(--black);
		stroke-width: 2.5;
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke;
		transition: fill 0.12s ease;
	}

	.shadow {
		fill: var(--black);
		stroke: none;
	}

	.back {
		fill: var(--folder-back, color-mix(in srgb, var(--backlight-3), var(--accent) 18%));
	}

	.front {
		fill: var(--folder-front, color-mix(in srgb, var(--backlight-3), white 35%));
	}

	.shine {
		fill: none;
		stroke: color-mix(in srgb, var(--white), transparent 30%);
		stroke-width: 2;
		stroke-linecap: round;
	}
</style>

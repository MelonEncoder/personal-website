<script lang="ts">
	/**
	 * A folder icon, in the same style and scale as AppGlyph. The two pinks come from
	 * `--glyph-light` / `--glyph-mid`, which parents set on hover.
	 */
	let { size = "3rem" }: { size?: string } = $props();
</script>

<!-- The 187×160 drawing, centered in a 250-unit square like the other glyphs. -->
<svg
	class="folderGlyph"
	viewBox="-31.5 -45 250 250"
	style:width={size}
	style:height={size}
	aria-hidden="true"
>
	<g transform="translate(-32.875 -307.125)">
		<g transform="matrix(0.873786,0,0,1,-32.15534,239.25)">
			<!-- Back panel with the tab. -->
			<path
				class="back"
				style:--r="1.066"
				d="M78,180L78,85.53C78,81.676 79.752,77.981 82.87,75.256C85.989,72.531 90.218,71 94.629,71C111.454,71 135,71 135,71L160,90L267.371,90C276.555,90 284,96.505 284,104.53C284,129.992 284,180 284,180L78,180Z"
			/>
			<!-- Front flap. -->
			<path
				class="front"
				transform="matrix(1,0,0,0.761194,0,23.134328)"
				style:--r="1.221"
				d="M268.895,87.843C272.901,87.843 276.743,89.67 279.576,92.922C282.409,96.174 284,100.584 284,105.183C284,138.308 284,210.349 284,244.794C284,249.857 282.248,254.712 279.13,258.292C276.011,261.871 271.782,263.882 267.371,263.882C228.736,263.882 133.264,263.882 94.629,263.882C90.218,263.882 85.989,261.871 82.87,258.292C79.752,254.712 78,249.857 78,244.794L78,107.549L135.447,107.549L160.726,87.843L268.895,87.843Z"
			/>
		</g>
	</g>
</svg>

<style>
	.folderGlyph {
		/* Same outline width as AppGlyph (set in the root layout). */
		--s: var(--glyph-stroke);
		display: block;
		flex: 0 0 auto;
		overflow: visible;
	}

	path {
		stroke: var(--black);
		stroke-width: calc(var(--s) * var(--r, 1));
		stroke-linejoin: round;
		transition: fill 0.12s ease;
	}

	.back {
		fill: var(--glyph-mid);
	}

	.front {
		fill: var(--glyph-light);
	}
</style>

<script lang="ts">
	/**
	 * A picture icon, in the same style and scale as AppGlyph. Image files show it while
	 * their thumbnail or full image is still loading. The frame and hills come
	 * from `--glyph-light` / `--glyph-mid`, which parents set on hover.
	 */
	let { size = "3rem" }: { size?: string } = $props();
</script>

<!-- The 206×206 drawing, centered in a 250-unit square like the other glyphs. -->
<svg
	class="imageGlyph"
	viewBox="-22 -22 250 250"
	style:width={size}
	style:height={size}
	aria-hidden="true"
>
	<g transform="translate(-1004.115 -463.972)">
		<g transform="matrix(0.98902,0,0,0.98902,12.156027,6.225065)" style:--r="1.011">
			<!-- Frame. -->
			<path
				class="frame"
				d="M1175.877,475.856C1188.166,475.856 1198.144,485.834 1198.144,498.123L1198.144,635.733C1198.144,648.023 1188.166,658 1175.877,658L1038.267,658C1025.977,658 1016,648.023 1016,635.733L1016,498.123C1016,485.834 1025.977,475.856 1038.267,475.856L1175.877,475.856Z"
			/>
			<!-- Sun. -->
			<circle class="sun" cx="1069.036" cy="527.5" r="30.036" />
			<!-- Hills, tucked into the frame's bottom corners. -->
			<path
				class="hills"
				d="M1198.144,589.629L1198.144,635.733C1198.144,648.023 1188.166,658 1175.877,658L1038.267,658C1031.405,658 1025.265,654.89 1021.179,650.004C1021.179,650.004 1057.415,600.609 1072.031,580.686C1073.434,578.773 1075.664,577.643 1078.036,577.643C1080.408,577.643 1082.638,578.773 1084.041,580.686C1092.193,591.798 1105.758,610.288 1105.758,610.288C1105.758,610.288 1138.265,559.296 1152.256,537.351C1153.624,535.205 1155.992,533.907 1158.536,533.907C1161.08,533.907 1163.448,535.205 1164.816,537.351C1175.985,554.871 1198.144,589.629 1198.144,589.629Z"
			/>
		</g>
	</g>
</svg>

<style>
	.imageGlyph {
		/* Same outline width as AppGlyph (set in the root layout). */
		--s: var(--glyph-stroke);
		display: block;
		flex: 0 0 auto;
		overflow: visible;
	}

	path,
	circle {
		stroke: var(--black);
		stroke-width: calc(var(--s) * var(--r, 1));
		stroke-linejoin: round;
		transition: fill 0.12s ease;
	}

	.frame {
		fill: var(--glyph-light);
	}

	.sun {
		fill: var(--accent);
	}

	.hills {
		fill: var(--glyph-mid);
	}
</style>

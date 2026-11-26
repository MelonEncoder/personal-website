<script lang="ts">
	import type { AppId } from "#lib/desktop/types.ts";

	/**
	 * The icon for each app, drawn in the same style as FolderGlyph and PdfGlyph: black
	 * outlines over two pinks, with hot pink and navy accents. The two pinks come from
	 * `--glyph-light` / `--glyph-mid`, which parents set on hover.
	 *
	 * Each shape keeps the coordinates it was drawn in and is centered in a 250-unit square
	 * by its viewBox, so every icon renders at the same scale and stroke weight.
	 */
	let { app, size = "3rem" }: { app: AppId; size?: string } = $props();

	/** Several apps share a shape: the three reflections are all documents. */
	const SHAPES: Record<AppId, string> = {
		explorer: "explorer",
		about: "badge",
		links: "chain",
		programming: "code",
		games: "gamepad",
		brochure: "document",
		instructions: "document",
		jobMaterials: "document",
		aboutSite: "monitor",
		preview: "picture"
	};

	/** The drawn size of each shape, used to center it in the square. */
	const BOUNDS: Record<string, [number, number]> = {
		explorer: [187, 179],
		badge: [206, 206],
		chain: [154, 204],
		code: [206, 206],
		gamepad: [206, 121],
		document: [164, 206],
		monitor: [250, 250],
		picture: [250, 250]
	};

	const shape = $derived(SHAPES[app]);
	const viewBox = $derived.by(() => {
		const [w, h] = BOUNDS[shape];
		return `${-(250 - w) / 2} ${-(250 - h) / 2} 250 250`;
	});
</script>

<svg class="appGlyph" {viewBox} style:width={size} style:height={size} aria-hidden="true">
	{#if shape === "explorer"}
		<!-- A folder with a house on it. -->
		<g transform="translate(-32.875 -56.875)">
			<g class="round" transform="translate(-42 -11)">
				<path
					class="mid"
					transform="matrix(0.873786,0,0,1,9.84466,0)"
					style:--r="1.066"
					d="M78,180L78,85.53C78,81.676 79.752,77.981 82.87,75.256C85.989,72.531 90.218,71 94.629,71C111.454,71 135,71 135,71L160,90L267.371,90C276.555,90 284,96.505 284,104.53C284,129.992 284,180 284,180L78,180Z"
				/>
				<path
					class="light"
					transform="matrix(0.873786,0,0,0.761194,9.84466,23.134328)"
					style:--r="1.221"
					d="M268.895,87.843C272.901,87.843 276.743,89.67 279.576,92.922C282.409,96.174 284,100.584 284,105.183C284,138.308 284,210.349 284,244.794C284,249.857 282.248,254.712 279.13,258.292C276.011,261.871 271.782,263.882 267.371,263.882C228.736,263.882 133.264,263.882 94.629,263.882C90.218,263.882 85.989,261.871 82.87,258.292C79.752,254.712 78,249.857 78,244.794L78,107.549L135.447,107.549L160.726,87.843L268.895,87.843Z"
				/>
			</g>
			<path
				class="hot"
				transform="translate(-13 -145)"
				d="M73.125,367.75L73.125,272L204.875,272L204.875,367.75L165.875,367.75L165.875,311L112.125,311L112.125,367.75L73.125,367.75Z"
			/>
		</g>
	{:else if shape === "badge"}
		<!-- An ID card with a portrait. -->
		<g transform="translate(-831.115 -95.115)">
			<path
				class="light"
				transform="matrix(1.512605,0,0,2.175227,-462.890756,-196.531722)"
				style:--r="0.534"
				d="M968.456,140C976.483,140 983,144.532 983,150.114L983,212.636C983,218.218 976.483,222.75 968.456,222.75L878.544,222.75C870.517,222.75 864,218.218 864,212.636L864,150.114C864,144.532 870.517,140 878.544,140L968.456,140Z"
			/>
			<circle
				class="hot"
				transform="matrix(2.071737,0,0,2.071737,-981.26285,-173.844204)"
				style:--r="0.483"
				cx="924.437"
				cy="167.937"
				r="19.437"
			/>
			<path
				class="hot"
				transform="matrix(4.055196,0,0,4.055196,-2814.846968,-387.849144)"
				style:--r="0.246"
				d="M905.095,166.004C906.067,156.182 914.362,148.5 924.437,148.5C934.519,148.5 942.818,156.192 943.782,166.022C943.019,166.431 942.148,166.663 941.224,166.663L907.687,166.663C906.748,166.663 905.865,166.424 905.095,166.004Z"
			/>
		</g>
	{:else if shape === "chain"}
		<!-- Two chain links. -->
		<g transform="translate(-522.827 -284.759)">
			<g transform="matrix(0.637561,-0.7704,0.7704,0.637561,-98.242538,630.320655)">
				<path
					class="mid"
					transform="matrix(1,0,0,0.985714,-176.25,274.385714)"
					d="M869.5,62C888.541,62 904,77.683 904,97C904,116.317 888.541,132 869.5,132L807.5,132C788.459,132 773,116.317 773,97C773,77.683 788.459,62 807.5,62L869.5,62ZM865.355,79.099L810.645,79.099C800.906,79.099 793,87.12 793,97C793,106.88 800.906,114.901 810.645,114.901L865.355,114.901C875.094,114.901 883,106.88 883,97C883,87.12 875.094,79.099 865.355,79.099Z"
				/>
				<path
					class="hot"
					transform="matrix(1,0,0,0.985714,-235.75,298.885714)"
					d="M902.526,107.145C898.235,121.521 885.064,132 869.5,132L807.5,132C788.459,132 773,116.317 773,97C773,77.683 788.459,62 807.5,62L869.5,62C886.194,62 900.135,74.055 903.318,90.046L881.617,90.046C878.939,83.616 872.663,79.099 865.355,79.099L810.645,79.099C800.906,79.099 793,87.12 793,97C793,106.88 800.906,114.901 810.645,114.901L865.355,114.901C871.382,114.901 876.707,111.829 879.891,107.145L902.526,107.145Z"
				/>
			</g>
		</g>
	{:else if shape === "code"}
		<!-- A code window with a dark screen. -->
		<g transform="translate(-651.404 -483.656)">
			<path
				class="mid"
				transform="matrix(0.87078,0,0,1.232877,86.710182,-155.651449)"
				style:--r="0.938"
				d="M844.735,529C858.679,529 870,536.996 870,546.844L870,657.156C870,667.004 858.679,675 844.735,675L688.553,675C674.61,675 663.289,667.004 663.289,657.156L663.289,546.844C663.289,536.996 674.61,529 688.553,529L844.735,529Z"
			/>
			<path
				class="navy"
				transform="matrix(0.87078,0,0,1.02758,86.710182,-17.076167)"
				style:--r="1.05"
				d="M870,529L870,653.59C870,665.407 858.679,675 844.735,675L688.553,675C674.61,675 663.289,665.407 663.289,653.59L663.289,529L870,529Z"
			/>
			<path
				class="lineWhite round"
				transform="translate(-37 141.105731)"
				d="M773,415L726.996,461.004L771.834,505.843"
			/>
			<path
				class="lineWhite round"
				transform="matrix(-1,0,0,1,1544.995874,141.105731)"
				d="M773,415L726.996,461.004L771.834,505.843"
			/>
		</g>
	{:else if shape === "gamepad"}
		<!-- A game controller. -->
		<g transform="translate(-763.115 -465.156)">
			<path
				class="light"
				transform="matrix(1.065089,0,0,1.532605,-50.508876,-254.606445)"
				style:--r="0.758"
				d="M924.344,478.04C935.745,478.04 945,484.472 945,492.395L945,525.645C945,533.568 935.745,540 924.344,540L796.656,540C785.255,540 776,533.568 776,525.645L776,492.395C776,484.472 785.255,478.04 796.656,478.04L924.344,478.04Z"
			/>
			<path
				class="mid round"
				d="M815.204,537.046L799.5,537.046L799.5,513.994L815.204,513.994L815.204,498.29L838.256,498.29L838.256,513.994L853.96,513.994L853.96,537.046L838.256,537.046L838.256,552.75L815.204,552.75L815.204,537.046Z"
			/>
			<circle class="hot" cx="889.74" cy="512.03" r="13.74" />
			<circle class="hot" cx="922.49" cy="539.26" r="13.49" />
		</g>
	{:else if shape === "document"}
		<!-- A page with a folded corner and lines of text. -->
		<g transform="translate(-301.115 -33.615)">
			<g transform="matrix(1,0,0,0.944882,0,2.562992)" style:--r="1.027">
				<path
					class="light"
					d="M452,97.5L452,187.449L405,237L351,237L351,46.5L401,46.5L452,97.5Z"
				/>
				<path
					class="mid"
					d="M452,97.5L452,214.995C452,227.148 442.691,237 431.208,237L334.792,237C323.309,237 314,227.148 314,214.995C314,178.334 314,105.166 314,68.505C314,56.352 323.309,46.5 334.792,46.5C360.528,46.5 401,46.5 401,46.5L401,97.5L452,97.5Z"
				/>
			</g>
			<path
				class="line"
				d="M337.5,120L428.5,120M337.5,145.917L428.5,145.917M337.5,171.833L428.5,171.833M337.5,197.75L428.5,197.75"
			/>
		</g>
	{:else if shape === "monitor"}
		<!-- A computer monitor on a stand. -->
		<path class="light" d="M105,180L95,208L155,208L145,180Z" />
		<rect class="light" x="68" y="206" width="114" height="16" rx="8" />
		<rect class="mid" x="20" y="30" width="210" height="150" rx="20" />
		<rect class="navy" x="40" y="50" width="170" height="110" rx="8" />
		<path class="lineWhite" d="M62,82L82,100L62,118" />
		<path class="lineHot" d="M96,128L136,128" />
	{:else}
		<!-- A framed picture of a sun over hills. -->
		<rect class="mid" x="20" y="40" width="210" height="170" rx="20" />
		<rect class="light" x="40" y="60" width="170" height="130" rx="8" />
		<circle class="mid" cx="168" cy="96" r="16" />
		<path
			class="hot"
			d="M40,182L95,122L135,164L160,140L210,182A8,8 0 0 1 202,190L48,190A8,8 0 0 1 40,182Z"
		/>
	{/if}
</svg>

<style>
	.appGlyph {
		/* Outline width (set in the root layout). Each shape scales it by `--r` where it sits
		   inside a stretched group, so every outline renders at the same weight. */
		--s: var(--glyph-stroke);
		display: block;
		flex: 0 0 auto;
		overflow: visible;
		fill-rule: evenodd;
		stroke-linecap: round;
	}

	path,
	rect,
	circle {
		stroke: var(--black);
		stroke-width: calc(var(--s) * var(--r, 1));
		transition: fill 0.12s ease;
	}

	.round {
		stroke-linejoin: round;
	}

	.light {
		fill: var(--glyph-light);
	}

	.mid {
		fill: var(--glyph-mid);
	}

	.hot {
		fill: var(--accent);
	}

	.navy {
		fill: var(--desktop-bar);
	}

	.line,
	.lineWhite,
	.lineHot {
		fill: none;
	}

	.lineWhite {
		stroke: var(--white);
	}

	.lineHot {
		stroke: var(--accent);
	}
</style>

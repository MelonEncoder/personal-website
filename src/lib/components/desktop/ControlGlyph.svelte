<script lang="ts">
	/**
	 * The icons on a window's title bar buttons, drawn in `currentColor`. They're filled
	 * shapes, not strokes, so they render the same in every browser.
	 */
	let { kind }: { kind: "minimize" | "maximize" | "restore" | "close" } = $props();
</script>

<svg class="controlGlyph" viewBox="0 0 24 24" aria-hidden="true">
	{#if kind === "minimize"}
		<!-- A minus sign. -->
		<rect x="3" y="10.5" width="18" height="3" rx="1.5" />
	{:else if kind === "maximize"}
		<!-- A large outlined square with slightly rounded corners. -->
		<path
			fill-rule="evenodd"
			d="M7,2.5H17A4.5,4.5 0 0 1 21.5,7V17A4.5,4.5 0 0 1 17,21.5H7A4.5,4.5 0 0 1 2.5,17V7A4.5,4.5 0 0 1 7,2.5ZM7.5,5.5H16.5A2,2 0 0 1 18.5,7.5V16.5A2,2 0 0 1 16.5,18.5H7.5A2,2 0 0 1 5.5,16.5V7.5A2,2 0 0 1 7.5,5.5Z"
		/>
	{:else if kind === "restore"}
		<!-- A smaller solid rounded square, shown while the window is maximized. -->
		<rect x="6" y="6" width="12" height="12" rx="3" />
	{:else}
		<!-- An X made of two rounded bars. -->
		<rect x="0.5" y="10.5" width="23" height="3" rx="1.5" transform="rotate(45 12 12)" />
		<rect x="0.5" y="10.5" width="23" height="3" rx="1.5" transform="rotate(-45 12 12)" />
	{/if}
</svg>

<style>
	.controlGlyph {
		display: block;
		width: 24px;
		height: 24px;
		fill: currentColor;
	}
</style>

<script lang="ts">
	import { untrack } from "svelte";
	import Window from "./Window.svelte";
	import { getWindowManager } from "#lib/desktop/windows.svelte.ts";

	const wm = getWindowManager();

	$effect(() => {
		void wm.area.w;
		void wm.area.h;
		untrack(() => wm.clampToArea());
	});
</script>

<div class="windowLayer" bind:clientWidth={wm.area.w} bind:clientHeight={wm.area.h}>
	{#each wm.windows as win (win.id)}
		<Window {win} />
	{/each}
</div>

<style>
	/* Covers the desktop but lets clicks fall through to icons between windows. */
	.windowLayer {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.windowLayer > :global(.window) {
		pointer-events: auto;
	}
</style>

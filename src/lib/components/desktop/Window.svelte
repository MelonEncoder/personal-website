<script lang="ts">
	import { APPS } from "$lib/desktop/apps";
	import { getWindowManager, type Win } from "$lib/desktop/windows.svelte";

	let { win }: { win: Win } = $props();

	const wm = getWindowManager();
	const app = $derived(APPS[win.appId]);
	// Not shown in the bar (the top bar and taskbar already name the app), but still used
	// for screen readers and the button labels.
	const title = $derived(app.title(win.props));
	const isActive = $derived(wm.active?.id === win.id);
	const AppComponent = $derived(app.component);

	/** How much of a window must stay on screen while dragging. */
	const KEEP_VISIBLE = 96;
	const TITLE_H = 34;
	/** Matches the CSS min-width / min-height. */
	const MIN_W = 288;
	const MIN_H = 192;

	type Edge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
	const EDGES: Edge[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

	let drag: { dx: number; dy: number } | null = null;
	let resize: {
		edge: Edge;
		startX: number;
		startY: number;
		x: number;
		y: number;
		w: number;
		h: number;
	} | null = null;

	function isCompact() {
		return window.matchMedia("(max-width: 700px)").matches;
	}

	function clamp(value: number, min: number, max: number) {
		return Math.max(min, Math.min(value, max));
	}

	// Moving: drag the title bar.
	function onTitlePointerDown(event: PointerEvent) {
		if (event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
		if (isCompact()) return;
		drag = { dx: event.clientX - win.x, dy: event.clientY - win.y };
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		event.preventDefault();
	}

	function onTitlePointerMove(event: PointerEvent) {
		if (!drag) return;
		const { w, h } = wm.area;
		win.x = Math.round(clamp(event.clientX - drag.dx, KEEP_VISIBLE - win.w, w - KEEP_VISIBLE));
		win.y = Math.round(clamp(event.clientY - drag.dy, 0, h - TITLE_H));
	}

	function onTitleDoubleClick(event: MouseEvent) {
		if ((event.target as HTMLElement).closest("button") || isCompact()) return;
		wm.toggleZoom(win.id);
	}

	// Resizing: drag any edge or corner.
	function onResizePointerDown(edge: Edge, event: PointerEvent) {
		if (event.button !== 0 || isCompact()) return;
		resize = {
			edge,
			startX: event.clientX,
			startY: event.clientY,
			x: win.x,
			y: win.y,
			w: win.w,
			h: win.h
		};
		// Resizing a zoomed window makes this its new normal size.
		win.restore = undefined;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		event.preventDefault();
	}

	function onResizePointerMove(event: PointerEvent) {
		if (!resize) return;
		const { edge, startX, startY, x, y, w, h } = resize;
		const dx = event.clientX - startX;
		const dy = event.clientY - startY;
		const area = wm.area;

		if (edge.includes("e")) win.w = Math.round(clamp(w + dx, MIN_W, area.w - x));
		if (edge.includes("s")) win.h = Math.round(clamp(h + dy, MIN_H, area.h - y));
		if (edge.includes("w")) {
			const left = Math.round(clamp(x + dx, 0, x + w - MIN_W));
			win.w = w + (x - left);
			win.x = left;
		}
		if (edge.includes("n")) {
			const top = Math.round(clamp(y + dy, 0, y + h - MIN_H));
			win.h = h + (y - top);
			win.y = top;
		}
	}

	function endPointer() {
		drag = null;
		resize = null;
	}
</script>

<div
	class="window"
	class:active={isActive}
	class:zoomed={win.restore !== undefined}
	hidden={win.minimized}
	role="dialog"
	aria-label={title}
	style:--x="{win.x}px"
	style:--y="{win.y}px"
	style:--w="{win.w}px"
	style:--h="{win.h}px"
	style:z-index={win.z}
	onpointerdowncapture={() => wm.focus(win.id)}
>
	<!-- The title bar is a pointer drag handle; its buttons are the keyboard controls. -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<header
		class="titleBar"
		onpointerdown={onTitlePointerDown}
		onpointermove={onTitlePointerMove}
		onpointerup={endPointer}
		onpointercancel={endPointer}
		ondblclick={onTitleDoubleClick}
	>
		<div class="controls">
			<button
				type="button"
				class="control"
				aria-label="Minimize {title}"
				onclick={() => wm.minimize(win.id)}
			>
				<span class="minimizeGlyph" aria-hidden="true"></span>
			</button>
			<button
				type="button"
				class="control"
				aria-label="Close {title}"
				onclick={() => wm.close(win.id)}
			>
				<span aria-hidden="true">✕</span>
			</button>
		</div>
	</header>
	<div class="body" class:padded={app.padded}>
		{#if app.padded}
			<div class="inner">
				<AppComponent props={win.props} winId={win.id} />
			</div>
		{:else}
			<AppComponent props={win.props} winId={win.id} />
		{/if}
	</div>

	<!-- Invisible grips along every edge and corner, for pointer resizing. -->
	{#each EDGES as edge (edge)}
		<div
			class="resize {edge}"
			aria-hidden="true"
			onpointerdown={(event) => onResizePointerDown(edge, event)}
			onpointermove={onResizePointerMove}
			onpointerup={endPointer}
			onpointercancel={endPointer}
		></div>
	{/each}
</div>

<style>
	.window {
		--inner-radius: calc(var(--radius-sm) - 2px);
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: var(--w);
		height: var(--h);
		min-width: 18rem;
		min-height: 12rem;
		max-width: 100%;
		max-height: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background: var(--white);
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		box-shadow: 6px 6px 0 0 color-mix(in srgb, var(--black), transparent 70%);
		animation: open 0.14s ease-out;
	}

	.window[hidden] {
		display: none;
	}

	.window.active {
		box-shadow: 6px 6px 0 0 var(--black);
	}

	.titleBar {
		flex: 0 0 auto;
		display: flex;
		justify-content: flex-end;
		height: 34px;
		box-sizing: border-box;
		border-bottom: 2px solid var(--black);
		border-radius: var(--inner-radius) var(--inner-radius) 0 0;
		overflow: hidden;
		background: color-mix(in srgb, var(--off-white), white 40%);
		cursor: grab;
		user-select: none;
		touch-action: none;
	}

	.titleBar:active {
		cursor: grabbing;
	}

	.window.active .titleBar {
		background: var(--accent-2);
	}

	/* Buttons fill the bar's full height and butt against the window edge and each other. */
	.controls {
		display: flex;
	}

	.control {
		display: grid;
		place-items: center;
		width: 36px;
		height: 100%;
		padding: 0;
		border: none;
		border-left: 2px solid var(--black);
		border-radius: 0;
		background: var(--white);
		color: var(--black);
		font-size: 0.7rem;
		font-weight: 700;
		line-height: 1;
		cursor: pointer;
	}

	.control:hover {
		background: var(--accent);
		color: var(--white);
	}

	.control:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: -4px;
	}

	.minimizeGlyph {
		display: block;
		width: 9px;
		height: 2px;
		margin-top: 7px;
		background: currentColor;
	}

	.body {
		flex: 1;
		min-height: 0;
		overflow: auto;
		overscroll-behavior: contain;
		container-type: inline-size;
		border-radius: 0 0 var(--inner-radius) var(--inner-radius);
		background: var(--backlight);
		scrollbar-color: var(--accent) transparent;
	}

	.body:not(.padded) {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background: var(--white);
	}

	.inner {
		max-width: var(--content-max-width);
		margin: 0 auto;
		padding: clamp(1rem, 3cqi, 2.25rem);
	}

	/* Resize grips straddle the border so they don't cover scrollbars. */
	.resize {
		position: absolute;
		z-index: 2;
		touch-action: none;
	}

	.n,
	.s {
		left: 10px;
		right: 10px;
		height: 8px;
		cursor: ns-resize;
	}

	.n {
		top: -5px;
	}

	.s {
		bottom: -5px;
	}

	.e,
	.w {
		top: 10px;
		bottom: 10px;
		width: 8px;
		cursor: ew-resize;
	}

	.e {
		right: -5px;
	}

	.w {
		left: -5px;
	}

	.ne,
	.nw,
	.se,
	.sw {
		width: 12px;
		height: 12px;
	}

	.ne {
		top: -5px;
		right: -5px;
		cursor: nesw-resize;
	}

	.sw {
		bottom: -5px;
		left: -5px;
		cursor: nesw-resize;
	}

	.nw {
		top: -5px;
		left: -5px;
		cursor: nwse-resize;
	}

	.se {
		bottom: -5px;
		right: -5px;
		cursor: nwse-resize;
	}

	@keyframes open {
		from {
			opacity: 0;
			transform: scale(0.96);
		}
	}

	/* Phones: windows fill the space between the top bar and taskbar. */
	@media (max-width: 700px) {
		.window {
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			min-width: 0;
			border-left: 0;
			border-right: 0;
			border-radius: 0;
			box-shadow: none;
		}

		.window.active {
			box-shadow: none;
		}

		.titleBar {
			cursor: default;
		}

		.resize {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.window {
			animation: none;
		}
	}
</style>

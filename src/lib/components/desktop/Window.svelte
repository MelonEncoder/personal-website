<script lang="ts">
	import { APPS } from "$lib/desktop/apps";
	import { getWindowManager, type Win } from "$lib/desktop/windows.svelte";

	let { win }: { win: Win } = $props();

	const wm = getWindowManager();
	const app = $derived(APPS[win.appId]);
	const title = $derived(app.title(win.props));
	const isActive = $derived(wm.active?.id === win.id);
	const AppComponent = $derived(app.component);

	/** How much of a window must stay on screen while dragging. */
	const KEEP_VISIBLE = 96;
	const TITLE_H = 34;

	let drag: { dx: number; dy: number } | null = null;

	function isCompact() {
		return window.matchMedia("(max-width: 700px)").matches;
	}

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
		win.x = Math.round(
			Math.min(Math.max(event.clientX - drag.dx, KEEP_VISIBLE - win.w), w - KEEP_VISIBLE)
		);
		win.y = Math.round(Math.min(Math.max(event.clientY - drag.dy, 0), h - TITLE_H));
	}

	function endDrag() {
		drag = null;
	}
</script>

<div
	class="window"
	class:active={isActive}
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
		onpointerup={endDrag}
		onpointercancel={endDrag}
		ondblclick={(event) => {
			if (!(event.target as HTMLElement).closest("button")) wm.minimize(win.id);
		}}
	>
		<img class="titleIcon" src={app.icon(win.props)} alt="" aria-hidden="true" />
		<h2 class="title">{title}</h2>
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
				class="control close"
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
</div>

<style>
	.window {
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
		overflow: hidden;
		resize: both;
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
		align-items: center;
		gap: 0.5rem;
		height: 34px;
		box-sizing: border-box;
		padding: 0 0.35rem 0 0.6rem;
		border-bottom: 2px solid var(--black);
		background: color-mix(in srgb, var(--off-white), white 40%);
		cursor: grab;
		user-select: none;
		touch-action: none;
	}

	.titleBar:active {
		cursor: grabbing;
	}

	.window.active .titleBar {
		background:
			repeating-linear-gradient(
				0deg,
				transparent 0 3px,
				color-mix(in srgb, var(--accent), transparent 82%) 3px 4px
			),
			var(--accent-2);
	}

	.titleIcon {
		width: 1.1rem;
		height: 1.1rem;
	}

	.title {
		flex: 1;
		min-width: 0;
		margin: 0;
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body-sm);
		font-weight: 700;
		color: var(--black);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.window:not(.active) .title {
		color: color-mix(in srgb, var(--black), white 40%);
	}

	.controls {
		display: flex;
		gap: 0.3rem;
	}

	.control {
		display: grid;
		place-items: center;
		width: 22px;
		height: 22px;
		padding: 0;
		border: 2px solid var(--black);
		border-radius: 2px;
		background: var(--white);
		color: var(--black);
		font-size: 0.7rem;
		font-weight: 700;
		line-height: 1;
		cursor: pointer;
	}

	.control:hover {
		background: var(--backlight-2);
	}

	.control.close:hover {
		background: var(--accent);
		color: var(--white);
	}

	.control:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: 1px;
	}

	.minimizeGlyph {
		display: block;
		width: 9px;
		height: 2px;
		margin-top: 6px;
		background: currentColor;
	}

	.body {
		flex: 1;
		min-height: 0;
		overflow: auto;
		overscroll-behavior: contain;
		container-type: inline-size;
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
			resize: none;
		}

		.window.active {
			box-shadow: none;
		}

		.titleBar {
			cursor: default;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.window {
			animation: none;
		}
	}
</style>

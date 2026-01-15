<script lang="ts">
	import type { Snippet } from "svelte";
	import { fly, fade } from "svelte/transition";
	import { cubicOut } from "svelte/easing";

	let {
		children,
		headerTitle,
		closeModal
	}: { children: Snippet; headerTitle: string; closeModal: () => void } = $props();

	/* -------- mobile detection -------- */
	let isMobile = $state(false);

	$effect(() => {
		if (typeof window === "undefined") return;

		const mq = window.matchMedia("(max-width: 700px)");
		const update = () => (isMobile = mq.matches);

		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	});

	/* -------- pointer-based dragging (desktop only) -------- */
	let dragging = $state(false);
	let x = $state(0);
	let y = $state(0);

	let pointerId: number | null = null;
	let startX = 0;
	let startY = 0;

	// simple per-window z-index bump
	let z = $state(10);

	function bringToFront() {
		// cheap “global” z counter shared via window — works fine for a small site
		if (typeof window === "undefined") return;
		const w = window as any;
		w.__winZ = (w.__winZ ?? 1000) + 1;
		z = w.__winZ;
	}

	function pointerDown(e: PointerEvent) {
		bringToFront();

		// Disable drag for mobile drawer
		if (isMobile) return;

		dragging = true;
		pointerId = e.pointerId;

		startX = e.clientX - x;
		startY = e.clientY - y;

		(e.currentTarget as HTMLElement).setPointerCapture(pointerId);
	}

	function pointerMove(e: PointerEvent) {
		if (!dragging || e.pointerId !== pointerId) return;

		x = e.clientX - startX;
		y = e.clientY - startY;
	}

	function pointerUp(e: PointerEvent) {
		if (e.pointerId !== pointerId) return;

		dragging = false;
		pointerId = null;

		(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
	}

	// optional: set a pleasant staggered default position so new windows don't perfectly overlap
	$effect(() => {
		if (typeof window === "undefined") return;
		// only once on mount-ish: if x,y still 0, nudge based on current z
		if (x === 0 && y === 0 && !isMobile) {
			const n = (z % 5) * 18; // tiny offset
			x = -80 + n;
			y = -60 + n;
		}
	});
</script>

{#if isMobile}
	<!-- MOBILE: drawer uses overlay/backdrop, but DOES NOT close on click -->
	<div class="mobileOverlay" role="presentation" transition:fade={{ duration: 140 }}>
		<div
			class="modalWindow drawer"
			role="dialog"
			aria-modal="true"
			style={`z-index:${z};`}
			in:fly={{ y: 40, duration: 260, easing: cubicOut }}
			out:fly={{ y: 40, duration: 220, easing: cubicOut }}
			onpointerdown={bringToFront}
		>
			<header class="modalHeader mobileHeader">
				<div class="headerInfo">
					<h1 class="headerTitle gradientText">{headerTitle}</h1>
				</div>

				<button class="closeBtn" onclick={closeModal} aria-label="Close modal">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
			</header>

			<div class="modalContent">
				{@render children?.()}
			</div>
		</div>
	</div>
{:else}
	<!-- DESKTOP: NO overlay, each modal is its own floating window -->
	<div
		class="modalWindow desktop"
		role="dialog"
		aria-modal="false"
		style={`--dx:${x}px; --dy:${y}px; z-index:${z};`}
		onpointerdown={bringToFront}
	>
		<header
			class="modalHeader"
			role="button"
			tabindex="-1"
			onpointerdown={pointerDown}
			onpointermove={pointerMove}
			onpointerup={pointerUp}
			onpointercancel={pointerUp}
		>
			<div class="headerInfo">
				<h1 class="headerTitle gradientText">{headerTitle}</h1>
			</div>

			<button class="closeBtn" onclick={closeModal} aria-label="Close modal">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</header>

		<div class="modalContent">
			{@render children?.()}
		</div>
	</div>
{/if}

<style>
	/* ---------- MOBILE overlay (visual only; does NOT close on click) ---------- */
	.mobileOverlay {
		position: fixed;
		inset: 0;
		width: 100dvw;
		height: 100dvh;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.22);
		display: grid;
		place-items: end center;
		pointer-events: none; /* allow interacting only with the drawer */
	}

	/* ---------- shared window styles ---------- */
	.modalWindow {
		background-color: var(--white);
		border: 2px solid var(--black);
		box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.25);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		will-change: transform;
		pointer-events: auto; /* re-enable interaction */
	}

	.modalHeader {
		display: flex;
		border-bottom: 2px solid var(--black);
		padding: 1rem 1.5rem;
		justify-content: space-between;
		align-items: center;
		user-select: none;
		background-color: var(--black);
	}

	.headerInfo {
		display: flex;
		flex-direction: row;
	}

	.headerTitle {
		font-size: 2.35rem;
		font-weight: 800;
		margin: 0;
		line-height: 1.2;
		text-align: left;
		text-transform: capitalize;
	}

	.gradientText {
		background: var(--gradient);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		-moz-background-clip: text;
		-moz-text-fill-color: transparent;
	}

	.closeBtn {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--white);
		border-radius: 4px;
		transition: all 0.2s;
	}

	.closeBtn:hover {
		background-color: var(--accent);
	}

	.modalContent {
		padding: 2rem;
		overflow: auto;
		flex: 1;
	}

	/* ---------- DESKTOP: floating window, draggable ---------- */
	.modalWindow.desktop {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy)));
		border-radius: 1rem;

		width: min(640px, calc(100dvw - 3rem));
		max-height: calc(100dvh - 3rem);
	}

	.modalWindow.desktop .modalHeader {
		cursor: move;
		touch-action: none; /* important for pointer dragging */
	}

	/* ---------- MOBILE: drawer ---------- */
	.modalWindow.drawer {
		width: 100dvw;
		max-height: 92dvh;

		border-left: none;
		border-right: none;
		border-bottom: none;

		border-radius: 1.25rem 1.25rem 0 0;
	}

	.modalWindow.drawer .modalContent {
		padding: 1.5rem;
	}

	.modalHeader.mobileHeader {
		cursor: default;
	}
</style>

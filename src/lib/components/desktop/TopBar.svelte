<script lang="ts">
	import { onMount } from "svelte";
	import monogram from "#lib/assets/brand/monogram-white.svg";
	import { APPS } from "#lib/desktop/apps.ts";
	import { getWindowManager } from "#lib/desktop/windows.svelte.ts";

	let { onlogout }: { onlogout: () => void } = $props();

	const wm = getWindowManager();
	let menuOpen = $state(false);

	// Filled in on the client only, so server and client HTML match.
	let time = $state("");
	let date = $state("");

	function tick() {
		const now = new Date();
		time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
		date = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
	}

	onMount(() => {
		tick();
		const timer = window.setInterval(tick, 15_000);
		return () => window.clearInterval(timer);
	});
	let menuRoot: HTMLDivElement | undefined = $state();

	const activeTitle = $derived.by(() => {
		const win = wm.active;
		return win ? APPS[win.appId].title(win.props).split(" — ")[0] : "Desktop";
	});

	type MenuItem = { label: string; action: () => void } | "separator";

	const items: MenuItem[] = [
		{ label: "About This Site", action: () => wm.open("aboutSite") },
		{ label: "About Ian", action: () => wm.open("about") },
		"separator",
		{ label: "File Explorer", action: () => wm.open("explorer", { path: "" }) },
		{ label: "Close All Windows", action: () => wm.closeAll() },
		"separator",
		{ label: "Log Out…", action: () => onlogout() }
	];

	function choose(action: () => void) {
		menuOpen = false;
		action();
	}

	function onWindowPointerDown(event: PointerEvent) {
		if (menuOpen && menuRoot && !menuRoot.contains(event.target as Node)) menuOpen = false;
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (menuOpen && event.key === "Escape") menuOpen = false;
	}
</script>

<svelte:window onpointerdown={onWindowPointerDown} onkeydown={onWindowKeydown} />

<header class="topBar">
	<div class="left">
		<div class="menuRoot" bind:this={menuRoot}>
			<button
				type="button"
				class="monogramButton"
				class:open={menuOpen}
				aria-haspopup="menu"
				aria-expanded={menuOpen}
				aria-controls="monogram-menu"
				aria-label="System menu"
				onclick={() => (menuOpen = !menuOpen)}
			>
				<img src={monogram} alt="" aria-hidden="true" />
			</button>
			{#if menuOpen}
				<ul id="monogram-menu" class="menu" role="menu">
					{#each items as item, i (i)}
						{#if item === "separator"}
							<li class="separator" role="separator"></li>
						{:else}
							<li role="none">
								<button
									type="button"
									role="menuitem"
									class="menuItem"
									onclick={() => choose(item.action)}
								>
									{item.label}
								</button>
							</li>
						{/if}
					{/each}
				</ul>
			{/if}
		</div>
		<span class="activeTitle">{activeTitle}</span>
	</div>
	<time class="clock" title={date}>{time}</time>
</header>

<style>
	.topBar {
		position: relative;
		z-index: 500;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: var(--topbar-h);
		padding: 0 0.5rem;
		box-sizing: border-box;
		background: var(--desktop-bar);
		border-bottom: 2px solid var(--black);
		font-family: var(--font-mono), sans-serif;
		color: var(--white);
		user-select: none;
	}

	.left {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-width: 0;
	}

	.menuRoot {
		position: relative;
		height: 100%;
	}

	.monogramButton {
		display: grid;
		place-items: center;
		height: calc(var(--topbar-h) - 2px);
		padding: 0 0.6rem;
		border: none;
		background: transparent;
		cursor: pointer;
	}

	.monogramButton img {
		width: 1.5rem;
		height: 1.5rem;
	}

	.monogramButton:hover,
	.monogramButton.open {
		background: color-mix(in srgb, var(--desktop-bar), white 18%);
	}

	.monogramButton:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: -3px;
	}

	.activeTitle {
		font-weight: 700;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.clock {
		font-weight: 700;
		padding-right: 0.5rem;
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}

	.menu {
		position: absolute;
		top: calc(100% + 2px);
		left: 0;
		min-width: 13rem;
		margin: 0;
		padding: 0.3rem 0;
		list-style: none;
		background: var(--white);
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		/* Same as an active window's shadow (Window.svelte). */
		box-shadow: 0 0 36px 2px color-mix(in srgb, var(--black), transparent 65%);
	}

	.menuItem {
		display: block;
		width: 100%;
		padding: 0.4rem 1rem;
		border: none;
		background: transparent;
		text-align: left;
		font: inherit;
		color: var(--black);
		cursor: pointer;
	}

	.menuItem:hover,
	.menuItem:focus-visible {
		background: var(--accent);
		color: var(--white);
		outline: none;
	}

	.separator {
		height: 0;
		margin: 0.3rem 0.5rem;
		border-top: 1px solid color-mix(in srgb, var(--black), white 70%);
	}
</style>

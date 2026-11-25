<script lang="ts">
	import { untrack } from "svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { resolve } from "$app/paths";
	import type { Path } from "$app/types";

	import favicon from "#lib/assets/brand/favicon.svg";
	import { APPS } from "#lib/desktop/apps.ts";
	import { clearBooted, markBooted } from "#lib/desktop/session.ts";
	import { WindowManager, normalizePath, setWindowManager } from "#lib/desktop/windows.svelte.ts";
	import BootScreen from "#lib/components/desktop/BootScreen.svelte";
	import TopBar from "#lib/components/desktop/TopBar.svelte";
	import Wallpaper from "#lib/components/desktop/Wallpaper.svelte";
	import DesktopIcons from "#lib/components/desktop/DesktopIcons.svelte";
	import WindowLayer from "#lib/components/desktop/WindowLayer.svelte";
	import Taskbar from "#lib/components/desktop/Taskbar.svelte";

	let { data, children } = $props();

	const wm = setWindowManager(new WindowManager(APPS));

	// The server knows from the session cookie whether to show the boot screen, so there is
	// no flash. After that, this component owns the state (log in / log out).
	let booted = $state(untrack(() => data.booted));

	// Open the deep-linked window right away so it is in the server-rendered HTML.
	wm.openRoute(page.url.pathname);

	// URL → window: back/forward and links open or focus the matching window.
	$effect(() => {
		const path = page.url.pathname;
		untrack(() => wm.openRoute(path));
	});

	// Window → URL: the address bar follows the focused window.
	$effect(() => {
		const route = wm.activeRoute;
		const hasActive = wm.active !== undefined;
		untrack(() => {
			const current = normalizePath(page.url.pathname);
			if (route) {
				if (route !== current) goto(resolve(route.slice(1) as Path), { reset: false });
			} else if (!hasActive && wm.windowForRoute(current)) {
				// The window for this URL was closed or minimized.
				goto(resolve(""), { reset: false });
			}
		});
	});

	const title = $derived.by(() => {
		const win = wm.active;
		const name = win ? APPS[win.appId].title(win.props) : undefined;
		return name ? `${name} · Ian Gillette` : "Ian Gillette · Portfolio";
	});

	function logIn() {
		markBooted();
		booted = true;
		// Undo any scroll a phone's keyboard left behind, so the bars line up with the screen.
		window.scrollTo(0, 0);
	}

	function logOut() {
		clearBooted();
		wm.closeAll();
		booted = false;
		goto(resolve(""));
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta
		name="description"
		content="Ian Gillette's portfolio: programming projects, video games, graphic design and technical writing."
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="os" inert={!booted}>
	<TopBar onlogout={logOut} />
	<main class="desktop">
		<Wallpaper />
		<DesktopIcons />
		<WindowLayer />
		<div class="routeLayer">
			{@render children()}
		</div>
	</main>
	<Taskbar />
</div>

{#if !booted}
	<BootScreen onenter={logIn} />
{/if}

<style>
	/* While the desktop is shown, the page itself never scrolls or rubber-bands. */
	:global(html:has(.os)),
	:global(body:has(.os)) {
		height: 100%;
		overflow: hidden;
		overscroll-behavior: none;
	}

	.os {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		/* The visible viewport on phones (between the browser's toolbars). */
		height: 100vh;
		height: 100dvh;
		display: grid;
		grid-template-rows: var(--topbar-h) minmax(0, 1fr) var(--taskbar-h);
		overflow: hidden;
		background: var(--backlight-2);
	}

	.desktop {
		position: relative;
		min-height: 0;
		overflow: hidden;
	}

	/* Route pages render nothing visible, except the error page. */
	.routeLayer {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.routeLayer > :global(*) {
		pointer-events: auto;
	}
</style>

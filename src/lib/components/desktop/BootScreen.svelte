<script lang="ts">
	import { onMount } from "svelte";
	import { SITE } from "#lib/site.ts";
	import { MONOGRAM_ASCII } from "#lib/desktop/monogram-ascii.ts";
	import ControlGlyph from "./ControlGlyph.svelte";

	/**
	 * The boot screen, drawn as a modern terminal window over the blurred desktop: a short
	 * fastfetch-style summary with the monogram, a two-line boot log, and a login prompt with
	 * a block cursor. Each key typed into the password shows as a `*`. A TUI-style button logs
	 * in for touch users; Enter does the same from the keyboard.
	 */

	/** Called once the exit animation has finished. */
	let { onenter }: { onenter: () => void } = $props();

	const USER = "guest";
	const HOST = SITE.osName.toLowerCase();
	const EXIT_MS = 320;

	type Segment = { text: string; tone?: "dim" | "ok" };

	const LOG: Segment[][] = [
		[
			{ text: "Loading display driver " },
			{ text: "....", tone: "dim" },
			{ text: " OK", tone: "ok" }
		],
		[
			{ text: "Mounting desktop " },
			{ text: "..........", tone: "dim" },
			{ text: " READY", tone: "ok" }
		]
	];

	/** The site's palette, shown like fastfetch's terminal color blocks. */
	const SWATCHES = [
		"--desktop-bar",
		"--accent",
		"--accent-2",
		"--backlight-3",
		"--backlight",
		"--backlight-2",
		"--off-white",
		"--white"
	];

	let visibleLines = $state(0);
	let typedUser = $state(0);
	let ready = $state(false);
	let exiting = $state(false);
	let password = $state("");
	let passwordInput: HTMLInputElement | undefined = $state();
	let focused = $state(false);
	let typing = $state(false);
	let typingTimer: number | undefined;

	// Filled in on the client; the server doesn't know the window size or the time.
	let resolution = $state("");
	let uptime = $state("");

	const info = $derived([
		["OS", `${SITE.osName} ${SITE.version}`],
		["Host", SITE.owner],
		["Resolution", resolution],
		["Uptime", uptime]
	]);

	const logDone = $derived(visibleLines >= LOG.length);

	function reducedMotion() {
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}

	/** "42 secs", "1 min, 5 secs", like fastfetch's uptime line. */
	function formatUptime(ms: number) {
		const total = Math.floor(ms / 1000);
		const mins = Math.floor(total / 60);
		const secs = total % 60;
		const secText = `${secs} sec${secs === 1 ? "" : "s"}`;
		return mins ? `${mins} min${mins === 1 ? "" : "s"}, ${secText}` : secText;
	}

	function enter() {
		if (exiting) return;
		exiting = true;
		// Close the on-screen keyboard so it can't leave the page shifted on phones.
		passwordInput?.blur();
		// The password does nothing yet; it is here for the future private area.
		password = "";
		window.setTimeout(onenter, reducedMotion() ? 0 : EXIT_MS);
	}

	function onWindowKeydown(event: KeyboardEvent) {
		// The form handles Enter inside the password field; this catches Enter anywhere else.
		if (event.key === "Enter" && event.target !== passwordInput && ready) {
			event.preventDefault();
			enter();
		}
	}

	/** Clicking or tapping anywhere on the terminal goes to the password line. */
	function focusPassword(event: MouseEvent) {
		if (!ready || exiting) return;
		if ((event.target as HTMLElement).closest("button")) return;
		passwordInput?.focus();
	}

	/** The cursor holds still while you type and goes back to blinking after a pause. */
	function onPasswordInput() {
		typing = true;
		window.clearTimeout(typingTimer);
		typingTimer = window.setTimeout(() => (typing = false), 600);
	}

	onMount(() => {
		const updateStats = () => {
			resolution = `${window.innerWidth}x${window.innerHeight}`;
			uptime = formatUptime(performance.now());
		};
		updateStats();
		const statsTimer = window.setInterval(updateStats, 1000);
		window.addEventListener("resize", updateStats);

		let cancelled = false;
		const sleep = (ms: number) => new Promise((done) => window.setTimeout(done, ms));

		if (reducedMotion()) {
			visibleLines = LOG.length;
			typedUser = USER.length;
			ready = true;
		} else {
			// Print the log, then type the user name at the login prompt.
			(async () => {
				for (let i = 0; i < LOG.length; i++) {
					await sleep(220);
					if (cancelled) return;
					visibleLines = i + 1;
				}
				await sleep(300);
				for (let i = 0; i < USER.length; i++) {
					await sleep(70);
					if (cancelled) return;
					typedUser = i + 1;
				}
				await sleep(200);
				if (!cancelled) ready = true;
			})();
		}

		return () => {
			cancelled = true;
			window.clearInterval(statsTimer);
			window.clearTimeout(typingTimer);
			window.removeEventListener("resize", updateStats);
		};
	});

	// Focus the password field for keyboard users, but not on touch screens: there it pops
	// up the on-screen keyboard, which can scroll the page and leave the desktop cut off.
	$effect(() => {
		if (ready && !window.matchMedia("(pointer: coarse)").matches) passwordInput?.focus();
	});
</script>

<svelte:window onkeydown={onWindowKeydown} />

{#snippet cursor(blink = true)}
	<span class="cursor" class:blink aria-hidden="true"></span>
{/snippet}

<div
	class="boot"
	class:exiting
	role="dialog"
	aria-modal="true"
	aria-label="Log in to {SITE.owner}'s desktop"
>
	<div class="window">
		<!-- Decorative title bar in the style of the desktop's windows; the controls do nothing. -->
		<div class="titlebar" aria-hidden="true">
			<span class="title">{USER}@{HOST}: ~</span>
			<span class="controls">
				<span class="control"><ControlGlyph kind="minimize" /></span>
				<span class="control"><ControlGlyph kind="maximize" /></span>
				<span class="control"><ControlGlyph kind="close" /></span>
			</span>
		</div>

		<!-- Mouse and touch convenience only: keyboard users already have the password field. -->
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<div class="terminal" onclick={focusPassword}>
			<section class="fetch" aria-label="System information">
				<pre class="logo" aria-hidden="true">{MONOGRAM_ASCII}</pre>
				<div class="info">
					<p>
						<span class="pink">{USER}</span>@<span class="mint">{HOST}</span>
					</p>
					<p class="dim" aria-hidden="true">
						{"─".repeat(USER.length + HOST.length + 1)}
					</p>
					{#each info as [key, value] (key)}
						<p><span class="pink">{key}</span>: {value}</p>
					{/each}
					<p class="swatches" aria-hidden="true">
						{#each SWATCHES as color (color)}
							<span class="swatch" style:background="var({color})"></span>
						{/each}
					</p>
				</div>
			</section>

			<div class="log" aria-live="polite">
				{#each LOG.slice(0, visibleLines) as line, i (i)}
					<p>
						{#each line as segment, j (j)}<span class="tone-{segment.tone}"
								>{segment.text}</span
							>{/each}
					</p>
				{/each}
				{#if !logDone}
					<p>{@render cursor()}</p>
				{/if}
			</div>

			{#if logDone}
				<form
					class="login"
					onsubmit={(event) => {
						event.preventDefault();
						enter();
					}}
				>
					<p>
						<span class="mint">user:</span>
						{USER.slice(0, typedUser)}{#if !ready}{@render cursor(false)}{/if}
					</p>
					{#if ready}
						<p class="passwordLine">
							<label class="mint" for="boot-password">pass:</label>
							{"*".repeat(password.length)}<span
								class="cursor"
								class:blink={focused && !typing}
								class:hollow={!focused}
								aria-hidden="true"
							></span>
							<!-- Invisible, over the whole line: typing lands here and shows as `*`s. -->
							<input
								id="boot-password"
								class="input"
								type="password"
								autocomplete="off"
								spellcheck="false"
								bind:value={password}
								bind:this={passwordInput}
								onfocus={() => (focused = true)}
								onblur={() => (focused = false)}
								oninput={onPasswordInput}
							/>
						</p>
						<div class="actions">
							<!-- A TUI-style button, big enough to tap. -->
							<button class="tuiButton" type="submit">Log in</button>
							<span class="keyHint" aria-hidden="true"
								>or press <kbd>Enter ↵</kbd></span
							>
						</div>
					{/if}
				</form>
			{/if}
		</div>
	</div>
</div>

<style>
	.boot {
		/* Terminal colors, from the site palette. */
		--term-bg: color-mix(in srgb, var(--boot-bg) 88%, transparent);
		--term-text: var(--white);
		--term-dim: color-mix(in srgb, var(--white), transparent 55%);
		--term-line: color-mix(in srgb, var(--white), transparent 90%);
		--term-pink: var(--accent);
		--term-mint: var(--backlight);

		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		/* The visible viewport on phones (between the browser's toolbars). */
		height: 100vh;
		height: 100dvh;
		z-index: 1000;
		display: grid;
		place-items: center;
		/* The desktop shows through, dimmed and blurred, behind the terminal window. */
		background: color-mix(in srgb, var(--boot-bg) 55%, transparent);
		backdrop-filter: blur(18px) saturate(1.2);
		-webkit-backdrop-filter: blur(18px) saturate(1.2);
		color: var(--term-text);
		font-family: var(--font-terminal), monospace;
		transition: opacity 0.32s ease;
	}

	.window {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: min(52rem, 100% - 2rem);
		max-height: calc(100% - 2rem);
		overflow: hidden;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--term-bg);
		box-shadow:
			0 30px 80px rgba(0, 0, 0, 0.55),
			0 0 0 1px rgba(0, 0, 0, 0.4);
		transition:
			transform 0.32s ease,
			opacity 0.32s ease;
	}

	/* Same as an active window's title bar on the desktop (Window.svelte). */
	.titlebar {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		box-sizing: border-box;
		border-bottom: 2px solid var(--black);
		background: var(--accent-2);
		font-family: var(--font-mono), sans-serif;
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--black);
		user-select: none;
	}

	.title {
		padding: 0 0.9rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	/* Square buttons that fill the bar's height and butt against each other. */
	.controls {
		display: flex;
		align-self: stretch;
	}

	.control {
		display: grid;
		place-items: center;
		width: 44px;
		border-left: 2px solid var(--black);
		background: var(--white);
	}

	.terminal {
		flex: 1 1 auto;
		min-height: 0;
		overflow: auto;
		display: flex;
		flex-direction: column;
		gap: 1.45em;
		padding: 1.25rem 1.5rem 1.5rem;
		/* Shrinks on short and on narrow screens so everything fits. */
		font-size: clamp(0.72rem, min(2vh, 3.4vw), 0.9rem);
		line-height: 1.45;
		cursor: text;
		scrollbar-color: var(--term-line) transparent;
	}

	.terminal p {
		margin: 0;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}

	/* Logo and info side by side, like fastfetch; stacked only if there's no room at all. */
	.fetch {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		column-gap: 3ch;
		row-gap: 1em;
	}

	/* The logo shrinks on narrow screens so the info still fits beside it. */
	.logo {
		margin: 0;
		font: inherit;
		font-size: min(1em, 2.4vw);
		line-height: 1.3;
		color: var(--term-text);
	}

	.terminal .swatches {
		display: flex;
		margin-top: 1em;
	}

	.swatch {
		width: 2.5ch;
		height: 1.1em;
	}

	.swatch:first-child {
		border-radius: 3px 0 0 3px;
	}

	.swatch:last-child {
		border-radius: 0 3px 3px 0;
	}

	.pink {
		color: var(--term-pink);
	}

	.mint,
	.tone-ok {
		color: var(--term-mint);
	}

	.dim,
	.tone-dim {
		color: var(--term-dim);
	}

	.login {
		display: flex;
		flex-direction: column;
	}

	/* The real input sits invisibly over the line, so a tap there opens the keyboard. */
	.passwordLine {
		position: relative;
	}

	.input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		opacity: 0;
		font: inherit;
		cursor: text;
	}

	/* A block one character wide, like a terminal's. Hollow while the field isn't focused. */
	.cursor {
		display: inline-block;
		width: 1ch;
		height: 1.2em;
		vertical-align: text-bottom;
		border-radius: 1px;
		background: var(--term-text);
	}

	.cursor.hollow {
		background: transparent;
		box-shadow: inset 0 0 0 1px var(--term-text);
	}

	.cursor.blink {
		animation: blink 1.06s steps(1) infinite;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75em 2ch;
		margin-top: 1.45em;
	}

	/* A solid block button, like the ones in modern TUI apps. */
	.tuiButton {
		min-height: 2.75rem;
		padding: 0 3ch;
		border: 0;
		border-radius: 4px;
		background: var(--term-pink);
		color: var(--boot-bg);
		font: inherit;
		font-weight: 700;
		cursor: pointer;
		transition: background-color 0.12s ease;
	}

	.tuiButton:hover {
		background: color-mix(in srgb, var(--term-pink), white 20%);
	}

	.tuiButton:focus-visible {
		outline: 1px solid var(--term-text);
		outline-offset: 3px;
	}

	.keyHint {
		color: var(--term-dim);
	}

	.keyHint kbd {
		font: inherit;
		padding: 0.1em 0.6ch;
		border: 1px solid var(--term-line);
		border-radius: 4px;
		color: var(--term-text);
	}

	/* Touch screens have no Enter key to hint at. */
	@media (pointer: coarse) {
		.keyHint {
			display: none;
		}
	}

	/* Phones: the terminal fills the screen, like a terminal app. */
	@media (max-width: 600px) {
		.window {
			width: 100%;
			max-height: 100%;
			height: 100%;
			border: 0;
			border-radius: 0;
			box-shadow: none;
		}

		.terminal {
			padding: 1rem;
		}
	}

	/* Closing: the window shrinks and fades, and the blur lifts off the desktop. */
	.boot.exiting {
		opacity: 0;
	}

	.boot.exiting .window {
		opacity: 0;
		transform: scale(0.96);
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.boot,
		.window {
			transition: none;
		}

		.cursor.blink {
			animation: none;
		}
	}
</style>

<script lang="ts">
	import { onMount } from "svelte";
	import monogram from "#lib/assets/brand/monogram-white.svg";
	import { SITE } from "#lib/site.ts";

	/** Called once the exit animation has finished. */
	let { onenter }: { onenter: () => void } = $props();

	const LOG = [
		`${SITE.biosName} v${SITE.version}`,
		`${SITE.copyright.short}`,
		"CPU: Curiosity Core @ 4.20 GHz ........ OK",
		"Memory test: 640K ...................... OK",
		"Detecting drives ....... /home/ian [WORK] [WRITING]",
		"Loading display driver: retro-crt.sys .. OK",
		"Mounting desktop environment ........... READY"
	];

	let visibleLines = $state(0);
	let ready = $state(false);
	let exiting = $state(false);
	let password = $state("");
	let passwordInput: HTMLInputElement | undefined = $state();

	function reducedMotion() {
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}

	function enter() {
		if (exiting) return;
		exiting = true;
		// Close the on-screen keyboard so it can't leave the page shifted on phones.
		passwordInput?.blur();
		// The password does nothing yet; it is here for the future private area.
		password = "";
		window.setTimeout(onenter, reducedMotion() ? 0 : 550);
	}

	function onWindowKeydown(event: KeyboardEvent) {
		// The form handles Enter inside the password field; this catches Enter anywhere else.
		if (event.key === "Enter" && event.target !== passwordInput && ready) {
			event.preventDefault();
			enter();
		}
	}

	onMount(() => {
		if (reducedMotion()) {
			visibleLines = LOG.length;
			ready = true;
			return;
		}
		const timer = window.setInterval(() => {
			visibleLines += 1;
			if (visibleLines >= LOG.length) {
				window.clearInterval(timer);
				ready = true;
			}
		}, 170);
		return () => window.clearInterval(timer);
	});

	// Focus the password field for keyboard users, but not on touch screens: there it pops
	// up the on-screen keyboard, which can scroll the page and leave the desktop cut off.
	$effect(() => {
		if (ready && !window.matchMedia("(pointer: coarse)").matches) passwordInput?.focus();
	});
</script>

<svelte:window onkeydown={onWindowKeydown} />

<div
	class="boot"
	class:exiting
	role="dialog"
	aria-modal="true"
	aria-label="Log in to {SITE.owner}'s desktop"
>
	<div class="screen">
		<pre class="log" aria-live="polite">{LOG.slice(0, visibleLines).join("\n")}</pre>

		<div class="login" class:ready>
			<header class="brand">
				<img class="monogram" src={monogram} alt="" aria-hidden="true" />
				<h1 class="name">{SITE.osName}<span class="cursor" aria-hidden="true">_</span></h1>
			</header>

			<form
				class="form"
				onsubmit={(event) => {
					event.preventDefault();
					enter();
				}}
			>
				<div class="field">
					<span class="label">login:</span>
					<span class="value">guest</span>
				</div>
				<div class="field">
					<label class="label" for="boot-password">password:</label>
					<input
						id="boot-password"
						class="input"
						type="password"
						autocomplete="off"
						spellcheck="false"
						placeholder="(optional)"
						bind:value={password}
						bind:this={passwordInput}
						tabindex={ready ? 0 : -1}
					/>
				</div>
				<button class="enter" type="submit" tabindex={ready ? 0 : -1}>
					[ Click to Enter ]
				</button>
				<p class="hint">or press <kbd>Enter</kbd></p>
			</form>
		</div>
	</div>
</div>

<style>
	.boot {
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
		background: var(--boot-bg);
		color: var(--white);
		font-family: var(--font-terminal), monospace;
		overflow: auto;
	}

	/* Scanlines + vignette, like the old screen bezel. */
	.boot::after {
		content: "";
		position: fixed;
		inset: 0;
		pointer-events: none;
		background:
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 2px,
				rgba(255, 255, 255, 0.035) 2px,
				rgba(255, 255, 255, 0.035) 3px
			),
			radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.6) 100%);
	}

	.screen {
		display: flex;
		flex-direction: column;
		gap: 2.25rem;
		width: min(40rem, 100% - 2rem);
		padding: 2rem 0;
	}

	.log {
		margin: 0;
		min-height: calc(6 * 1.6em);
		font-family: inherit;
		font-size: var(--fs-body-sm);
		line-height: 1.6;
		color: color-mix(in srgb, var(--white), transparent 40%);
		white-space: pre-wrap;
	}

	.login {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		opacity: 0;
		transform: translateY(6px);
		transition:
			opacity 0.35s ease,
			transform 0.35s ease;
	}

	.login.ready {
		opacity: 1;
		transform: none;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.monogram {
		width: clamp(3rem, 8vw, 4rem);
		height: auto;
	}

	.name {
		margin: 0;
		font-family: var(--font-title), monospace;
		font-size: clamp(1.1rem, 3.6vw, 1.75rem);
		line-height: 1.4;
		letter-spacing: 0.04em;
	}

	.cursor {
		color: var(--accent);
		animation: blink 0.9s steps(1) infinite;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		font-size: var(--fs-body);
	}

	.field {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
	}

	.label {
		min-width: 6.5rem;
		color: var(--accent);
	}

	.value {
		color: var(--white);
	}

	.input {
		flex: 1;
		min-width: 0;
		font: inherit;
		color: var(--white);
		caret-color: var(--accent);
		background: transparent;
		border: none;
		border-bottom: 1px dashed color-mix(in srgb, var(--white), transparent 60%);
		padding: 0.15rem 0;
		outline: none;
	}

	.input::placeholder {
		color: color-mix(in srgb, var(--white), transparent 70%);
	}

	.input:focus {
		border-bottom-color: var(--accent);
	}

	.enter {
		align-self: flex-start;
		margin-top: 0.75rem;
		font: inherit;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: var(--boot-bg);
		background: var(--white);
		border: 2px solid var(--white);
		padding: 0.6rem 1.1rem;
		cursor: pointer;
		transition:
			background-color 0.12s ease,
			border-color 0.12s ease,
			color 0.12s ease;
	}

	.enter:hover,
	.enter:focus-visible {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--white);
		outline: none;
	}

	.hint {
		margin: 0;
		font-size: var(--fs-body-sm);
		color: color-mix(in srgb, var(--white), transparent 45%);
	}

	kbd {
		font: inherit;
		padding: 0.05rem 0.4rem;
		border: 1px solid color-mix(in srgb, var(--white), transparent 55%);
		border-radius: var(--radius-sm);
	}

	/* CRT "power on": the screen collapses to a bright line, then reveals the desktop. */
	.boot.exiting {
		animation: crt-off 0.55s ease-in forwards;
	}

	@keyframes crt-off {
		0% {
			opacity: 1;
			transform: scale(1, 1);
			filter: brightness(1);
		}
		55% {
			opacity: 1;
			transform: scale(1, 0.004);
			filter: brightness(3);
		}
		100% {
			opacity: 0;
			transform: scale(0, 0.004);
			filter: brightness(3);
		}
	}

	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		50.01%,
		100% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.login,
		.boot.exiting {
			transition: none;
			animation: none;
		}
	}
</style>

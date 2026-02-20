<script lang="ts">
	import { onMount } from "svelte";
	import { resolve } from "$app/paths";

	import monogram from "$lib/assets/brand/monogram.svg";

	const INTRO_SEEN_KEY = "ian-portfolio-intro-seen";

	let progress = 0;
	let ready = false;
	let seenIntro = false;
	let rafId = 0;

	function easeOutCubic(t: number) {
		return 1 - Math.pow(1 - t, 3);
	}

	function completeIntro() {
		if (ready) return;
		progress = 100;
		ready = true;
		localStorage.setItem(INTRO_SEEN_KEY, "1");
	}

	function startSequence(durationMs: number) {
		cancelAnimationFrame(rafId);
		ready = false;
		progress = 0;
		const start = performance.now();

		const tick = (now: number) => {
			const elapsed = now - start;
			const t = Math.min(elapsed / durationMs, 1);
			progress = easeOutCubic(t) * 100;

			if (t < 1) {
				rafId = requestAnimationFrame(tick);
				return;
			}

			completeIntro();
		};

		rafId = requestAnimationFrame(tick);
	}

	function skipIntro() {
		cancelAnimationFrame(rafId);
		completeIntro();
	}

	onMount(() => {
		seenIntro = localStorage.getItem(INTRO_SEEN_KEY) === "1";
		startSequence(seenIntro ? 900 : 2400);

		return () => cancelAnimationFrame(rafId);
	});
</script>

<div class="homeContent">
	<section class="bootPanel">
		<header class="heroHeader">
			<img class="monogram" src={monogram} alt="Ian logo" />
			<div>
				<p class="label">Portfolio Bootloader</p>
				<h1>
					IAN
					<span class="cursor" aria-hidden="true">_</span>
				</h1>
			</div>
		</header>
		<div class="progressMeta">
			<span>{ready ? "System ready" : "Loading . . ."}</span>
			<span>{Math.round(progress)}%</span>
		</div>
		<div
			class="progressTrack"
			role="progressbar"
			aria-valuemin="0"
			aria-valuemax="100"
			aria-valuenow={Math.round(progress)}
		>
			<div class="progressFill" style={`width: ${progress}%;`}></div>
		</div>

		<div class="actions">
			{#if !ready}
				<button type="button" class="actionButton ghost" onclick={skipIntro}
					>Skip Intro</button
				>
			{/if}
			{#if ready}
				<a class="actionButton ghost" href={resolve("/about")}>About Me</a>
				<a class="actionButton primary" href={resolve("/work")}>My Work</a>
			{/if}
		</div>
	</section>
</div>

<style>
	.homeContent {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.bootPanel {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: min(880px, 100%);
		padding: clamp(1rem, 2.5vw, 1.8rem);
		background: color-mix(in srgb, var(--white), var(--backlight-2) 35%);
		border: 2px solid var(--black);
	}

	.heroHeader {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.monogram {
		width: clamp(62px, 10vw, 92px);
		height: auto;
	}

	.label {
		margin: 0;
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--black), white 35%);
	}

	h1 {
		margin: 0.2rem 0 0;
		font-family: var(--font-title), monospace;
		font-size: var(--fs-title);
		line-height: 1.35;
		text-transform: uppercase;
	}

	.cursor {
		display: inline-block;
		color: var(--accent);
		animation: blink 0.9s steps(1) infinite;
	}

	.progressTrack {
		height: 0.9rem;
		border: 2px solid var(--black);
		background: color-mix(in srgb, var(--white), var(--backlight-2) 45%);
		overflow: hidden;
	}

	.progressFill {
		height: 100%;
		background: linear-gradient(
			90deg,
			var(--accent),
			color-mix(in srgb, var(--accent), white 55%)
		);
		transition: width 0.09s linear;
	}

	.progressMeta {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body);
	}

	.previewGrid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.7rem;
	}

	.previewCard {
		padding: 0.8rem;
		border: 2px solid color-mix(in srgb, var(--black), white 35%);
		background: color-mix(in srgb, var(--white), var(--backlight) 70%);
		opacity: 0.65;
		transition:
			opacity 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.previewCard.is-loaded {
		opacity: 1;
		border-color: var(--accent);
		transform: translateY(-2px);
	}

	.cardLabel {
		margin: 0;
		font-weight: 700;
		font-size: var(--fs-body);
		text-transform: uppercase;
	}

	.cardExt {
		margin: 0.22rem 0 0;
		font-family: var(--font-title), monospace;
		font-size: var(--fs-body);
		letter-spacing: 0.04em;
		color: color-mix(in srgb, var(--black), white 28%);
	}

	.actions {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
		align-items: center;
		min-height: 2.9rem;
	}

	.actionButton {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.62rem 1rem;
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		border: 2px solid var(--black);
		box-shadow: 0 4px 0 0 var(--black);
		cursor: pointer;
		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease,
			border-color 0.12s ease,
			background-color 0.12s ease,
			color 0.12s ease;
	}

	.actionButton.primary {
		background: var(--accent);
		color: var(--white);
	}

	.actionButton.ghost {
		background: var(--primary);
		color: var(--black);
	}

	.actionButton:hover {
		transform: translateY(-2px);
		border-color: var(--accent);
		box-shadow: 0 6px 0 0 var(--accent);
	}

	.actionButton:active {
		transform: translateY(0);
		box-shadow: 0 2px 0 0 var(--accent);
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

	@media (max-width: 760px) {
		.previewGrid {
			grid-template-columns: 1fr;
		}

		.actions {
			justify-content: stretch;
			flex-wrap: wrap;
		}

		.actionButton {
			flex: 1 1 100%;
		}
	}
</style>

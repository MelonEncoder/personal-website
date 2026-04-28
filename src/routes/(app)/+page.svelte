<script lang="ts">
	import { onMount } from "svelte";
	import { resolve } from "$app/paths";
	import TextButton from "$lib/components/TextButton.svelte";

	import monogram from "$lib/assets/brand/monogram.svg";
	import { goto } from "$app/navigation";
	import Card from "$lib/components/Card.svelte";

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

	onMount(() => {
		seenIntro = localStorage.getItem(INTRO_SEEN_KEY) === "1";
		startSequence(seenIntro ? 900 : 2400);

		return () => cancelAnimationFrame(rafId);
	});
</script>

<div class="homeContent">
	<div class="bootPanel">
		<header class="heroHeader">
			<img class="monogram" src={monogram} alt="Ian logo" />
			<div class="headerText">
				<p class="label">PORTFOLIO BOOTLOADER v0.3</p>
				<h1 class="title">
					IAN GILLETTE
					<span class="cursor" aria-hidden="true">_</span>
				</h1>
			</div>
		</header>
		<div class="loadingProgress">
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
		</div>
		<div class="actions">
			{#if ready}
				<TextButton
					type="primary"
					text="About Me"
					onclick={() => {
						goto(resolve("/about"));
					}}
				/>
				<TextButton
					type="secondary"
					text="My Work"
					onclick={() => {
						goto(resolve("/work"));
					}}
				/>
				<TextButton
					type="secondary"
					text="Technical Writing"
					onclick={() => {
						goto(resolve("/technical-writing"));
					}}
				/>
			{/if}
		</div>
	</div>
	<Card>
		<h1 class="sectionHeading">Welcome!</h1>
		<p class="bodyText">
			This is my portfolio website that showcases who I am and what I have accomplished. The
			about me page talks about who I am and some of my skills and interests, the work pages
			hosts all of my personal projects, and the technical writing page showcases the projects
			I completed in my technical wriring class.
		</p>
	</Card>
</div>

<style>
	.homeContent {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-height: 100%;
		gap: 2rem;
	}

	.bootPanel {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		background-color: var(--white);
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		padding: clamp(1rem, 2.5vw, 1.8rem);
		width: 100%;
		box-sizing: border-box;
	}

	.heroHeader {
		display: flex;
		gap: clamp(1rem, 2.5vw, 1.8rem);
	}

	.headerText {
		height: 100%;
		align-items: baseline;
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
		color: color-mix(in srgb, var(--black), white 35%);
	}

	.title {
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

	.loadingProgress {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
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

	.actions {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
		align-items: center;
		min-height: 2.9rem;
	}

	.sectionHeading {
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-h2);
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: var(--black);
		line-height: 1.3;
		letter-spacing: 0.02em;
	}

	.bodyText {
		font-size: var(--fs-body);
		line-height: 1.7;
		margin: 0 0 1rem 0;
	}

	.bodyText:last-child {
		margin: 0;
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
		h1 {
			font-size: var(--fs-h2);
		}

		.actions {
			justify-content: stretch;
			flex-wrap: wrap;
		}
	}
</style>

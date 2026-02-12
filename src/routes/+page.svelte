<script>
	import monogram from "$lib/assets/brand/monogram.svg";
</script>

<div class="content">
	<img class="monogram" src={monogram} alt="monogram" />
	<div class="welcomeText">
		<h1 class="welcomeTitle">
			<span class="colorText">Ian</span>
		</h1>
		<p class="subText">software developer</p>
	</div>
	<button class="desktopButton">Broken</button>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		place-items: center;
		justify-content: center;
		height: 100%;
		gap: 2rem;
	}

	.monogram {
		width: clamp(96px, 10vw, 130px);
		aspect-ratio: 1 / 1;
	}

	.welcomeTitle {
		font-size: clamp(1.5rem, 8vw, 3rem);
		line-height: 1.05;
		margin: 0 0 0.5rem 0;
		letter-spacing: -0.02em;
		text-align: center;
	}

	.subText {
		font-size: 1rem;
		margin: 0;
		opacity: 0.9;
		text-align: center;
	}

	.colorText {
		color: var(--accent);
	}

	.desktopButton {
		font-family: "Chicago", "Geneva", "Courier New", monospace;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.65rem 1.6rem 0.6rem;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--backlight), white 25%) 0%,
			color-mix(in srgb, var(--backlight), var(--accent) 18%) 100%
		);
		color: var(--black);
		border: 2px solid var(--black);
		border-right-color: color-mix(in srgb, var(--accent), black 18%);
		border-bottom-color: color-mix(in srgb, var(--accent), black 18%);
		box-shadow:
			inset 2px 2px 0 color-mix(in srgb, var(--white), white 40%),
			inset -2px -2px 0 color-mix(in srgb, var(--accent), black 22%),
			3px 3px 0 var(--black),
			0 0 0 2px color-mix(in srgb, var(--accent), white 25%);
		cursor: pointer;
		image-rendering: pixelated;
		transition:
			transform 90ms steps(2, end),
			box-shadow 90ms steps(2, end),
			background 90ms steps(2, end);
	}

	.desktopButton:hover {
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--backlight), white 12%) 0%,
			color-mix(in srgb, var(--accent), var(--backlight) 40%) 100%
		);
		box-shadow:
			inset 2px 2px 0 color-mix(in srgb, var(--white), white 40%),
			inset -2px -2px 0 color-mix(in srgb, var(--accent), black 22%),
			3px 3px 0 var(--black),
			0 0 0 2px var(--accent);
	}

	.desktopButton:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: 4px;
	}

	.desktopButton:active {
		transform: translate(2px, 2px);
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--accent), var(--backlight) 40%) 0%,
			color-mix(in srgb, var(--accent), black 8%) 100%
		);
		box-shadow:
			inset -2px -2px 0 color-mix(in srgb, var(--white), white 30%),
			inset 2px 2px 0 color-mix(in srgb, var(--accent), black 32%),
			1px 1px 0 var(--black);
	}

	/* Tablet */
	@media (max-width: 1200px) {
		.welcomeTitle {
			margin: 0 0 0.25rem 0;
		}

		.subText {
			font-size: 0.95rem;
		}
	}
</style>

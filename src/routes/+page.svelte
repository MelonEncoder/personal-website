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
		font-family: var(--font-1), sans-serif;
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
		font-family: var(--font-1), sans-serif;
		font-size: 0.95rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.75rem 1.4rem;
		background: var(--primary);
		color: var(--black);
		border: 2px solid var(--black);
		box-shadow: 0 4px 0 0 var(--black);
		cursor: pointer;
		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease,
			border-color 0.12s ease,
			background-color 0.12s ease;
	}

	.desktopButton:hover {
		transform: translateY(-2px);
		background: color-mix(in srgb, var(--primary), var(--accent) 10%);
		border-color: var(--accent);
		box-shadow: 0 6px 0 0 var(--accent);
	}

	.desktopButton:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: 4px;
	}

	.desktopButton:active {
		transform: translateY(0);
		box-shadow: 0 2px 0 0 var(--accent);
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

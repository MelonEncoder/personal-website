<script>
	import monogram from "$lib/assets/brand/monogram.svg";
</script>

<div class="content">
	<img class="monogram" src={monogram} alt="monogram" />
	<div class="welcomeText">
		<h1 class="welcomeTitle">
			I'm <span class="colorText">Ian</span>
		</h1>
		<p class="subText">programmer & designer</p>
	</div>
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
		font-size: clamp(2.8rem, 8vw, 4.25rem);
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

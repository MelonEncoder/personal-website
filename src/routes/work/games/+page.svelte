<script lang="ts">
	import whiteButtonScreenshot from "$lib/assets/white-button-screenshot.png";
	import arrowOut from "$lib/assets/icons/arrow-outward.svg";

	interface GameProject {
		title: string;
		description: string;
		url: string;
		image: string;
	}

	const gamingProjects: GameProject[] = [
		{
			title: "White Button",
			description:
				"White Button was created during a week long game jam where the theme was 1-bit color palette. Your goal is to click all the buttons before the lava reaches you.",
			url: "https://karpoonz.itch.io/white-button",
			image: whiteButtonScreenshot
		}
	];
</script>

<div class="gamesContent">
	<section class="projectSection" id="videogameProjects">
		<h1 class="sectionHeading">Video Games</h1>
		<p class="introText">Playable prototypes and game jam projects.</p>
		<div class="gameGrid">
			{#each gamingProjects as game, i (i)}
				<div class="gameItem">
					<div class="gameImageFrame">
						<img src={game.image} alt="white button video game screenshot" />
					</div>
					<div class="gameInfo">
						<h2 class="title">
							<a href={game.url} rel="external noreferrer" target="_blank">
								{game.title}
							</a>
							<img src={arrowOut} alt="link icon" />
						</h2>
						<p class="sectionText">{game.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.gamesContent {
		font-family: var(--font-body), sans-serif;
		color: var(--black);
	}

	.sectionHeading {
		font-family: var(--font-title), monospace;
		font-size: var(--fs-4xl);
		font-weight: 700;
		margin: 0 0 1.25rem 0;
		color: var(--black);
		line-height: 1.3;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.introText {
		font-size: var(--fs-lg);
		line-height: 1.7;
		color: var(--black);
		margin: 0 0 1.5rem 0;
		font-weight: 400;
	}

	.sectionText {
		font-size: var(--fs-base);
		line-height: 1.7;
		color: color-mix(in srgb, var(--black), white 12%);
		margin: 0;
		font-weight: 400;
	}

	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.35rem;
		font-size: var(--fs-xl);
		font-weight: 600;
		margin: 0;
		color: var(--black);
	}

	.title a {
		color: var(--black);
		text-decoration: underline;
		transition: color 0.1s ease;
	}

	.title a:hover {
		color: var(--accent);
	}

	.gameGrid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}

	.gameItem {
		display: flex;
		flex-direction: column;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background-color: var(--primary);
		overflow: hidden;
		box-shadow: 0 4px 0 0 var(--black);
	}

	.gameImageFrame {
		display: block;
		width: 100%;
		border-bottom: 2px solid var(--black);
		overflow: hidden;
		aspect-ratio: 16 / 9;
		background: color-mix(in srgb, var(--black), white 92%);
	}

	.gameImageFrame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.gameInfo {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		gap: 0.75rem;
	}

	@media (max-width: 1200px) {
		.gameGrid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.sectionHeading {
			font-size: var(--fs-2xl);
		}

		.introText {
			font-size: var(--fs-base);
		}
	}
</style>

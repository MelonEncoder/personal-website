<script lang="ts">
	import WorkCard from "$lib/components/WorkCard.svelte";

	const BASE = "https://files.iangillette.net/public/video-games";

	const gamingProjects = [
		{
			title: "White Button",
			description:
				"White Button was created during a week long game jam where the theme was 1-bit color palette. Your goal is to click all the buttons before the lava reaches you.",
			href: "https://karpoonz.itch.io/white-button",
			image: `${BASE}/white-button-screenshot.png`,
			date: "2025"
		},
		{
			title: "Blacked Out",
			description:
				"Someone knocked you out and trapped you inside of a pitch black room. Your goal is to escape by using a flashlight and keys you find lying around in the environment.",
			href: "https://karpoonz.itch.io/blacked-out",
			image: `${BASE}/blacked-out.png`,
			date: "2024"
		}
	];
</script>

<div class="gamesContent">
	<section id="videogameProjects">
		<h1 class="sectionHeading">Video Games</h1>
		<div class="gameGrid">
			{#each gamingProjects as game (game.title)}
				<WorkCard
					title={game.title}
					description={game.description}
					href={game.href}
					image={game.image}
					imageAlt="{game.title} screenshot"
					date={game.date}
				/>
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
		font-size: var(--fs-h2);
		font-weight: 700;
		margin: 0 0 1.25rem 0;
		color: var(--black);
		line-height: 1.3;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.gameGrid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}

	@media (max-width: 1200px) {
		.gameGrid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.sectionHeading {
			font-size: var(--fs-h1);
		}
	}
</style>

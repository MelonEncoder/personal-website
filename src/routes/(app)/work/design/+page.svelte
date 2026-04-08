<script lang="ts">
	import WorkCard from "$lib/components/WorkCard.svelte";

	const BASE = "https://files.iangillette.net/public/digital-media";

	const artProjects = [
		{
			title: "National Geographic Magazine Cover",
			description:
				"Magazine cover utilizing layered photography and different typography hierarchies.",
			image: `${BASE}/magazine-cover.webp`,
			date: "2022"
		},
		{
			title: "The Queen's Gambit Movie Poster",
			description:
				"Movie poster inspired by the The Queen's Gambit that explores the contrast between the themes of chess master and substance abuse.",
			image: `${BASE}/the-queens-gambit-poster.webp`,
			date: "2023"
		},
		{
			title: "Personal Business Card",
			description: "Print-ready, vertically oriented business card.",
			image: `${BASE}/business-card.webp`,
			date: "2025"
		},
		{
			title: "Blackout Mountain",
			description: "Created this artwork to put on my climbing bag.",
			image: `${BASE}/mountain.webp`,
			date: "2025"
		},
		{
			title: "Flat Space",
			description: "Flat-illustration study focused on a space theme.",
			image: `${BASE}/flat-space.webp`,
			date: "2023"
		},
		{
			title: "Tea Party",
			description:
				"A royal figure bathing in red tea, celebrating their success. Created during a competition and selected as the winner.",
			image: `${BASE}/tea-party.webp`,
			date: "2023"
		},
		{
			title: "Robot Squared",
			description: "Concept art for a colorful, boxy robot.",
			image: `${BASE}/robot.webp`,
			date: "2023"
		},
		{
			title: "Jibi Ramen Branding",
			description: "Created the branding for a fake business named Jibi Ramen.",
			image: `${BASE}/jibi-ramen.webp`,
			date: "2023"
		}
	];
</script>

<div class="designContent">
	<section id="artProjects">
		<h1 class="sectionHeading">Graphic Design</h1>
		<div class="artContainer">
			{#each artProjects as art (art.title)}
				<WorkCard
					title={art.title}
					description={art.description}
					image={art.image}
					imageAlt={art.title}
					imageAspectRatio="auto"
					date={art.date}
				/>
			{/each}
		</div>
	</section>
</div>

<style>
	.designContent {
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

	.artContainer {
		column-count: 3;
		column-gap: 1.5rem;
	}

	.artContainer > :global(.workCard) {
		margin-bottom: 1.5rem;
		break-inside: avoid;
		-webkit-column-break-inside: avoid;
		page-break-inside: avoid;
	}

	@media (max-width: 1200px) {
		.artContainer {
			column-count: 2;
		}
	}

	@media (max-width: 600px) {
		.artContainer {
			column-count: 1;
		}

		.sectionHeading {
			font-size: var(--fs-h1);
		}
	}
</style>

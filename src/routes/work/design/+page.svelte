<script lang="ts">
	import WorkCard from "$lib/components/WorkCard.svelte";
	import businessCard from "$lib/assets/digital-media/ian-business-card.webp";
	import queensGambitPoster from "$lib/assets/digital-media/the-queens-gambit-poster.webp";
	import magazineCover from "$lib/assets/digital-media/magazine-cover.webp";
	import mountainGraphic from "$lib/assets/digital-media/mountain.webp";
	import robotPatZ from "$lib/assets/digital-media/robot.webp";
	import teaParty from "$lib/assets/digital-media/tea-party.webp";
	import flatSpace from "$lib/assets/digital-media/flat-space.webp";
	import jibiRamen from "$lib/assets/digital-media/jibi-ramen.webp";

	const artProjects = [
		{
			title: "National Geographic Magazine Cover",
			description:
				"Magazine cover utilizing layered photography and different typography hierarchies.",
			image: magazineCover,
			date: "2022"
		},
		{
			title: "The Queen's Gambit Movie Poster",
			description:
				"Movie poster inspired by the The Queen's Gambit that explores the contrast between the themes of chess master and substance abuse.",
			image: queensGambitPoster,
			date: "2023"
		},
		{
			title: "Personal Business Card",
			description: "Print-ready, vertically oriented business card.",
			image: businessCard,
			date: "2025"
		},
		{
			title: "Blackout Mountain",
			description: "Created this artwork to put on my climbing bag.",
			image: mountainGraphic,
			date: "2025"
		},
		{
			title: "Flat Space",
			description: "Flat-illustration study focused on a space theme.",
			image: flatSpace,
			date: "2023"
		},
		{
			title: "Tea Party",
			description:
				"A royal figure bathing in red tea, celebrating their success. Created during a competition and selected as the winner.",
			image: teaParty,
			date: "2023"
		},
		{
			title: "Robot Squared",
			description: "Concept art for a colorful, boxy robot.",
			image: robotPatZ,
			date: "2023"
		},
		{
			title: "Jibi Ramen Branding",
			description: "Created the branding for a fake business named Jibi Ramen.",
			image: jibiRamen,
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

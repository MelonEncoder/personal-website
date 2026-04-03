<script lang="ts">
	import businessCard from "$lib/assets/digital-media/ian-business-card.webp";
	import queensGambitPoster from "$lib/assets/digital-media/the-queens-gambit-poster.webp";
	import magazineCover from "$lib/assets/digital-media/magazine-cover.webp";
	import mountainGraphic from "$lib/assets/digital-media/mountain.webp";
	import robotPatZ from "$lib/assets/digital-media/robot.webp";
	import teaParty from "$lib/assets/digital-media/tea-party.webp";
	import flatSpace from "$lib/assets/digital-media/flat-space.webp";
	import jibiRamen from "$lib/assets/digital-media/jibi-ramen.webp";

	interface ArtProject {
		title: string;
		description: string;
		image: string;
		date: string;
	}

	const artProjects: ArtProject[] = [
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
				"A royal figure bathing in red tea, celebrating their success. Created duing a competition and selected as the winner.",
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
	<section class="projectSection" id="artProjects">
		<h1 class="sectionHeading">Graphic Design</h1>
		<p class="introText">Here are some of my graphic design works.</p>
		<div class="artContainer">
			{#each artProjects as art, i (i)}
				<article class="artItem">
					<div class="artImageFrame">
						<img
							src={art.image}
							alt={art.title ?? "Design project"}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{#if art.title || art.description}
						<div class="artInfo">
							<h2 class="title">{art.title}</h2>
							<p class="sectionText">{art.description}</p>
							<span class="metaDate">{art.date}</span>
						</div>
					{/if}
				</article>
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

	.introText {
		font-size: var(--fs-body);
		line-height: 1.7;
		color: var(--black);
		margin: 0 0 1.5rem 0;
		font-weight: 400;
	}

	.artContainer {
		column-count: 3;
		column-gap: 1.5rem;
	}

	.artItem {
		display: inline-flex;
		width: 100%;
		flex-direction: column;
		margin: 0 0 1.5rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background-color: var(--white);
		overflow: hidden;
		break-inside: avoid;
		-webkit-column-break-inside: avoid;
		page-break-inside: avoid;
	}

	.artImageFrame {
		width: 100%;
		border-bottom: 2px solid var(--black);
		overflow: hidden;
		background: color-mix(in srgb, var(--black), white 92%);
	}

	.artImageFrame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.artInfo {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1.5rem;
		gap: 0.5rem;
	}

	.title {
		font-size: var(--fs-h3);
		font-weight: 600;
		margin: 0;
		color: var(--black);
	}

	.sectionText {
		font-size: var(--fs-body);
		line-height: 1.7;
		color: color-mix(in srgb, var(--black), white 12%);
		margin: 0;
		font-weight: 400;
	}

	.metaDate {
		padding: 0.28rem 0.55rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--backlight-2);
		font-size: var(--fs-body);
		font-weight: 700;
		letter-spacing: 0.02em;
		line-height: 1.2;
		align-self: flex-start;
		margin-top: auto;
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

		.introText {
			font-size: var(--fs-body);
		}
	}
</style>

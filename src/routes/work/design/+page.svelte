<script lang="ts">
	import businessCard from "$lib/assets/digital-media/ian-business-card.jpg";
	import queensGambitPoster from "$lib/assets/digital-media/the-queens-gambit-poster.png";
	import magazineCover from "$lib/assets/digital-media/magazine-cover.jpg";
	import mountainGraphic from "$lib/assets/digital-media/mountain.webp";

	interface ArtProject {
		title?: string;
		description?: string;
		image: string;
	}

	const artProjects: ArtProject[] = [
		{
			title: "Magazine Cover",
			description:
				"Editorial-style cover composition with layered photography and strong hierarchy.",
			image: magazineCover
		},
		{
			title: "Business Card",
			description: "Print-ready business card exploring compact branding and layout balance.",
			image: businessCard
		},
		{
			title: "Queen's Gambit Poster",
			description:
				"Poster concept inspired by the show's iconic chess motifs and dramatic contrast.",
			image: queensGambitPoster
		},
		{
			title: "Mountain Climbing Vector Art",
			description:
				"Flat vector illustration emphasizing shape language and environmental depth.",
			image: mountainGraphic
		}
	];
</script>

<div class="designContent">
	<section class="projectSection" id="artProjects">
		<h1 class="sectionHeading">Graphic Design</h1>
		<p class="introText">Here are some of my graphic design works.</p>
		<div class="artGrid">
			{#each artProjects as art, i (i)}
				<article class="artItem">
					<div class="artImageFrame">
						<img src={art.image} alt={art.title ?? "Design project"} />
					</div>
					{#if art.title || art.description}
						<div class="artInfo">
							{#if art.title}
								<h2 class="title">{art.title}</h2>
							{/if}
							{#if art.description}
								<p class="sectionText">{art.description}</p>
							{/if}
						</div>
					{/if}
				</article>
			{/each}
		</div>
	</section>
</div>

<style>
	.designContent {
		font-family: var(--font-1), sans-serif;
		color: var(--black);
	}

	.sectionHeading {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 1.25rem 0;
		color: var(--black);
		line-height: 1.3;
	}

	.introText {
		font-size: 1.125rem;
		line-height: 1.7;
		color: var(--black);
		margin: 0 0 1.5rem 0;
		font-weight: 400;
	}

	.artGrid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-bottom: 1rem;
	}

	.artItem {
		display: flex;
		flex-direction: column;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background-color: var(--primary);
		overflow: hidden;
		box-shadow: 0 4px 0 0 var(--black);
	}

	.artImageFrame {
		width: 100%;
		border-bottom: 2px solid var(--black);
		overflow: hidden;
		aspect-ratio: 1 / auto;
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
		padding: 1.5rem;
		gap: 0.75rem;
	}

	.title {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
		color: var(--black);
	}

	.sectionText {
		font-size: 1rem;
		line-height: 1.7;
		color: color-mix(in srgb, var(--black), white 12%);
		margin: 0;
		font-weight: 400;
	}

	@media (max-width: 1200px) {
		.artGrid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.artGrid {
			grid-template-columns: repeat(1, 1fr);
		}

		.sectionHeading {
			font-size: 1.5rem;
		}

		.introText {
			font-size: 1rem;
		}
	}
</style>

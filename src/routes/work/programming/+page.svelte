<script lang="ts">
	import arrowOut from "$lib/assets/icons/arrow-outward.svg";

	interface ProgrammingProject {
		title?: string;
		description?: string;
		url: string;
	}

	const programmingProjects: ProgrammingProject[] = [
		{
			title: "PDF to Video",
			description:
				"This is a program that converts a .pdf file into a .mp4 file. You can set the FPS, duration, resolution, and even animate the pdf.",
			url: "https://github.com/MelonEncoder/pdf-to-video"
		},
		{
			title: "Personal Website (this site)",
			description: "Made using Svelte with the intention to showcase myself and my work.",
			url: "https://github.com/MelonEncoder/personal-website"
		},
		{
			title: "HTML Image Parser",
			description:
				'I created this program to test out the Go programming language. Just describe the prefix you want to look for like "src=" and then all the respective images will downloaded.',
			url: "https://github.com/MelonEncoder/img-downloader"
		}
	];
</script>

<div class="programmingContent">
	<section class="projectSection" id="programmingProjects">
		<h1 class="sectionHeading">Programming Projects</h1>
		<p class="introText">Programming projects, scripts, and cli tools.</p>
		<ul class="programmingList">
			{#each programmingProjects as project, i (i)}
				<li class="projectItem">
					<div class="projectInfo">
						{#if project.title}
							<h2 class="title">
								<a
									class="projectLink"
									href={project.url}
									rel="external noreferrer"
									target="_blank"
								>
									{project.title}
								</a>
								<img src={arrowOut} alt="link icon" />
							</h2>
						{/if}
						{#if project.description}
							<p class="sectionText">{project.description}</p>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.programmingContent {
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

	.sectionText {
		font-size: 1rem;
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
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 0.75rem 0;
		text-decoration: none;
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

	.programmingList {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.projectItem {
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		box-shadow: 0 4px 0 0 var(--black);
		transform: translateY(0);
		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease,
			border-color 0.12s ease,
			background-color 0.12s ease;
		background-color: var(--primary);
	}

	.projectInfo {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		gap: 0.75rem;
	}

	@media (max-width: 1200px) {
		.programmingList {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.programmingList {
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

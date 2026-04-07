<script lang="ts">
	import WorkCard from "$lib/components/WorkCard.svelte";

	const programmingProjects = [
		{
			title: "Personal Website (this site)",
			description: "Made using Svelte with the intention to showcase myself and my work.",
			href: "https://github.com/MelonEncoder/personal-website",
			tags: ["Svelte", "TypeScript", "HTML/CSS"],
			date: "2024"
		},
		{
			title: "PDF to Video",
			description:
				"This is a program that converts a .pdf file into a .mp4 file. You can set the FPS, duration, resolution, and even animate the pdf.",
			href: "https://github.com/MelonEncoder/pdf-to-video",
			tags: ["C++", "Meson", "OpenCV", "Poppler"],
			date: "2023"
		},
		{
			title: "HTML Image Parser",
			description:
				'I created this program to test out the Go programming language. Just describe the prefix you want to look for like "src=" and then all the respective images will downloaded.',
			href: "https://github.com/MelonEncoder/img-downloader",
			tags: ["Go"],
			date: "2023"
		},
		{
			title: "Linux Wallpaper Switcher",
			description:
				"A lightweight wallpaper switcher for Linux that rotates images from a folder with simple keyboard controls.",
			href: "https://github.com/MelonEncoder/simple-wallpaper-switcher",
			tags: ["C++", "SFML"],
			date: "2023"
		},
		{
			title: "PONG",
			description: "Recreated the classic game of Pong with a little twist.",
			href: "https://github.com/MelonEncoder/pong",
			tags: ["C", "RayLib"],
			date: "2023"
		}
	];
</script>

<div class="programmingContent">
	<section id="programmingProjects">
		<h1 class="sectionHeading">Programming Projects</h1>
		<ul class="projectGrid">
			{#each programmingProjects as project (project.title)}
				<li>
					<WorkCard
						title={project.title}
						description={project.description}
						href={project.href}
						tags={project.tags}
						date={project.date}
					/>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.programmingContent {
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

	.projectGrid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.projectGrid > li {
		display: flex;
	}

	.projectGrid > li > :global(.workCard) {
		flex: 1;
	}

	@media (max-width: 1200px) {
		.projectGrid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.projectGrid {
			grid-template-columns: 1fr;
		}

		.sectionHeading {
			font-size: var(--fs-h1);
		}
	}
</style>

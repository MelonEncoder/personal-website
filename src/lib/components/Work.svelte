<script lang="ts">
	import businessCard from "$lib/assets/digital-media/ian-business-card.jpg";
	import queensGambitPoster from "$lib/assets/digital-media/the-queens-gambit-poster.png";
	import magazineCover from "$lib/assets/digital-media/magazine-cover.jpg";
	import mountainGraphic from "$lib/assets/digital-media/mountain.webp";
	import whiteButtonScreenshot from "$lib/assets/white-button-screenshot.png";
	import zoomInIcon from "$lib/assets/icons/zoom-in.svg";
	import arrowOut from "$lib/assets/icons/arrow-outward.svg";

	interface ProgrammingProject {
		title: string;
		description: string;
		url: string;
	}

	interface GameProject {
		title: string;
		description: string;
		url: string;
		image: string;
	}

	interface ArtProject {
		title: string;
		image: string;
	}

	let enlargedImage = $state<string | null>(null);

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
				'I created this program to test out the Go programming language. Just describe the prefix you want want to look for like "src=" and then all the respective images will downloaded.',
			url: "https://github.com/MelonEncoder/img-downloader"
		}
	];

	const gamingProjects: GameProject[] = [
		{
			title: "White Button",
			description:
				"White Button was created during a week long game jam where the theme was 1-bit color palette. Your goal is to click all the buttons before the lava reaches you.",
			url: "https://karpoonz.itch.io/white-button",
			image: whiteButtonScreenshot
		}
	];

	const artProjects: ArtProject[] = [
		{
			title: "Business Card",
			image: businessCard
		},
		{ title: "Mountain Climbing Vector Art", image: mountainGraphic },
		{ title: "Magazine Cover", image: magazineCover },
		{ title: "Queen's Gambit Poster", image: queensGambitPoster }
	];

	function openImage(src: string) {
		enlargedImage = src;
	}

	function closeImage() {
		enlargedImage = null;
	}

	function handleImageKeydown(e: KeyboardEvent, src: string) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			openImage(src);
		}
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			closeImage();
		}
	}
</script>

<div class="content">
	<div class="workContent">
		<p class="introText">
			Here is a collection of much of my work. From CLI tools to graphic designs to video
			games, I do my best to stay well versed in many fields.
		</p>

		<section class="projectSection" id="programmingProjects">
			<h2 class="sectionHeading">Programming Projects</h2>
			<ul class="programmingList">
				{#each programmingProjects as project, i (i)}
					<li class="projectItem">
						<h3 class="title">
							<a class="" href={project.url} rel="external">
								{project.title}
							</a>
							<img src={arrowOut} alt="link icon" />
						</h3>
						<p class="sectionText">
							{project.description}
						</p>
					</li>
				{/each}
			</ul>
		</section>

		<section class="projectSection" id="videogameProjects">
			<h2 class="sectionHeading">Video Games</h2>
			{#each gamingProjects as game, i (i)}
				<div class="gameItem">
					<button
						class="gameImageBtn"
						onclick={() => openImage(whiteButtonScreenshot)}
						onkeydown={(e) => handleImageKeydown(e, whiteButtonScreenshot)}
						aria-label="View White Button game screenshot"
					>
						<img src={game.image} alt="white button video game screenshot" />
						<img src={zoomInIcon} alt="" class="zoom-icon" />
					</button>
					<div class="gameInfo">
						<h3 class="title">
							<a href={game.url} rel="external">
								{game.title}
							</a>
							<img src={arrowOut} alt="link icon" />
						</h3>
						<p class="sectionText">
							{game.description}
						</p>
					</div>
				</div>
			{/each}
		</section>

		<section class="projectSection" id="artProjects">
			<h2 class="sectionHeading">Graphic Design</h2>
			<div class="artGrid">
				{#each artProjects as art, i (i)}
					<button
						class="artImageBtn"
						onclick={() => openImage(art.image)}
						onkeydown={(e) => handleImageKeydown(e, art.image)}
						aria-label="view artwork"
					>
						<img src={art.image} alt={art.title} />
						<img src={zoomInIcon} alt="" class="zoom-icon" />
					</button>
				{/each}
			</div>
		</section>

		{#if enlargedImage}
			<div class="image-overlay" onclick={handleBackdropClick} role="presentation">
				<button
					class="close-overlay"
					onclick={closeImage}
					aria-label="Close enlarged image"
				>
					<svg
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
				<img src={enlargedImage} alt="Enlarged view" class="enlarged-image" />
			</div>
		{/if}
	</div>
</div>

<style>
	.content {
		color: var(--black);
	}

	.workContent {
		font-family: var(--font-1), sans-serif;
		color: var(--black);
	}

	.sectionHeading {
		font-size: 2rem;
		font-weight: 700;
		margin: 2.5rem 0 1.25rem 0;
		color: var(--black);
		line-height: 1.3;
	}

	.introText {
		font-size: 1.125rem;
		line-height: 1.7;
		color: var(--black);
		margin-bottom: 1.5rem;
		font-weight: 400;
	}

	.sectionText {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--black-2);
		margin: 0;
		font-weight: 400;
	}

	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
		gap: 0.35rem;
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 0.75rem 0;
		color: var(--black);
	}

	.title a {
		color: var(--black);
		text-decoration: none;
		transition: color 0.1s ease;
	}

	.title a:hover {
		color: var(--accent);
	}

	/* Programming Projects */
	.programmingList {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.projectItem {
		border: 2px solid var(--black);
		border-radius: var(--radius-md);
		padding: 1.5rem;
		transition: all 0.2s ease;
		background-color: var(--white);
	}

	/* Graphic Design Grid */
	.artGrid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
		margin-bottom: 1rem;
	}

	.artImageBtn {
		background: none;
		border: 2px solid var(--black);
		border-radius: var(--radius-md);
		padding: 0;
		cursor: pointer;
		overflow: hidden;
		aspect-ratio: 1 / 1;
		transition: all 0.2s ease;
		position: relative;
	}

	.artImageBtn:hover {
		border-color: var(--accent);
		box-shadow: 0 5px 15px rgba(255, 60, 102, 0.3);
	}

	.artImageBtn:hover .zoom-icon {
		opacity: 1;
	}

	.artImageBtn:hover img:first-child {
		filter: brightness(0.7);
	}

	.artImageBtn img:first-child {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: filter 0.2s ease;
	}

	.zoom-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 4rem;
		height: 4rem;
		opacity: 0;
		transition: opacity 0.2s ease;
		pointer-events: none;
		filter: invert(1) brightness(2);
	}

	/* Video Games Section */
	.gameItem {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		border: 2px solid var(--black);
		border-radius: 0.5rem;
		padding: 1.5rem;
		background-color: var(--white);
	}

	.gameImageBtn {
		background: none;
		border: 2px solid var(--black);
		border-radius: var(--radius-md);
		padding: 0;
		cursor: pointer;
		overflow: hidden;
		aspect-ratio: 16 / 9;
		transition: all 0.2s ease;
		position: relative;
	}

	.gameImageBtn:hover {
		border-color: var(--accent);
		box-shadow: 0 5px 15px rgba(255, 60, 102, 0.3);
	}

	.gameImageBtn:hover .zoom-icon {
		opacity: 1;
	}

	.gameImageBtn:hover img:first-child {
		filter: brightness(0.7);
	}

	.gameImageBtn img:first-child {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: filter 0.2s ease;
	}

	.gameInfo {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	/* Image Overlay */
	.image-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.88);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
		backdrop-filter: blur(8px);
	}

	.enlarged-image {
		max-width: 90%;
		max-height: 90%;
		object-fit: contain;
		border: 4px solid var(--white);
		border-radius: 0.5rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
	}

	.close-overlay {
		position: absolute;
		top: 10%;
		right: 10%;
		background: var(--white);
		border: 2px solid var(--black);
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--black);
	}

	.close-overlay:hover {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--white);
		transform: rotate(90deg);
	}

	@media (max-width: 1200px) {
		.artGrid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 600px) {
		.sectionHeading {
			font-size: 1.5rem;
		}

		.introText {
			font-size: 1rem;
		}

		.image-overlay {
			padding: 1rem;
		}

		.close-overlay {
			top: 1rem;
			right: 1rem;
		}

		.zoom-icon {
			width: 3rem;
			height: 3rem;
		}
	}
</style>

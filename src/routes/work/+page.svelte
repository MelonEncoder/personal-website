<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import businessCard from '$lib/assets/digital-media/ian-business-card.jpg';
	import queensGambitPoster from '$lib/assets/digital-media/the-queens-gambit-poster.png';
	import magazineCover from '$lib/assets/digital-media/magazine-cover.jpg';
	import mountainGraphic from '$lib/assets/digital-media/mountain.webp';
	import whiteButtonScreenshot from '$lib/assets/white-button-screenshot.png';
	import zoomInIcon from '$lib/assets/icons/zoom-in.svg';
	import linkIcon from '$lib/assets/icons/link.svg';

	let enlargedImage = $state<string | null>(null);

	function openImage(src: string) {
		enlargedImage = src;
	}

	function closeImage() {
		enlargedImage = null;
	}

	function handleImageKeydown(e: KeyboardEvent, src: string) {
		if (e.key === 'Enter' || e.key === ' ') {
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

<Modal closePath="/">
	<div class="work-content">
		<h1 class="main-heading grad-text">My Work</h1>
		<p class="intro-text">
			Here is a collection of much of my work. From CLI tools to graphic designs to video games, I
			do my best to stay well versed in many fields.
		</p>

		<h2 class="section-heading">Programming Projects</h2>
		<div class="programming-list">
			<div class="programming-item">
				<h3 class="project-title">
					<a href="https://github.com/MelonEncoder/pdf-to-video" rel="external">
						PDF to Video CLI tool
						<img src={linkIcon} alt="link icon" />
					</a>
				</h3>
				<p class="section-text">
					This is a program that converts a .pdf file into a .mp4 file. You can set the FPS,
					duration, resolution, and even animate the pdf.
				</p>
			</div>
			<div class="programming-item">
				<h3 class="project-title">
					<a href="https://github.com/MelonEncoder/personal-website" rel="external">
						Personal Website (the one you are on)
						<img src={linkIcon} alt="link icon" />
					</a>
				</h3>
				<p class="section-text">
					Made using Svelte with the intention to showcase myself and my work.
				</p>
			</div>
			<div class="programming-item">
				<h3 class="project-title">
					<a href="https://github.com/MelonEncoder/img-downloader" rel="external">
						HTML Image Parser
						<img src={linkIcon} alt="link icon" />
					</a>
				</h3>
				<p class="section-text">
					I created this program to test out the Go programming language. Just describe the prefix
					you want want to look for like "src=" and then all the respective images will downloaded.
				</p>
			</div>
		</div>

		<h2 class="section-heading">Graphic Design</h2>
		<div class="graphics-grid">
			<button
				class="image-button"
				onclick={() => openImage(businessCard)}
				onkeydown={(e) => handleImageKeydown(e, businessCard)}
				aria-label="View business card design"
			>
				<img src={businessCard} alt="ian's business card" />
				<img src={zoomInIcon} alt="" class="zoom-icon" />
			</button>
			<button
				class="image-button"
				onclick={() => openImage(mountainGraphic)}
				onkeydown={(e) => handleImageKeydown(e, mountainGraphic)}
				aria-label="View mountain graphic"
			>
				<img src={mountainGraphic} alt="mountain graphic design" />
				<img src={zoomInIcon} alt="" class="zoom-icon" />
			</button>
			<button
				class="image-button"
				onclick={() => openImage(magazineCover)}
				onkeydown={(e) => handleImageKeydown(e, magazineCover)}
				aria-label="View magazine cover"
			>
				<img src={magazineCover} alt="magazine cover design" />
				<img src={zoomInIcon} alt="" class="zoom-icon" />
			</button>
			<button
				class="image-button"
				onclick={() => openImage(queensGambitPoster)}
				onkeydown={(e) => handleImageKeydown(e, queensGambitPoster)}
				aria-label="View Queen's Gambit poster"
			>
				<img src={queensGambitPoster} alt="the queen's gambit poster" />
				<img src={zoomInIcon} alt="" class="zoom-icon" />
			</button>
		</div>

		<h2 class="section-heading">Video Games</h2>
		<div class="game-item">
			<button
				class="game-image-button"
				onclick={() => openImage(whiteButtonScreenshot)}
				onkeydown={(e) => handleImageKeydown(e, whiteButtonScreenshot)}
				aria-label="View White Button game screenshot"
			>
				<img src={whiteButtonScreenshot} alt="white button video game screenshot" />
				<img src={zoomInIcon} alt="" class="zoom-icon" />
			</button>
			<div class="game-info">
				<h3 class="project-title">
					<a href="https://karpoonz.itch.io/white-button" rel="external">
						White Button
						<img src={linkIcon} alt="link icon" />
					</a>
				</h3>
				<p class="section-text">
					White Button was created during a week long game jam where the theme was 1-bit color
					palette. Your goal is to click all the buttons before the lava reaches you.
				</p>
			</div>
		</div>
	</div>
</Modal>

{#if enlargedImage}
	<div class="image-overlay" onclick={handleBackdropClick} role="presentation">
		<button class="close-overlay" onclick={closeImage} aria-label="Close enlarged image">
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

<style>
	.work-content {
		font-family: var(--font-1), sans-serif;
		color: var(--black-1);
	}

	.main-heading {
		font-size: 3rem;
		font-weight: 800;
		margin: 0 0 1.5rem 0;
		color: var(--black-1);
		line-height: 1.2;
	}

	.section-heading {
		font-size: 2rem;
		font-weight: 700;
		margin: 2.5rem 0 1.25rem 0;
		color: var(--black-1);
		line-height: 1.3;
	}

	.grad-text {
		background: var(--accent-main);
		background-clip: text;

		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		-moz-background-clip: text;
		-moz-text-fill-color: transparent;
	}

	.intro-text {
		font-size: 1.125rem;
		line-height: 1.7;
		color: var(--black-1);
		margin-bottom: 1.5rem;
		font-weight: 400;
	}

	.section-text {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--black-2);
		margin: 0;
		font-weight: 400;
	}

	/* Programming Projects */
	.programming-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.programming-item {
		border: 2px solid var(--black-1);
		border-radius: 0.5rem;
		padding: 1.5rem;
		transition: all 0.2s ease;
		background-color: var(--white-1);
	}

	.programming-item:hover {
		border-color: var(--accent-main-1);
		box-shadow: 0 5px 15px rgba(255, 60, 102, 0.2);
		transform: translateY(-2px);
	}

	.project-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 0.75rem 0;
		color: var(--black-1);
	}

	.project-title a {
		color: var(--black-1);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.project-title a:hover {
		color: var(--accent-main-1);
	}

	/* Graphic Design Grid */
	.graphics-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin-bottom: 1rem;
	}

	.image-button {
		background: none;
		border: 2px solid var(--black-1);
		border-radius: 0.5rem;
		padding: 0;
		cursor: pointer;
		overflow: hidden;
		aspect-ratio: 1 / 1;
		transition: all 0.2s ease;
		position: relative;
	}

	.image-button:hover {
		border-color: var(--accent-main-1);
		box-shadow: 0 5px 15px rgba(255, 60, 102, 0.3);
		transform: translateY(-2px);
	}

	.image-button:hover .zoom-icon {
		opacity: 1;
	}

	.image-button:hover img:first-child {
		filter: brightness(0.7);
	}

	.image-button img:first-child {
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
	.game-item {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		border: 2px solid var(--black-1);
		border-radius: 0.5rem;
		padding: 1.5rem;
		background-color: var(--white-1);
	}

	.game-image-button {
		background: none;
		border: 2px solid var(--black-1);
		border-radius: 0.5rem;
		padding: 0;
		cursor: pointer;
		overflow: hidden;
		aspect-ratio: 16 / 9;
		transition: all 0.2s ease;
		position: relative;
	}

	.game-image-button:hover {
		border-color: var(--accent-main-1);
		box-shadow: 0 5px 15px rgba(255, 60, 102, 0.3);
	}

	.game-image-button:hover .zoom-icon {
		opacity: 1;
	}

	.game-image-button:hover img:first-child {
		filter: brightness(0.7);
	}

	.game-image-button img:first-child {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: filter 0.2s ease;
	}

	.game-info {
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
		background-color: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
		padding: 2rem;
		backdrop-filter: blur(8px);
	}

	.enlarged-image {
		max-width: 90%;
		max-height: 90%;
		object-fit: contain;
		border: 4px solid var(--white-1);
		border-radius: 0.5rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
	}

	.close-overlay {
		position: absolute;
		top: 10%;
		right: 10%;
		background: var(--white-1);
		border: 2px solid var(--black-1);
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--black-1);
	}

	.close-overlay:hover {
		background: var(--accent-main-1);
		border-color: var(--accent-main-1);
		color: var(--white-1);
		transform: rotate(90deg);
	}

	/* Responsive */
	@media (max-width: 700px) {
		.main-heading {
			font-size: 2.25rem;
		}

		.section-heading {
			font-size: 1.5rem;
		}

		.intro-text {
			font-size: 1rem;
		}

		.graphics-grid {
			grid-template-columns: 1fr;
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

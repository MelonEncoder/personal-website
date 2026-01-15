<script lang="ts">
	import monogram from "$lib/assets/brand/monogram.svg";
	import PaperLayout from "$lib/components/PaperLayout.svelte";

	import githubLogo from "$lib/assets/icons/logo-github.svg";
	import linkedinLogo from "$lib/assets/icons/logo-linkedin.svg";
	const developmentItems = [
		"C",
		"C++",
		"Javascript",
		"HTML/CSS",
		"Go",
		"Gdscript",
		"Svelte",
		"Git",
		"React Native",
		"Expo"
	];
	const softwareItems = ["Affinity", "Blender", "Figma", "Godot"];

	let year = new Date().getFullYear().toString();
</script>

<PaperLayout title="about">
	<div class="aboutContent">
		<p class="introText">
			Hello! My name is Ian Gillette and I'm currently studying Computer Science. I enjoy
			programming, game design, creative projects, and learning new things.
		</p>
		<h2 class="sectionHeading">Development</h2>
		<ul class="toolList">
			{#each developmentItems as item (item)}
				<li class="toolItem" id={item}>{item}</li>
			{/each}
		</ul>
		<h2 class="sectionHeading">Tools</h2>
		<ul class="toolList">
			{#each softwareItems as item (item)}
				<li class="toolItem" id={item}>{item}</li>
			{/each}
		</ul>
		<h2 class="sectionHeading">Language Fluency</h2>
		<p class="sectionText">
			I am actively learning
			<span class="highlight">Japanese</span> at the moment and plan on learning Spanish in the
			future.
		</p>
		<ul class="languageList">
			<li>Japanese/日本語 (Elementary Level)</li>
			<li>Spanish/Español (Elementary Level)</li>
		</ul>
		<h2 class="sectionHeading">Links</h2>
		<div class="links-content">
			<div class="links">
				<a class="link" id="github" href="https://github.com/MelonEncoder" rel="external">
					<img src={githubLogo} alt="github logo" />
					GitHub
				</a>
				<a
					class="link"
					id="linkedin"
					href="https://linkedin.com/in/iangillette"
					rel="external"
				>
					<img src={linkedinLogo} alt="linkedin logo" />
					LinkedIn
				</a>
			</div>
		</div>
		<footer>
			<img id="monogram" src={monogram} alt="monogram" width="75px" />
			<p>Copyright &copy; {year} Ian Gillette</p>
		</footer>
	</div>
</PaperLayout>

<style>
	.aboutContent {
		font-family: var(--font-1), sans-serif;
		color: var(--black);
	}

	.sectionHeading {
		font-size: 2rem;
		font-weight: 700;
		margin: 2rem 0 1rem 0;
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
		color: var(--black);
		margin-bottom: 1rem;
		font-weight: 400;
	}

	.highlight {
		color: var(--accent);
		font-weight: 600;
	}

	.languageList {
		margin: 1rem 0 1.5rem 0;
		padding-left: 1.5rem;
		list-style: none;
	}

	.languageList li {
		margin-bottom: 0.75rem;
		line-height: 1.6;
		font-size: 1rem;
		position: relative;
		padding-left: 1.5rem;
	}

	.languageList li::before {
		content: "▸";
		position: absolute;
		left: 0;
		color: var(--accent);
		font-weight: bold;
	}

	.toolList {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 0;
		list-style: none;
	}

	.toolItem {
		font-size: 1rem;
		border: 2px solid var(--black);
		border-radius: 0.25rem;
		padding: 0.4rem 0.5rem;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.links {
		display: flex;
		gap: 1.5rem;
		width: 50%;
	}

	.link {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--black);
		padding: 2rem 1rem;
		background-color: var(--white);

		font-size: 1rem;
		font-weight: 700;
		color: var(--black);
		line-height: 1;
		text-decoration: none;

		transform: translateY(-5px);
		box-shadow: 0 5px var(--black);
		transition: all 0.2s ease;
	}

	.link:hover {
		transform: translateY(-10px);
		box-shadow: 0 10px var(--accent);
		border-color: var(--accent);
	}

	.link:active {
		transition: all 0.08s ease;
		box-shadow: 0 0 var(--accent);
		border-color: var(--accent);
		transform: translateY(0);
	}

	.link > img {
		width: 4rem;
		aspect-ratio: 1 / 1;
		margin-bottom: 0.5rem;
	}

	@media (max-width: 700px) {
		.links {
			grid-template-columns: minmax(1rem, 1fr);
		}
	}
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 2.5rem;
		padding-top: 2rem;
		border-top: 2px solid var(--black);
	}

	footer p {
		margin-top: 0.75rem;
		font-size: 0.875rem;
		color: var(--black-2);
		font-weight: 400;
	}

	@media (max-width: 700px) {
		.sectionHeading {
			font-size: 1.5rem;
		}

		.introText {
			font-size: 1rem;
		}
	}
</style>

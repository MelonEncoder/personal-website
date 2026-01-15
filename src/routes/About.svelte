<script lang="ts">
	import monogram from "$lib/assets/brand/monogram.svg";

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
		<span class="highlight">Japanese</span> at the moment and plan on learning Spanish in the future.
	</p>
	<ul class="languageList">
		<li>Japanese/日本語 (Elementary Level)</li>
		<li>Spanish/Español (Elementary Level)</li>
	</ul>
	<footer>
		<img id="monogram" src={monogram} alt="monogram" width="75px" />
		<p>Copyright &copy; {year} Ian Gillette</p>
	</footer>
</div>

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

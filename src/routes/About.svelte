<script lang="ts">
	import monogram from '$lib/assets/monogram.svg';

	const developmentItems = [
		'C',
		'C++',
		'Javascript',
		'HTML/CSS',
		'Go',
		'Gdscript',
		'Svelte',
		'Git'
	];
	const softwareItems = ['Affinity', 'Blender', 'Figma', 'Godot'];

	let year = new Date().getFullYear().toString();
</script>

<div class="about-content">
	<h1 class="main-heading"><span class="grad-text">About Me</span></h1>
	<p class="intro-text">
		Hello! My name is Ian Gillette and I'm currently at UCF studying Computer Science. I enjoy doing
		creative projects, programming, and learning new things.
	</p>
	<h2 class="section-heading">Development</h2>
	<ul class="tool-list">
		{#each developmentItems as item (item)}
			<li class="tool-item" id={item}>{item}</li>
		{/each}
	</ul>
	<h2 class="section-heading">Tools</h2>
	<ul class="tool-list">
		{#each softwareItems as item (item)}
			<li class="tool-item" id={item}>{item}</li>
		{/each}
	</ul>
	<h2 class="section-heading">Language Fluency</h2>
	<p class="section-text">
		I am actively learning Japanese at the moment, with the plan to be fluent in not only
		<span class="highlight">Japanese</span>
		but <span class="highlight">Spanish</span> and a few other languages. Where I'm at:
	</p>
	<ul class="language-list">
		<li>Japanese/日本語 (Elementary Level)</li>
		<li>Spanish/Español (Elementary Level)</li>
	</ul>
	<footer>
		<img id="monogram" src={monogram} alt="ian's monogram" width="75px" />
		<p>Copyright &copy; {year} Ian Gillette</p>
	</footer>
</div>

<style>
	.about-content {
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
		margin: 2rem 0 1rem 0;
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
		color: var(--black-1);
		margin-bottom: 1rem;
		font-weight: 400;
	}

	.highlight {
		color: var(--accent-main-1);
		font-weight: 600;
	}

	.language-list {
		margin: 1rem 0 1.5rem 0;
		padding-left: 1.5rem;
		list-style: none;
	}

	.language-list li {
		margin-bottom: 0.75rem;
		line-height: 1.6;
		font-size: 1rem;
		position: relative;
		padding-left: 1.5rem;
	}

	.language-list li::before {
		content: '▸';
		position: absolute;
		left: 0;
		color: var(--accent-main-1);
		font-weight: bold;
	}

	.tool-list {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 0;
		list-style: none;
	}

	.tool-item {
		font-size: 1rem;
		border: 2px solid var(--black-1);
		border-radius: 0.2rem;
		padding: 0.3rem 0.45rem;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
		box-shadow: 0 3px 0 0 var(--black-1);
	}

	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 2.5rem;
		padding-top: 2rem;
		border-top: 2px solid var(--black-1);
	}

	footer p {
		margin-top: 0.75rem;
		font-size: 0.875rem;
		color: var(--black-2);
		font-weight: 400;
	}

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
	}
</style>

<script lang="ts">
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
	const softwareItems = [
		"Affinity",
		"Blender",
		"Figma",
		"Godot Engine",
		"Illustrator",
		"Photoshop"
	];
	const links: { href: string; icon: string }[] = [
		{ href: "https://github.com/MelonEncoder", icon: githubLogo },
		{ href: "https://www.linkedin.com/in/iangillette", icon: linkedinLogo }
	];
</script>

<div class="content">
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
	<h2 class="sectionHeading">Fluency</h2>
	<p class="sectionText">
		I am actively learning
		<span class="highlight">Japanese</span> at the moment and plan on learning Spanish in the future.
	</p>
	<ul class="languageList">
		<li>Japanese/日本語 (Elementary Level)</li>
		<li>Spanish/Español (Elementary Level)</li>
	</ul>
	<h2 class="sectionHeading">Links</h2>
	<div class="linksContent">
		<div class="links">
			{#each links as link, i (i)}
				<a class="link" id="github" href={link.href} target="_blank" rel="external">
					<img src={link.icon} alt="github logo" />
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.content {
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
		background-color: var(--white);
		border-radius: var(--radius-sm);
		padding: 0.4rem 0.5rem;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.links {
		display: flex;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1rem;
	}

	.link {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		align-items: center;
		border: 2px solid var(--black);
		border-radius: var(--radius-lg);
		padding: 1rem;
		background-color: var(--white);

		width: fit-content;

		font-size: 1rem;
		font-weight: 700;
		color: var(--black);
		line-height: 1;
		text-decoration: none;

		transition: all 0.2s ease;
	}

	.link:hover {
		background-color: lightgray;
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
	}

	@media (max-width: 700px) {
		.links {
			grid-template-columns: 1fr 1fr;
		}

		.sectionHeading {
			font-size: 1.5rem;
		}

		.introText {
			font-size: 1rem;
		}
	}
</style>

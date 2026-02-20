<script lang="ts">
	import githubLogo from "$lib/assets/icons/logo-github.svg";
	import linkedinLogo from "$lib/assets/icons/logo-linkedin.svg";

	interface LanguageItem {
		name: string;
		nativeName: string;
		fluency: string;
		focus: string;
	}

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
		"Expo",
		"NEXT.js"
	];

	const softwareItems = [
		"Affinity",
		"Blender",
		"Figma",
		"Godot Engine",
		"Illustrator",
		"Photoshop"
	];

	const languages: LanguageItem[] = [
		{
			name: "Japanese",
			nativeName: "日本語",
			fluency: "Elementary",
			focus: "Current focus"
		},
		{
			name: "Spanish",
			nativeName: "Español",
			fluency: "Elementary",
			focus: "Next priority"
		}
	];

	const links: { href: string; icon: string }[] = [
		{ href: "https://github.com/MelonEncoder", icon: githubLogo },
		{ href: "https://www.linkedin.com/in/iangillette", icon: linkedinLogo }
	];
</script>

<div class="content">
	<h1 class="title">ABOUT</h1>
	<p class="sectionText">
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
	<h2 class="sectionHeading">Languages</h2>
	<ul class="languageList">
		{#each languages as language (language.name)}
			<li class="languageCard">
				<p class="languageTag">{language.focus}</p>
				<h3 class="languageName">{language.name}</h3>
				<div class="languageMeta">
					<p><span>Fluency</span>{language.fluency}</p>
					<p><span>Native Name</span>{language.nativeName}</p>
				</div>
			</li>
		{/each}
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
		font-family: var(--font-body), sans-serif;
	}

	.title {
		font-family: var(--font-title), monospace;
		font-size: var(--fs-title);
		text-transform: uppercase;
		letter-spacing: 0.02em;
		margin: 0 0 1rem 0;
	}

	.sectionHeading {
		font-size: var(--fs-h2);
		font-weight: 700;
		margin: 2rem 0 1rem 0;
		color: var(--black);
		line-height: 1.3;
		letter-spacing: 0.02em;
	}

	.sectionText {
		font-size: var(--fs-body);
		line-height: 1.7;
		color: var(--black);
		margin-bottom: 1rem;
		font-weight: 400;
	}

	.languageList {
		margin: 1rem 0 1.5rem 0;
		padding: 0;
		list-style: none;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.8rem;
	}

	.languageCard {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		line-height: 1.5;
		font-size: var(--fs-body);
		padding: 0.95rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--primary);
		box-shadow: 0 4px 0 0 var(--black);
		transform: translateY(0);
		transition: 0.12s ease;
	}

	.languageCard:hover {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--primary), var(--accent) 10%);
		box-shadow: 0 4px 0 0 var(--accent);
	}

	.languageTag {
		margin: 0;
		width: fit-content;
		padding: 0.15rem 0.35rem;
		font-size: var(--fs-body);
		font-family: var(--font-title), monospace;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		background: color-mix(in srgb, var(--primary), white 35%);
		border: 1px solid var(--black);
		color: color-mix(in srgb, var(--accent), black 10%);
	}

	.languageName {
		margin: 0;
		font-size: var(--fs-h3);
		line-height: 1.1;
	}

	.languageMeta {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.4rem;
	}

	.languageMeta p {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: baseline;
		margin: 0;
		padding-top: 0.35rem;
		border-top: 1px dashed color-mix(in srgb, var(--black), white 60%);
		font-size: var(--fs-body);
	}

	.languageMeta span {
		font-family: var(--font-title), monospace;
		font-size: var(--fs-body);
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--black), white 35%);
	}

	.toolList {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 0;
		list-style: none;
	}

	.toolItem {
		font-size: var(--fs-body);
		border: 2px solid var(--black);
		background-color: var(--primary);
		border-radius: var(--radius-sm);
		padding: 0.4rem 0.55rem;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;

		box-shadow: 0 3px 0 0 var(--black);
		transform: translateY(0);

		transition: 0.12s ease;
	}

	.toolItem:hover {
		border-color: var(--accent);
		background-color: color-mix(in srgb, var(--primary), var(--accent) 10%);
		box-shadow: 0 3px 0 0 var(--accent);
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
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		padding: 1rem;
		background-color: var(--primary);
		box-shadow: 0 4px 0 0 var(--black);
		transform: translateY(0);

		font-size: var(--fs-body);
		font-weight: 700;
		color: var(--black);
		line-height: 1;
		text-decoration: none;

		transition: 0.12s ease;
	}

	.link:hover {
		transform: translateY(-2px);
		background-color: color-mix(in srgb, var(--primary), var(--accent) 10%);
		border-color: var(--accent);
		box-shadow: 0 6px 0 0 var(--accent);
	}

	.link:active {
		box-shadow: 0 2px 0 0 var(--accent);
	}

	.link > img {
		width: 4rem;
		aspect-ratio: 1 / 1;
	}

	@media (max-width: 1200px) {
		.languageList {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 700px) {
		.languageList {
			grid-template-columns: 1fr;
		}

		.links {
			grid-template-columns: 1fr 1fr;
		}

		.sectionHeading {
			font-size: var(--fs-h1);
		}
	}
</style>

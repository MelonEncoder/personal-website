<script lang="ts">
	import githubLogo from "$lib/assets/logos/github.svg";
	import linkedinLogo from "$lib/assets/logos/linkedin.svg";
	import itchLogo from "$lib/assets/logos/itch.svg";

	import ImageButton from "$lib/components/ImageButton.svelte";
	import Card from "$lib/components/Card.svelte";

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
		"Typescript",
		"HTML/CSS",
		"Go",
		"Linux",
		"Gdscript",
		"Svelte",
		"Git",
		"React Native",
		"Expo",
		"NEXT.js",
		"OpenCV"
	];

	const softwareItems = [
		"Affinity",
		"Blender",
		"Figma",
		"Godot Engine",
		"Illustrator",
		"Photoshop",
		"Procreate"
	];

	const languages: LanguageItem[] = [
		{
			name: "Japanese",
			nativeName: "日本語",
			fluency: "Elementary [N5]",
			focus: "Actively Learning"
		},
		{
			name: "Spanish",
			nativeName: "Español",
			fluency: "Elementary [A1]",
			focus: "Next Focus"
		}
	];

	const links: { href: string; icon: string; alt: string }[] = [
		{ href: "https://github.com/MelonEncoder", icon: githubLogo, alt: "GitHub logo" },
		{ href: "https://karpoonz.itch.io/", icon: itchLogo, alt: "Itch.io logo" },
		{
			href: "https://www.linkedin.com/in/iangillette",
			icon: linkedinLogo,
			alt: "LinkedIn logo"
		}
	];
</script>

<div class="content">
	<h1 class="title">ABOUT ME</h1>
	<Card>
		<p class="sectionText">
			Hello! My name is Ian Gillette. I'm currently studying Game Design at UCF with plans to
			create and share art and stories with the world. I was a computer science major but
			decided to switch to a more art centric field that still keeped some technical elements
			from computer science.
		</p>
		<p class="sectionText">
			In my free time I enjoy programming, drawing, venturing outdoors, and learning new
			languages. My interests are always changing and expanding so I tend to stay busy with my
			hobbies. One interest though tends to stick around and that is learning!
		</p>
		<p class="sectionText">
			The ability to learn, in my opinion, is the most important ability humans have. Ever
			since I was little I loved learning just about anything, specifically space and marine
			biology, and I have carried that curiosity with me through my life. With this mideset I
			have been able to discover just how complex the our reality is and, through these
			discoveries, have come to appreciate just how beautiful our world is.
		</p>
	</Card>
	<section id="technologySection">
		<h2 class="sectionHeading">Technology I Use</h2>
		<div class="cardGrid">
			<Card>
				<p class="cardLabel">Development</p>
				<ul class="toolList">
					{#each developmentItems as item (item)}
						<li class="toolItem" id={item}>{item}</li>
					{/each}
				</ul>
			</Card>
			<Card>
				<p class="cardLabel">Software</p>
				<ul class="toolList">
					{#each softwareItems as item (item)}
						<li class="toolItem" id={item}>{item}</li>
					{/each}
				</ul>
			</Card>
		</div>
	</section>
	<section>
		<h2 class="sectionHeading">Languages</h2>
		<div class="cardGrid languageList">
			{#each languages as language (language.name)}
				<Card>
					<p class="cardLabel">{language.name}</p>
					<div class="languageMeta">
						<p><span>Status</span>{language.focus}</p>
						<p><span>Fluency</span>{language.fluency}</p>
						<p><span>Native Name</span>{language.nativeName}</p>
					</div>
				</Card>
			{/each}
		</div>
	</section>
	<section>
		<h2 class="sectionHeading">Links</h2>
		<div class="links">
			{#each links as link, i (i)}
				<ImageButton
					src={link.icon}
					alt={link.alt}
					onclick={() => {
						window.location.href = link.href;
					}}
				/>
			{/each}
		</div>
	</section>
</div>

<style>
	.content {
		color: var(--black);
		font-family: var(--font-body), sans-serif;
	}

	.title {
		font-family: var(--font-title), monospace;
		font-size: var(--fs-title);
		color: var(--black);
		text-transform: uppercase;
		letter-spacing: 0.02em;
		margin: 0 0 1rem 0;
	}

	section {
		margin-top: 2rem;
	}

	.sectionHeading {
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-h2);
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: var(--black);
		line-height: 1.3;
		letter-spacing: 0.02em;
	}

	.cardLabel {
		margin: 0 0 0.75rem 0;
		width: fit-content;
		padding: 0.3rem 0.5rem;
		font-size: var(--fs-body);
		font-family: var(--font-mono), monospace;
		font-weight: bold;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		background: transparent;
		border: 1px solid var(--black);
		color: var(--accent);
	}

	.sectionText {
		font-size: var(--fs-body);
		line-height: 1.7;
		font-weight: 400;
		margin: 0 0 1rem 0;
	}

	.sectionText:last-child {
		margin: 0;
	}

	.cardGrid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		padding: 0;
		list-style: none;
		margin: 0;
	}

	.toolList {
		display: flex;
		flex-wrap: wrap;
		padding: 0;
		padding-top: 0.75rem;
		margin: 0;
		list-style: none;
		border-top: 1px dashed color-mix(in srgb, var(--black), white 60%);
	}

	.toolItem {
		font-size: var(--fs-body);
		letter-spacing: 0.02em;
		line-height: 1.2;
		border: 1px solid var(--black);
		background-color: transparent;
		border-radius: var(--radius-sm);
		padding: 0.3rem 0.5rem;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.languageCard {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		line-height: 1.5;
		font-size: var(--fs-body);
	}

	.languageMeta {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.4rem;
	}

	.languageMeta p {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin: 0;
		padding-top: 0.35rem;
		border-top: 1px dashed color-mix(in srgb, var(--black), white 60%);
		font-size: var(--fs-body);
	}

	.languageMeta span {
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body-sm);
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--black), white 35%);
	}

	.links {
		display: flex;
		gap: 1rem;
	}

	@media (max-width: 700px) {
		.cardGrid {
			grid-template-columns: 1fr;
		}

		.sectionHeading {
			font-size: var(--fs-h1);
		}
	}
</style>

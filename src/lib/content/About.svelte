<script lang="ts">
	import AppPage from "$lib/components/desktop/AppPage.svelte";
	import monogram from "$lib/assets/brand/monogram.svg";

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
		"Swift",
		"Java",
		"Gdscript",
		"Svelte",
		"Linux",
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
</script>

<AppPage icon={monogram} title="Ian Gillette" subtitle="Game Design student at UCF">
	<section class="section">
		<h2 class="label">About</h2>
		<div class="prose">
			<p>
				Hello! My name is Ian Gillette. I'm currently studying Game Design at UCF. I want to
				learn how to make interactive art that can make peoples every day lives more fun and
				accessable. One of my biggest goals in life is to bring world class public transit
				back to the united states, for everyone to experience.
			</p>
			<p>
				Some things I enjoy are photography, drawing, programming, and learning new
				languages. My interests are always changing and expanding so I tend to stay busy
				with my hobbies.
			</p>
			<p>
				The ability to learn, in my opinion, is the most important ability humans have. Ever
				since I was little I loved learning just about anything, specifically space and
				marine biology, and I have carried that curiosity with me through my life. With this
				mideset I have been able to discover just how beautifully complex our world is.
			</p>
		</div>
	</section>

	<section class="section">
		<h2 class="label">Technology I Use</h2>
		<div class="groups">
			<div class="group">
				<h3 class="groupName">Development</h3>
				<ul class="tags">
					{#each developmentItems as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
			<div class="group">
				<h3 class="groupName">Software</h3>
				<ul class="tags">
					{#each softwareItems as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<section class="section">
		<h2 class="label">Languages</h2>
		<ul class="panels">
			{#each languages as language (language.name)}
				<li class="panel">
					<h3 class="panelName">{language.name}</h3>
					<dl class="meta">
						<div>
							<dt>Status</dt>
							<dd>{language.focus}</dd>
						</div>
						<div>
							<dt>Fluency</dt>
							<dd>{language.fluency}</dd>
						</div>
						<div>
							<dt>Native name</dt>
							<dd>{language.nativeName}</dd>
						</div>
					</dl>
				</li>
			{/each}
		</ul>
	</section>
</AppPage>

<style>
	.groups {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem 1.5rem;
	}

	.groupName,
	.panelName {
		margin: 0 0 0.5rem;
		font-size: var(--fs-body);
		font-weight: 700;
	}

	/* Same chips as the tags in Preview's info panel. */
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tags li {
		padding: 0.15rem 0.45rem;
		border: 1.5px solid var(--black);
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--backlight-3), white 30%);
		font-size: 0.75rem;
		font-weight: 700;
	}

	.panels {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0 0 4px;
		list-style: none;
	}

	.panel {
		padding: 0.75rem 0.9rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--backlight-2), white 45%);
		box-shadow: 0 3px 0 0 var(--black);
	}

	/* Label/value rows, like Preview's info panel. */
	.meta {
		display: grid;
		gap: 0.4rem;
		margin: 0;
	}

	.meta div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	dt {
		font-weight: 700;
		color: color-mix(in srgb, var(--black), white 35%);
	}

	dd {
		margin: 0;
		text-align: right;
	}

	@container (max-width: 560px) {
		.groups,
		.panels {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>

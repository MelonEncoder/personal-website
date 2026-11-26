<script lang="ts">
	import AppPage from "#lib/components/desktop/AppPage.svelte";

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

<AppPage app="about" title="Ian Gillette" subtitle="Economics B.S. student at UCF">
	<section class="section">
		<h2 class="label">About</h2>
		<div class="prose">
			<p>
				Hello! My name is Ian Gillette, and I'm currently studying economics at UCF. I've
				found that learning new things is genuinely fun, and that so much of it comes down
				to your mindset. That curiosity has taken me in a lot of directions. I've done lots
				of programming, art, and design, made some simple video games, worked on crafts and
				robotics, and gotten into photography, makeup, and cosplay. I also love to travel
				and go hiking.
			</p>
		</div>
	</section>

	<section class="section">
		<h2 class="label">Why Economics</h2>
		<div class="prose">
			<p>
				I'm drawn to economics because incentive structures interest me. I want to learn how
				economies work and how they influence the way people behave and make decisions.
			</p>
			<p>
				In particular, I'm interested in how policy and tax structure can create incentives
				that support the development of public infrastructure, like public transit, roads,
				local and national parks, and electrical grids, along with the public services
				communities rely on, like police, firefighters, food banks, and medical care.
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

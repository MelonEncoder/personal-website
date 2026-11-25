<script lang="ts">
	import AppPage from "./AppPage.svelte";
	import { screenshotPath, type Project } from "#lib/desktop/projects.ts";
	import { getWindowManager } from "#lib/desktop/windows.svelte.ts";
	import arrowOut from "#lib/assets/icons/arrow-outward.svg";

	/**
	 * A list of projects as cards (the Programming and Video Games apps). Clicking a game's
	 * screenshot opens it in Preview.
	 */
	let { projects, title, icon }: { projects: Project[]; title: string; icon: string } = $props();

	const wm = getWindowManager();

	function linkLabel(project: Project) {
		if (project.href.includes("github.com")) return "View on GitHub";
		if (project.href.includes("itch.io")) return "Play on itch.io";
		return "Open link";
	}
</script>

<AppPage {icon} {title} subtitle="{projects.length} project{projects.length === 1 ? '' : 's'}">
	<section class="section wide">
		<h2 class="label">Projects</h2>
		<ul class="cards">
			{#each projects as project (project.id)}
				<li class="card">
					{#if project.screenshot}
						<button
							type="button"
							class="shot"
							aria-label="Open {project.title} screenshot in Preview"
							onclick={() => wm.openPath(screenshotPath(project))}
						>
							<img
								src={project.screenshot.src}
								alt="{project.title} screenshot"
								loading="lazy"
								decoding="async"
							/>
						</button>
					{/if}
					<div class="info">
						<div class="heading">
							<img class="kindIcon" src={icon} alt="" aria-hidden="true" />
							<h3 class="name">{project.title}</h3>
						</div>
						<ul class="tags" aria-label="Year and technologies">
							<li class="year">{project.date}</li>
							{#each project.tags ?? [] as tag (tag)}
								<li>{tag}</li>
							{/each}
						</ul>
						<p class="description">{project.description}</p>
						<div class="actions">
							<a
								class="action"
								href={project.href}
								target="_blank"
								rel="external noopener noreferrer"
							>
								{linkLabel(project)}
								<img src={arrowOut} alt="" aria-hidden="true" />
							</a>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</section>
</AppPage>

<style>
	.section.wide {
		max-width: none;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0 0 4px;
		list-style: none;
	}

	/* Same bordered panel as the language panels in About Me. */
	.card {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--backlight-2), white 45%);
		box-shadow: 0 3px 0 0 var(--black);
	}

	.shot {
		display: block;
		padding: 0;
		border: none;
		border-bottom: 2px solid var(--black);
		background: var(--black);
		cursor: zoom-in;
	}

	.shot img {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}

	.shot:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: -4px;
	}

	.info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 0.85rem 0.9rem 0.9rem;
	}

	.heading {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.kindIcon {
		width: 1.1rem;
		height: 1.1rem;
		flex: 0 0 auto;
	}

	.name {
		margin: 0;
		font-size: var(--fs-body);
		font-weight: 700;
		line-height: 1.3;
	}

	/* Same chips as the tags in Preview and About Me; the year is blue. */
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

	.tags li.year {
		background: var(--white);
	}

	.description {
		margin: 0;
		font-family: var(--font-body), sans-serif;
		font-size: var(--fs-body-sm);
		line-height: 1.6;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: auto;
		padding-top: 0.25rem;
	}

	/* Same buttons as the link button in Preview. */
	.action {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.7rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		box-shadow: 0 3px 0 0 var(--black);
		color: var(--black);
		font: inherit;
		font-weight: 700;
		text-decoration: none;
		cursor: pointer;
	}

	.action:hover,
	.action:focus-visible {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent), white 65%);
		box-shadow: 0 3px 0 0 var(--accent);
		outline: none;
	}

	.action:active {
		transform: translateY(3px);
		box-shadow: none;
	}

	.action img {
		width: 0.95rem;
		height: 0.95rem;
	}
</style>

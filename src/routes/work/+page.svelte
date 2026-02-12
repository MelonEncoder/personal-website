<script lang="ts">
	import { resolve } from "$app/paths";

	interface WorkRoute {
		label: string;
		description: string;
		url: Parameters<typeof resolve>[0];
		extension: string;
	}

	const workRoutes: WorkRoute[] = [
		{
			label: "Programming Projects",
			description: "Code projects, tools, and experiments.",
			url: "/work/programming",
			extension: "dev"
		},
		{
			label: "Video Games",
			description: "Jam games and playable prototypes.",
			url: "/work/games",
			extension: "rom"
		},
		{
			label: "Graphic Design",
			description: "Posters, layout, and visual design work.",
			url: "/work/design",
			extension: "art"
		}
	];
</script>

<div class="content">
	<div class="workContent">
		<h1 class="title">My Work</h1>

		<ul class="fileGrid" aria-label="Work directory files">
			{#each workRoutes as route, i (i)}
				<li>
					<a class="fileCard" href={resolve(route.url)}>
						<div class="fileIcon" aria-hidden="true">
							<span class="fileFold"></span>
							<span class="fileExt">.{route.extension}</span>
						</div>
						<h2>{route.label}</h2>
						<p>{route.description}</p>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.content {
		color: var(--black);
	}

	.workContent {
		font-family: var(--font-1), sans-serif;
		color: var(--black);
	}

	.title {
		font-size: 2rem;
		line-height: 1.2;
		margin: 0.65rem 0 0.75rem;
		margin-bottom: 1.5rem;
	}

	.fileGrid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.25rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.fileCard {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1.15rem;
		border: 2px solid var(--black);
		background: var(--primary);
		text-decoration: none;
		color: var(--black);
		box-shadow: 0 4px 0 0 var(--black);
		transform: translateY(0);
		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease,
			border-color 0.12s ease,
			background 0.12s ease;
	}

	.fileCard:hover {
		transform: translateY(-4px);
		border-color: var(--accent);
		box-shadow: 0 8px 0 0 var(--accent);
		background: color-mix(in srgb, var(--primary), var(--accent) 10%);
	}

	.fileCard:active {
		transform: translateY(0);
		box-shadow: 0 2px 0 0 var(--accent);
	}

	.fileCard:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: 4px;
	}

	.fileIcon {
		position: relative;
		width: 3.15rem;
		height: 3.9rem;
		background-color: var(--white);
		border: 2px solid var(--black);
		box-shadow:
			inset 2px 2px 0 color-mix(in srgb, var(--white), white 40%),
			inset -2px -2px 0 color-mix(in srgb, var(--backlight), black 12%);
	}

	.fileFold {
		position: absolute;
		top: -2px;
		right: -2px;
		width: 1rem;
		height: 1rem;
		background: color-mix(in srgb, var(--accent), white 52%);
		border-left: 2px solid var(--black);
		border-bottom: 2px solid var(--black);
	}

	.fileExt {
		position: absolute;
		left: 0.35rem;
		bottom: 0.35rem;
		font-family: "Press Start 2P", monospace;
		font-size: 0.48rem;
		letter-spacing: 0.03em;
	}

	.fileCard h2 {
		font-size: 1.05rem;
		margin: 0;
		line-height: 1.3;
	}

	.fileCard p {
		font-size: 0.94rem;
		line-height: 1.5;
		margin: 0;
		color: color-mix(in srgb, var(--black), white 14%);
	}

	@media (max-width: 1200px) {
		.fileGrid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 700px) {
		.fileGrid {
			grid-template-columns: 1fr;
		}

		.title {
			font-size: 1.6rem;
		}
	}
</style>

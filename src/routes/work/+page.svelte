<script lang="ts">
	import { resolve } from "$app/paths";

	interface WorkRoute {
		label: string;
		description: string;
		url: Parameters<typeof resolve>[0];
		folderLabel: string;
	}

	const workRoutes: WorkRoute[] = [
		{
			label: "Programming Projects",
			description: "Code projects, tools, and experiments.",
			url: "/work/programming",
			folderLabel: ".DEV"
		},
		{
			label: "Video Games",
			description: "Jam games and playable prototypes.",
			url: "/work/games",
			folderLabel: ".ROM"
		},
		{
			label: "Graphic Design",
			description: "Posters, layout, and visual design work.",
			url: "/work/design",
			folderLabel: ".DSN"
		}
	];
</script>

<div class="content">
	<div class="workContent">
		<h1 class="title">MY WORK</h1>

		<ul class="fileGrid" aria-label="Work directory files">
			{#each workRoutes as route, i (i)}
				<li>
					<a class="fileLink" href={resolve(route.url)}>
						<div class="folderButton" aria-hidden="true">
							<div class="folderTab">{route.folderLabel}</div>
							<div class="folderBody">
								<span class="folderTitle">{route.label}</span>
							</div>
						</div>
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
		font-family: var(--font-body), sans-serif;
		color: var(--black);
	}

	.title {
		font-family: var(--font-title), monospace;
		font-size: var(--fs-h2);
		line-height: 1.2;
		margin: 0.65rem 0 0.75rem;
		margin-bottom: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.fileGrid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.25rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.fileLink {
		text-decoration: none;
		color: var(--black);
	}

	.fileLink:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: 4px;
	}

	.folderButton {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 2rem 1fr;
		box-sizing: border-box;
	}

	.folderTab {
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: start;
		padding: 0 1rem;
		border: 2px solid var(--black);
		border-bottom: 0;
		width: fit-content;
		border-top-left-radius: var(--radius-sm);
		border-top-right-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--backlight-3), white 30%);
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body);
		font-weight: 700;
		color: var(--black);
		transition: 0.12s ease;
	}

	.folderBody {
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		width: 100%;
		aspect-ratio: 2 / 1;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		border-top-left-radius: 0;
		background: color-mix(in srgb, var(--backlight-3), white 55%);
		box-shadow: 0 4px 0 0 var(--black);
		transition: 0.12s ease;
	}

	.folderTitle {
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-h3);
		font-weight: 700;
		letter-spacing: 0.02em;
		color: var(--black);
	}

	.fileLink:hover .folderTab {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--backlight-3), var(--accent) 14%);
	}

	.fileLink:hover .folderBody {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--backlight-3), var(--accent) 14%);
		box-shadow: 0 4px 0 0 var(--accent);
	}

	.fileLink:active .folderTab,
	.fileLink:active .folderBody {
		transform: translateY(4px);
		box-shadow: 0 0 0 0 var(--accent);
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
			font-size: var(--fs-h1);
		}
	}
</style>

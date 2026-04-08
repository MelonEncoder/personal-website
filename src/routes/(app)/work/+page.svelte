<script lang="ts">
	import { resolve } from "$app/paths";
	import FolderButton from "$lib/components/FolderButton.svelte";
	import joystickIcon from "$lib/assets/icons/joystick.svg";
	import codeIcon from "$lib/assets/icons/code-xml.svg";
	import imageIcon from "$lib/assets/icons/image.svg";

	const workRoutes = [
		{
			label: "Programming Projects",
			url: "/work/programming",
			icon: codeIcon,
			iconAlt: "Code Icon",
			tag: ".DEV"
		},
		{
			label: "Video Games",
			url: "/work/games",
			icon: joystickIcon,
			iconAlt: "Game Icon",
			tag: ".ROM"
		},
		{
			label: "Graphic Design",
			url: "/work/design",
			icon: imageIcon,
			iconAlt: "Graphic Icon",
			tag: ".DSN"
		}
	];
</script>

<div class="content">
	<div class="workContent">
		<h1 class="title">MY WORK</h1>

		<ul class="fileGrid" aria-label="Work directory files">
			{#each workRoutes as route, i (i)}
				<li>
					<FolderButton
						href={resolve(route.url)}
						tag={route.tag}
						title={route.label}
						icon={route.icon}
						iconAlt={route.iconAlt}
					/>
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
		margin: 0;
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

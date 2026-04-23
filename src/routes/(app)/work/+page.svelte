<script lang="ts">
	import FolderButton from "$lib/components/FolderButton.svelte";
	import joystickIcon from "$lib/assets/icons/joystick.svg";
	import codeIcon from "$lib/assets/icons/code-xml.svg";
	import imageIcon from "$lib/assets/icons/image.svg";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import Card from "$lib/components/Card.svelte";

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
	<h1 class="title">MY WORK</h1>

	<Card>
		<p class="bodyText">
			This section of the website hosts my personal projects which include my programming
			projects, video games, and digital media creations. This section will be continually
			updated and I've made sure to add a date to each project for reference.
		</p>
	</Card>

	<ul class="fileGrid" aria-label="Work directory files">
		{#each workRoutes as route, i (i)}
			<li>
				<FolderButton
					tag={route.tag}
					title={route.label}
					icon={route.icon}
					iconAlt={route.iconAlt}
					onclick={() => {
						goto(resolve(route.url));
					}}
				/>
			</li>
		{/each}
	</ul>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		font-family: var(--font-body), sans-serif;
		color: var(--black);
		gap: 2rem;
	}

	.title {
		font-family: var(--font-title), monospace;
		font-size: var(--fs-title);
		line-height: 1.2;
		margin: 0;
		margin-bottom: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.bodyText {
		font-size: var(--fs-body);
		line-height: 1.7;
		margin: 0;
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

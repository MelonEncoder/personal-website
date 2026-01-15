<script lang="ts">
	import infoIcon from "$lib/assets/icons/info.svg";
	import folderIcon from "$lib/assets/icons/folder.svg";
	import PaperLayout from "$lib/components/PaperLayout.svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	type RouteId = "about" | "work";

	const buttons: { id: RouteId; icon: string }[] = [
		{ id: "about", icon: infoIcon },
		{ id: "work", icon: folderIcon }
	];

	function go(id: RouteId) {
		let path: string = `/${id}`;
		goto(resolve(path));
	}
</script>

<PaperLayout showHeader={false}>
	<div class="content">
		<div class="welcomeText">
			<h1 class="welcomeTitle">
				I'm <span class="gradientText">Ian</span>
			</h1>
			<p class="subText">programmer & designer</p>
		</div>

		<div class="buttonStack">
			{#each buttons as button (button.id)}
				<button type="button" class="infoButton" onclick={() => go(button.id)}>
					<div class="buttonContent">
						<img src={button.icon} alt="" />
						{button.id}
					</div>
				</button>
			{/each}
		</div>
	</div>
</PaperLayout>

<style>
	.content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		height: 100%;
	}

	.welcomeTitle {
		font-size: clamp(2.2rem, 5vw, 3.25rem);
		line-height: 1.05;
		margin: 0 0 0.5rem 0;
		letter-spacing: -0.02em;
	}

	.subText {
		font-size: 1rem;
		margin: 0;
		opacity: 0.9;
	}

	.gradientText {
		color: var(--accent);
		/*background: var(--gradient);*/
		/*background-clip: text;*/
		/*-webkit-background-clip: text;*/
		/*-webkit-text-fill-color: transparent;*/
		/*-moz-background-clip: text;*/
		/*-moz-text-fill-color: transparent;*/
	}

	.buttonStack {
		display: grid;
		gap: 1.25rem;
		justify-items: start;
	}

	.infoButton {
		cursor: pointer;
		font-size: 1.25rem;
		font-weight: 800;
		padding: 1.25rem 1.5rem;
		border: 2px solid var(--black);
		border-radius: 0;
		width: min(36rem, 100%);
		background-color: var(--white);
		transform: translateY(-5px);
		box-shadow: 0 5px var(--black);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			border-color 0.2s ease;
	}

	.infoButton:hover {
		transform: translateY(-10px);
		box-shadow: 0 10px var(--accent);
		border-color: var(--accent);
	}

	.infoButton:active {
		transition:
			transform 0.08s ease,
			box-shadow 0.08s ease;
		box-shadow: 0 0px var(--accent);
		border-color: var(--accent);
		transform: translateY(0);
	}

	.buttonContent {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.buttonContent img {
		width: 1.75rem;
	}
</style>

<script lang="ts">
	import infoIcon from "$lib/assets/icons/info.svg";
	import linkIcon from "$lib/assets/icons/link.svg";
	import folderIcon from "$lib/assets/icons/folder.svg";

	interface InfoButton {
		id: SectionId;
		icon: string;
	}

	type SectionId = "about" | "links" | "work" | null;

	const infoButtons: InfoButton[] = [
		{
			id: "about",
			icon: infoIcon
		},

		{ id: "work", icon: folderIcon },
		{ id: "links", icon: linkIcon }
	];
</script>

<div class="page">
	<div class="grid">
		<div class="gridTop"></div>
		<div class="gridColumnLeft"></div>
		<div class="gridColumnRight"></div>
		<div class="gridCenterCell">
			<div class="welcomeText">
				<h1 class="welcomeTitle">
					I'm <span class="gradientText">Ian</span>
				</h1>
				<p class="subText">programmer & designer</p>
			</div>
			<div class="buttonStack">
				{#each infoButtons as button (button.id + "Button")}
					<button class="infoButton" id={button.id}>
						<div class="buttonContent">
							<img src={button.icon} alt="info icon" />
							{button.id}
						</div>
					</button>
				{/each}
			</div>
		</div>
		<div class="gridBottomRow"></div>
	</div>

	<section class="infoSection" id="about"></section>
	<section class="infoSection" id="work"></section>
	<section class="infoSection" id="links"></section>
</div>

<style>
	.page {
		min-height: 100dvh;
		width: 100%;
		background-color: var(--white);
		position: relative;
	}

	/* subtle paper grid background */
	.page::before {
		content: "";
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.18; /* tune */
		background-image:
			linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
		background-size: 24px 24px; /* grid size */
	}

	/* make content sit above the background grid */
	.grid {
		position: relative;
		z-index: 1;

		display: grid;
		min-height: 100dvh;
		width: 100%;

		grid-template-columns: 4rem minmax(0, 1fr) 4rem;
		grid-template-rows: 4rem 1fr;
	}

	/* top row rule */
	.gridTop {
		grid-column: 2 / 3;
		grid-row: 1 / 2;
		height: 4rem;

		border-bottom: 2px solid var(--black);
	}

	/* left/right gutters */
	.gridColumnLeft {
		grid-column: 1 / 2;
		grid-row: 1 / 3;

		border-right: 2px solid var(--black);
	}

	.gridColumnRight {
		grid-column: 3 / 4;
		grid-row: 1 / 3;

		border-left: 2px solid var(--black);
	}

	/* bottom rule */
	.gridBottomRow {
		grid-column: 1 / 4;
		grid-row: 3 / 4;

		border-top: 2px solid var(--black);
	}

	/* center content cell */
	.gridCenterCell {
		grid-column: 2 / 3;
		grid-row: 2 / 3;

		/* editorial whitespace */
		padding: clamp(2rem, 4vw, 5rem);

		/* center the content vertically without feeling “app-like” */
		display: grid;
		align-content: center;
		gap: 1.75rem;
	}

	.welcomeText {
		margin: 0;
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

	/* mobile */
	@media (max-width: 656px) {
		.grid {
			grid-template-columns: 2.75rem minmax(0, 1fr) 2.75rem;
		}

		.gridCenterCell {
			padding: 1.5rem;
		}
	}
</style>

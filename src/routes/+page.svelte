<script lang="ts">
	import infoIcon from "$lib/assets/icons/info.svg";
	import folderIcon from "$lib/assets/icons/folder.svg";
	import monogram from "$lib/assets/brand/monogram.svg";
	import About from "$lib/components/About.svelte";
	import Work from "$lib/components/Work.svelte";

	type WindowId = "about" | "work";

	const buttons: { id: WindowId; icon: string }[] = [
		{ id: "about", icon: infoIcon },
		{ id: "work", icon: folderIcon }
	];

	let activeWindow: WindowId | null = null;

	function setActiveWindow(id: WindowId | null) {
		if (id) {
			activeWindow = id;
		} else {
			activeWindow = null;
		}
	}

	let year = new Date().getFullYear().toString();
</script>

<div class="page">
	<div class="grid">
		<div class="gridTop"></div>
		<div class="gridLeft"></div>
		<div class="gridRight"></div>
		<div class="gridBottom"></div>

		<div class="gridSidebar">
			<section class="sidebarContent">
				<div class="welcomeText">
					<h1 class="welcomeTitle">
						I'm <span class="colorText">Ian</span>
					</h1>
					<p class="subText">programmer & designer</p>
				</div>

				<div class="buttonStack">
					{#each buttons as button (button.id)}
						<button
							type="button"
							class="contentButton"
							aria-pressed={activeWindow === button.id}
							onclick={() =>
								activeWindow === button.id
									? setActiveWindow(null)
									: setActiveWindow(button.id)}
						>
							<div class="buttonContent">
								<img src={button.icon} alt="" />
								{button.id}
							</div>
						</button>
					{/each}
				</div>
			</section>
		</div>

		<div class="brandContainer">
			<img class="monogram" src={monogram} alt="monogram" width="75px" />
			<p>&copy; {year} Ian Gillette</p>
		</div>

		<div class="gridCenterCell">
			<section class="centerContent">
				{#if activeWindow === "about"}
					<About />
				{:else if activeWindow === "work"}
					<Work />
				{/if}
			</section>
		</div>
	</div>
</div>

<style>
	.page {
		min-height: 100dvh;
		width: 100%;
		background-color: var(--white);
		position: relative;
		overflow: hidden; /* keep the page "one screen" */
	}

	.grid {
		position: relative;
		z-index: 1;
		display: grid;
		height: 100dvh; /* lock to screen */
		width: 100%;
		grid-template-columns: auto minmax(0, 1fr) 4rem;
		grid-template-rows: 4rem minmax(0, 1fr) 4rem;
	}

	.gridTop {
		grid-column: 1 / 4;
		grid-row: 1 / 2;
		display: grid;
		grid-template-columns: 4rem auto 4rem;
		border-bottom: 2px solid var(--black);
	}

	.gridLeft {
		grid-column: 1 / 2;
		grid-row: 1 / 4;
		grid-template-rows: 4rem 1fr 4rem;
		border-right: 2px solid var(--black);
	}

	.gridRight {
		grid-column: 3 / 4;
		grid-row: 1 / 4;
		grid-template-rows: 4rem 1fr 4rem;
		border-left: 2px solid var(--black);
	}

	.gridBottom {
		grid-column: 1 / 4;
		grid-row: 3 / 4;
		grid-template-columns: 4rem 1fr 4rem;
		border-top: 2px solid var(--black);
	}

	.gridCenterCell {
		grid-column: 2 / 3;
		grid-row: 2 / 3;

		box-sizing: border-box;
		height: 100%;
		width: 100%;
		overflow: hidden;

		background-color: var(--black);
		padding: 0;
	}

	.centerContent {
		box-sizing: border-box;
		overflow: auto;
		overscroll-behavior: contain;
		height: 100%;
		width: 100%;
		background-color: rgb(210, 242, 219);
		border: 10px solid var(--black);
		padding: clamp(1.25rem, 2.5vw, 3rem);

		-webkit-overflow-scrolling: touch;
	}

	.gridSidebar {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
		height: 100%;
		width: 400px;
	}

	.sidebarContent {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1rem;
	}

	.gridSidebar,
	.gridCenterCell {
		min-width: 0;
		min-height: 0;
	}

	.brandContainer {
		grid-column: 2 / 3;
		grid-row: 3 / 4;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.75rem;
		justify-content: center;
	}

	.brandContainer p {
		font-size: 0.875rem;
		margin: 0;
		color: var(--black);
		font-weight: 400;
	}

	.brandContainer .monogram {
		width: 1.75rem;
		aspect-ratio: 1 / 1;
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

	.colorText {
		color: var(--accent);
	}

	.buttonStack {
		display: grid;
		gap: 1.25rem;
		justify-items: start;
	}

	.contentButton {
		cursor: pointer;
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--black);

		padding: 1.1rem 1.25rem;
		width: clamp(10rem, 18vw, 14rem);

		background-color: var(--white);
		border: 2px solid var(--black);

		box-shadow: 0 4px 0 4px var(--black);
		transform: translateY(-4px);
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;
	}

	.contentButton[aria-pressed="true"] {
		border-color: var(--accent);
		box-shadow: 0 4px 0 4px var(--accent);
	}

	.contentButton:hover {
		transform: translateY(-12px);
		box-shadow: 0 10px var(--accent);
		border-color: var(--accent);
		box-shadow: 0 12px 0 4px var(--accent);
	}

	.contentButton:active {
		transition:
			transform 0.042s ease,
			box-shadow 0.042s ease;
		box-shadow: 0 0 var(--accent);
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

	@media (max-width: 1200px) {
		.grid {
			grid-template-columns: 1rem minmax(0, 1fr) 1rem;
			grid-template-rows: 3.5rem minmax(0, 1fr) auto;
		}

		.gridSidebar {
			grid-column: 2 / 3;
			grid-row: 3 / 4;
			width: 100%;
		}

		.sidebarContent {
			padding: 0.75rem;
			gap: 0.75rem;
		}

		.welcomeTitle {
			font-size: 1.8rem;
			margin: 0 0 0.25rem 0;
		}

		.subText {
			font-size: 0.95rem;
		}

		.buttonStack {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.75rem;
			justify-items: stretch;
		}

		.contentButton {
			width: 100%;
			font-size: 1.05rem;
			padding: 0.95rem 0.9rem;

			transform: translateY(-2px);
			box-shadow: 0 3px 0 3px var(--black);
		}

		.contentButton:hover {
			transform: translateY(-4px);
			box-shadow: 0 6px 0 3px var(--accent);
		}

		.buttonContent {
			justify-content: center;
			width: 100%;
		}

		.buttonContent img {
			width: 1.4rem;
		}

		.centerContent {
			padding: 1rem;
		}

		.brandContainer {
			grid-row: 1 / 2;
		}
	}

	@media (max-width: 520px) {
		.buttonStack {
			grid-template-columns: 1fr;
		}
	}
</style>

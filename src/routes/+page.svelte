<script lang="ts">
	import infoIcon from '$lib/assets/icons/info.svg';
	import linkIcon from '$lib/assets/icons/link.svg';
	import folderIcon from '$lib/assets/icons/folder.svg';
	import About from './About.svelte';
	import Work from './Work.svelte';
	import Links from './Links.svelte';
	import Modal from '$lib/components/Modal.svelte';

	type FloatingWindows = 'About' | 'Links' | 'Work' | undefined;

	let floatingWindow: FloatingWindows = undefined;

	function closeModal() {
		floatingWindow = undefined;
	}
</script>

<div class="page">
	<div>
		<div class="welcome-container">
			<h1 class="welcome-text">
				I'm <span class="grad-text">Ian Gillette</span>
			</h1>
			<p class="sub-heading-text">Problem Solver / Programmer / Designer</p>
		</div>
		<ul class="welcome-list">
			<li class="welcome-list-item">
				<button
					class="welcome-list-button"
					id="about-button"
					onclick={() => {
						floatingWindow = 'About';
					}}
				>
					<div class="button-content">
						<img src={infoIcon} alt="info icon" />
						about
					</div>
				</button>
			</li>
			<li class="welcome-list-item">
				<button
					class="welcome-list-button"
					id="links-button"
					onclick={() => {
						floatingWindow = 'Links';
					}}
				>
					<div class="button-content">
						<img src={linkIcon} alt="link icon" />
						links
					</div>
				</button>
			</li>
			<li class="welcome-list-item">
				<button
					class="welcome-list-button"
					id="work-button"
					onclick={() => {
						floatingWindow = 'Work';
					}}
				>
					<div class="button-content">
						<img src={folderIcon} alt="folder icon" />
						work
					</div>
				</button>
			</li>
		</ul>
		{#if floatingWindow !== undefined}
			<Modal {closeModal}>
				{#if floatingWindow === 'About'}
					<About />
				{:else if floatingWindow === 'Work'}
					<Work />
				{:else if floatingWindow === 'Links'}
					<Links />
				{/if}
			</Modal>
		{/if}
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		place-content: center;
		min-height: 100dvh;
		background-color: var(--white);
	}

	.welcome-container {
		text-align: center;
		margin-bottom: 4.5rem;
	}

	.welcome-text {
		font-size: 3.5rem;
		margin-bottom: 0.5rem;
		margin-top: 0;
	}

	.sub-heading-text {
		font-size: 1rem;
		margin: 0;
	}

	.grad-text {
		background: var(--accent-main);
		background-clip: text;

		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		-moz-background-clip: text;
		-moz-text-fill-color: transparent;
	}

	.welcome-list {
		display: flex;
		flex-direction: column;
		list-style: none;
		padding: 0;
		text-align: center;
		margin: 0;
	}

	.welcome-list-item {
		margin-bottom: 1.5rem;
	}

	.welcome-list-item:last-child {
		margin-bottom: 0;
	}

	.welcome-list-button {
		cursor: pointer;
		font-size: 1.5rem;
		font-weight: 800;
		padding: 1.5rem;
		border: 2px solid var(--black);
		border-radius: 8px;
		width: 600px;
		background-color: transparent;
		box-shadow: 0 5px var(--black);
		transition: all 0.2s ease;
	}

	.welcome-list-button:hover {
		box-shadow: 0 10px var(--accent-main-1);
		border-color: var(--accent-main-1);
		transform: translateY(-5px);
	}

	.welcome-list-button:active {
		transition: all 0.08s ease;
		box-shadow: 0 0px var(--accent-main-1);
		border-color: var(--accent-main-1);
		transform: translateY(5px);
	}

	.button-content {
		display: flex;
		flex-direction: row;
		place-content: center;
	}

	.button-content img {
		width: 2rem;
		margin-right: 0.5rem;
	}

	@media (max-width: calc(1200px + 1.5rem)) {
		.page {
			padding: 0 1.5rem;
		}
	}

	@media (max-width: 700px) {
		.welcome-list-button {
			width: 100%;
		}
	}
</style>

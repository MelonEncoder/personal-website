<script lang="ts">
	import githubLogo from '$lib/assets/icons/logo-github.svg';
	import linkedinLogo from '$lib/assets/icons/logo-linkedin.svg';
</script>

<div class="links-content">
	<h1 class="main-heading grad-text">Links</h1>
	<div class="links">
		<a
			class="link section-heading"
			id="github"
			href="https://github.com/MelonEncoder"
			rel="external"
		>
			<img src={githubLogo} alt="github logo" />
			GitHub
		</a>
		<a
			class="link section-heading"
			id="linkedin"
			href="https://linkedin.com/in/iangillette"
			rel="external"
		>
			<img src={linkedinLogo} alt="linkedin logo" />
			LinkedIn
		</a>
	</div>
</div>

<style>
	.main-heading {
		font-size: 3rem;
		font-weight: 800;
		margin: 0 0 1.5rem 0;
		color: var(--black);
		line-height: 1.2;
	}

	.section-heading {
		font-size: 2rem;
		font-weight: 700;
		margin: 2rem 0 1rem 0;
		color: var(--black);
		line-height: 1.3;
	}

	.links {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.link {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--black);
		border-radius: 0.5rem;
		text-decoration: none;
		padding: 2rem 1rem;
		transition: all 0.2s ease;
		box-shadow: 0 5px var(--black);
	}

	.link:hover {
		box-shadow: 0 10px var(--accent-main-1);
		border-color: var(--accent-main-1);
		transform: translateY(-5px);
	}

	.link:active {
		transition: all 0.08s ease;
		box-shadow: 0 0 var(--accent-main-1);
		border-color: var(--accent-main-1);
		transform: translateY(5px);
	}

	.link > img {
		width: 5rem;
		margin-bottom: 1rem;
	}

	.grad-text {
		background: var(--accent-main);
		background-clip: text;

		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		-moz-background-clip: text;
		-moz-text-fill-color: transparent;
	}

	@media (max-width: 700px) {
		.links {
			grid-template-columns: 1fr;
		}
	}
</style>

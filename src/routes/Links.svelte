<script lang="ts">
	import githubLogo from "$lib/assets/icons/logo-github.svg";
	import linkedinLogo from "$lib/assets/icons/logo-linkedin.svg";
</script>

<div class="links-content">
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
	.section-heading {
		font-size: 2rem;
		font-weight: 700;
		color: var(--black);
		line-height: 1.3;
	}

	.links {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
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

		transform: translateY(-5px);
		box-shadow: 0 5px var(--black);
		transition: all 0.2s ease;
	}

	.link:hover {
		transform: translateY(-10px);
		box-shadow: 0 10px var(--accent);
		border-color: var(--accent);
	}

	.link:active {
		transition: all 0.08s ease;
		box-shadow: 0 0 var(--accent);
		border-color: var(--accent);
		transform: translateY(0);
	}

	.link > img {
		width: 5rem;
		margin-bottom: 1rem;
	}

	@media (max-width: 700px) {
		.links {
			grid-template-columns: minmax(1rem, 1fr);
		}
	}
</style>

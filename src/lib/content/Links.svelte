<script lang="ts">
	import { LINKS } from "$lib/desktop/links";
	import arrowOut from "$lib/assets/icons/arrow-outward.svg";
</script>

<div class="links">
	<h1 class="title">LINKS</h1>
	<p class="intro">Find me and my work elsewhere on the web.</p>
	<ul class="list">
		{#each LINKS as link (link.href)}
			<li>
				<a class="link" href={link.href} target="_blank" rel="external noopener noreferrer">
					<span class="logo"><img src={link.icon} alt={link.alt} /></span>
					<span class="text">
						<span class="label">{link.label}</span>
						<span class="handle">{link.handle}</span>
					</span>
					<img class="arrow" src={arrowOut} alt="" aria-hidden="true" />
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.links {
		color: var(--black);
		font-family: var(--font-body), sans-serif;
	}

	.title {
		font-family: var(--font-title), monospace;
		font-size: var(--fs-h1);
		text-transform: uppercase;
		letter-spacing: 0.02em;
		margin: 0 0 0.75rem 0;
	}

	.intro {
		margin: 0 0 1.5rem 0;
		line-height: 1.6;
	}

	.list {
		display: grid;
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.link {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		box-shadow: 0 4px 0 0 var(--black);
		transform: translateY(-4px);
		color: var(--black);
		text-decoration: none;
		transition: 0.12s ease;
	}

	.link:hover,
	.link:focus-visible {
		border-color: var(--accent);
		box-shadow: 0 4px 0 0 var(--accent);
		background: color-mix(in srgb, var(--accent), white 65%);
		outline: none;
	}

	.link:active {
		transform: translateY(0);
		box-shadow: 0 0 0 0 var(--accent);
	}

	.logo {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		flex: 0 0 auto;
	}

	.logo img {
		width: 2.25rem;
		height: 2.25rem;
	}

	.text {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.label {
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-h3);
		font-weight: 700;
	}

	.handle {
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body-sm);
		color: color-mix(in srgb, var(--black), white 35%);
	}

	.arrow {
		width: 1.5rem;
		height: 1.5rem;
		flex: 0 0 auto;
	}
</style>

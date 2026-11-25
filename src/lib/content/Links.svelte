<script lang="ts">
	import AppPage from "$lib/components/desktop/AppPage.svelte";
	import { LINKS } from "$lib/desktop/links";
	import linkIcon from "$lib/assets/icons/link.svg";
	import arrowOut from "$lib/assets/icons/arrow-outward.svg";
</script>

<AppPage icon={linkIcon} title="Links" subtitle="Find me and my work elsewhere on the web.">
	<section class="section">
		<h2 class="label">Profiles</h2>
		<ul class="list">
			{#each LINKS as link (link.href)}
				<li>
					<a
						class="row"
						href={link.href}
						target="_blank"
						rel="external noopener noreferrer"
					>
						<span class="tile"><img src={link.icon} alt={link.alt} /></span>
						<span class="text">
							<span class="name">{link.label}</span>
							<span class="handle">{link.handle}</span>
						</span>
						<img class="arrow" src={arrowOut} alt="" aria-hidden="true" />
					</a>
				</li>
			{/each}
		</ul>
	</section>
</AppPage>

<style>
	.list {
		display: grid;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* Rows highlight like items in the Explorer. */
	.row {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.55rem 0.6rem;
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		color: var(--black);
		text-decoration: none;
	}

	.row:hover,
	.row:focus-visible {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent), white 82%);
		outline: none;
	}

	.tile {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 2.75rem;
		height: 2.75rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		box-shadow: 0 3px 0 0 var(--black);
	}

	.tile img {
		width: 1.6rem;
		height: 1.6rem;
	}

	.text {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	.name {
		font-size: var(--fs-body);
		font-weight: 700;
	}

	.handle {
		color: color-mix(in srgb, var(--black), white 35%);
	}

	.arrow {
		width: 1.1rem;
		height: 1.1rem;
		flex: 0 0 auto;
		opacity: 0.6;
	}

	.row:hover .arrow,
	.row:focus-visible .arrow {
		opacity: 1;
	}
</style>

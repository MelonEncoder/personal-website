<script lang="ts">
	import AppPage from "#lib/components/desktop/AppPage.svelte";
	import { LINKS } from "#lib/desktop/links.ts";
	import arrowOut from "#lib/assets/icons/arrow-outward.svg";
</script>

<AppPage app="links" title="Links" subtitle="Find me and my work elsewhere on the web.">
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
						<span class="tile" aria-hidden="true">
							<span class="logo" style:--logo={`url("${link.icon}")`}></span>
						</span>
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

	/* Flat tiles in the app icons' colors: light pink, black outline, hot pink mark. */
	.tile {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 2.75rem;
		height: 2.75rem;
		box-sizing: border-box;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--glyph-light);
		transition: background 0.12s ease;
	}

	.row:hover .tile,
	.row:focus-visible .tile {
		background: var(--glyph-mid);
	}

	/* The logo files are single-color, so they're used as masks and painted in the accent. */
	.logo {
		width: 1.6rem;
		height: 1.6rem;
		background: var(--accent);
		mask: var(--logo) center / contain no-repeat;
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

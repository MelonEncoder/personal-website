<script lang="ts">
	import monogram from "#lib/assets/brand/monogram.svg";
	import { SITE } from "#lib/site.ts";
</script>

<div class="aboutSite">
	<img class="monogram" src={monogram} alt="{SITE.owner} monogram" />
	<h1 class="title">{SITE.osName}</h1>
	<p class="version">Version {SITE.version} &middot; {SITE.edition}</p>
	<dl class="specs">
		<div>
			<dt>Owner</dt>
			<dd>{SITE.owner}</dd>
		</div>
		<div>
			<dt>Built with</dt>
			<dd>Svelte 5 &amp; SvelteKit 3</dd>
		</div>
	</dl>
	<p class="copyright">{SITE.copyright.long}</p>
</div>

<style>
	/* White scrolling body, like AppPage's, around the original centered layout. */
	.aboutSite {
		flex: 1;
		min-height: 0;
		overflow: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.35rem;
		padding: 1.5rem 1.25rem;
		background: var(--white);
		color: var(--black);
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body-sm);
		scrollbar-color: var(--accent) transparent;
	}

	.monogram {
		width: 4.5rem;
		height: auto;
		margin-bottom: 0.5rem;
	}

	/* Same type as the app headers, a size up. */
	.title {
		margin: 0;
		font-family: var(--font-title);
		font-size: var(--fs-h2);
		font-weight: 700;
		line-height: 1.25;
	}

	.version {
		margin: 0;
		color: color-mix(in srgb, var(--black), white 35%);
	}

	/* Same card and label/value rows as the Languages cards in About Me. */
	.specs {
		display: grid;
		gap: 0.4rem;
		width: min(100%, 22rem);
		margin: 1rem 0;
		padding: 0.75rem 0.9rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--backlight-2), white 45%);
		box-shadow: 0 3px 0 0 var(--black);
		text-align: left;
	}

	.specs div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	dt {
		font-weight: 700;
		color: color-mix(in srgb, var(--black), white 35%);
	}

	dd {
		margin: 0;
		text-align: right;
	}

	.copyright {
		margin: 0;
		font-size: 0.75rem;
		color: color-mix(in srgb, var(--black), white 35%);
	}
</style>

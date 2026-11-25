<script lang="ts">
	import monogram from "$lib/assets/brand/monogram.svg";

	const year = new Date().getFullYear();
</script>

<div class="aboutSite">
	<img class="monogram" src={monogram} alt="Ian Gillette monogram" />
	<h1 class="title">IG-OS</h1>
	<p class="version">Version 0.4 &middot; Portfolio Edition</p>
	<dl class="specs">
		<div>
			<dt>Owner</dt>
			<dd>Ian Gillette</dd>
		</div>
		<div>
			<dt>Built with</dt>
			<dd>Svelte 5 &amp; SvelteKit 2</dd>
		</div>
		<div>
			<dt>Display</dt>
			<dd>Retro desktop, CRT scanlines</dd>
		</div>
	</dl>
	<p class="copyright">&copy; {year} Ian Gillette. All rights reserved.</p>
</div>

<style>
	.aboutSite {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.5rem;
		font-family: var(--font-mono), monospace;
		color: var(--black);
		padding: 0.5rem 0;
	}

	.monogram {
		width: 4.5rem;
		height: auto;
		margin-bottom: 0.5rem;
	}

	.title {
		font-family: var(--font-title), monospace;
		font-size: var(--fs-h1);
		margin: 0;
	}

	.version {
		margin: 0;
		font-size: var(--fs-body-sm);
		color: color-mix(in srgb, var(--black), white 35%);
	}

	.specs {
		display: grid;
		gap: 0.35rem;
		margin: 1rem 0;
		font-size: var(--fs-body-sm);
	}

	.specs div {
		display: grid;
		grid-template-columns: 6rem 1fr;
		gap: 0.75rem;
		text-align: left;
	}

	dt {
		font-weight: 700;
		text-align: right;
	}

	dd {
		margin: 0;
	}

	.copyright {
		margin: 0;
		font-size: 0.75rem;
		color: color-mix(in srgb, var(--black), white 35%);
	}
</style>

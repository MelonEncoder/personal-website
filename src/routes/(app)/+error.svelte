<script lang="ts">
	import { page } from "$app/state";
	import { resolve } from "$app/paths";
</script>

<div class="errorWrap">
	<div class="errorWindow" role="alertdialog" aria-labelledby="error-title">
		<header class="titleBar">
			<span>System Error</span>
		</header>
		<div class="body">
			<p class="code" aria-hidden="true">!</p>
			<div>
				<h1 id="error-title">Error {page.status}</h1>
				<p>{page.error?.message ?? "Something went wrong."}</p>
				<p class="path">{page.url.pathname}</p>
				<a href={resolve("")}>Back to Desktop</a>
			</div>
		</div>
	</div>
</div>

<style>
	.errorWrap {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		padding: 1rem;
		pointer-events: none;
	}

	.errorWindow {
		pointer-events: auto;
		width: min(28rem, 100%);
		background: var(--white);
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		box-shadow: 6px 6px 0 0 var(--black);
		font-family: var(--font-mono), sans-serif;
		color: var(--black);
		z-index: 400;
	}

	.titleBar {
		padding: 0.45rem 0.75rem;
		border-bottom: 2px solid var(--black);
		background: var(--accent);
		color: var(--white);
		font-weight: 700;
		font-size: var(--fs-body-sm);
	}

	.body {
		display: flex;
		gap: 1rem;
		padding: 1.25rem;
	}

	.code {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 2.75rem;
		height: 2.75rem;
		margin: 0;
		border: 2px solid var(--black);
		border-radius: 50%;
		background: var(--accent-2);
		font-family: var(--font-title), monospace;
		font-size: 1.1rem;
	}

	h1 {
		margin: 0 0 0.4rem;
		font-size: var(--fs-h3);
		text-transform: uppercase;
	}

	p {
		margin: 0 0 0.5rem;
		line-height: 1.5;
	}

	.path {
		font-size: var(--fs-body-sm);
		color: color-mix(in srgb, var(--black), white 40%);
		overflow-wrap: anywhere;
	}

	a {
		display: inline-block;
		margin-top: 0.5rem;
		padding: 0.5rem 0.9rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		box-shadow: 0 3px 0 0 var(--black);
		color: var(--black);
		font-weight: 700;
		text-decoration: none;
	}

	a:hover {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent), white 65%);
		box-shadow: 0 3px 0 0 var(--accent);
	}
</style>

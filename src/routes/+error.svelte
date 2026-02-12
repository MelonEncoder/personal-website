<script lang="ts">
	import { page } from "$app/state";
	import { resolve } from "$app/paths";

	const message = page.error?.message ?? "error";
	const value = page.state;
</script>

<div class="errorPage">
	<p class="pathText">system/error</p>
	<h1>Error {value}</h1>
	<p>{message}</p>
	<a href={resolve("/")} aria-label="go home">Go Home</a>
</div>

<style>
	.errorPage {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 0.75rem;
		height: 100%;
		font-family: var(--font-1), sans-serif;
		color: var(--black);
	}

	.pathText {
		font-family: "Press Start 2P", monospace;
		font-size: 0.6rem;
		margin: 0;
		letter-spacing: 0.05em;
		color: color-mix(in srgb, var(--black), white 30%);
	}

	h1 {
		margin: 0;
		font-size: 2rem;
		line-height: 1.2;
	}

	p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.6;
	}

	a {
		margin-top: 0.6rem;
		text-decoration: none;
		color: var(--black);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 0.7rem 1rem;
		border: 2px solid var(--black);
		background: var(--primary);
		box-shadow: 0 4px 0 0 var(--black);
		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease,
			border-color 0.12s ease,
			background-color 0.12s ease;
	}

	a:hover {
		transform: translateY(-2px);
		border-color: var(--accent);
		background: color-mix(in srgb, var(--primary), var(--accent) 10%);
		box-shadow: 0 6px 0 0 var(--accent);
	}

	a:active {
		transform: translateY(0);
		box-shadow: 0 2px 0 0 var(--accent);
	}
</style>

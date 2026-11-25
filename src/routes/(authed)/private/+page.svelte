<script lang="ts">
	import { enhance } from "$app/forms";
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import type { ActionData, PageData } from "./$types";

	let { data, form }: { data: PageData; form: ActionData } = $props();

	/** Shown inside a desktop window (Job Materials): compact, no big title. */
	const embedded = $derived(page.url.searchParams.get("embed") === "1");

	function embeddedEnhance() {
		return async ({
			result,
			update
		}: {
			result: { type: string };
			update: (opts?: { reset?: boolean }) => Promise<void>;
		}) => {
			if (result.type === "redirect") {
				window.parent.location.reload();
			} else {
				await update();
			}
		};
	}
</script>

<div class="content" class:embedded>
	{#if data.authenticated}
		<h1 class="title">PRIVATE FILES</h1>
		<p class="signedIn">You are signed in!</p>
		<a class="button" href={resolve("/")}>Go Home</a>
	{:else}
		{#if embedded}
			<p class="hint">Enter the password to view this file.</p>
		{:else}
			<h1 class="title">PRIVATE FILES</h1>
		{/if}
		<form
			method="POST"
			use:enhance={data.redirectTo ? embeddedEnhance : undefined}
			class="form"
		>
			<label class="label" for="password">Password</label>
			<div class="row">
				<input
					id="password"
					class="input"
					type="password"
					name="password"
					autocomplete="current-password"
					required
				/>
				<button class="button" type="submit">Enter</button>
			</div>
			{#if form?.error}
				<p class="error">{form.error}</p>
			{/if}
		</form>
	{/if}
</div>

<style>
	.content {
		color: var(--black);
		font-family: var(--font-body), sans-serif;
	}

	.title {
		font-family: var(--font-title), monospace;
		font-size: var(--fs-title);
		color: var(--black);
		text-transform: uppercase;
		letter-spacing: 0.02em;
		margin: 0 0 2rem 0;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-width: 24rem;
	}

	.label {
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body-sm);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.row {
		display: flex;
		gap: 0;
	}

	.input {
		flex: 1;
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body);
		padding: 0.55rem 0.75rem;
		border: 2px solid var(--black);
		border-right: none;
		border-radius: var(--radius-sm) 0 0 var(--radius-sm);
		background-color: var(--white);
		color: var(--black);
		outline: none;
	}

	.input:focus {
		border-color: var(--accent);
	}

	.error {
		font-size: var(--fs-body-sm);
		color: var(--accent);
		margin: 0.25rem 0 0 0;
	}

	.signedIn {
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-h2);
		font-weight: 700;
		color: var(--black);
		margin: 0 0 1rem 0;
	}

	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.62rem 1rem;
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		background: var(--white);
		color: var(--black);
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		box-shadow: 0 4px 0 0 var(--black);
		transform: translateY(-4px);
		transition: 0.12s ease;
	}

	.button:hover {
		border-color: var(--accent);
		box-shadow: 0 4px 0 0 var(--accent);
		background-color: color-mix(in srgb, var(--accent), white 65%);
	}

	.button:active {
		border-color: var(--accent);
		transform: translateY(0);
		box-shadow: 0 0 0 0 var(--accent);
	}

	/* Embedded in a desktop window: matches the app style (small mono text, flat controls). */
	.content.embedded {
		width: min(24rem, 100%);
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body-sm);
	}

	.hint {
		margin: 0 0 0.75rem;
		color: color-mix(in srgb, var(--black), white 30%);
	}

	.content.embedded .label {
		letter-spacing: 0.06em;
		color: color-mix(in srgb, var(--black), white 30%);
	}

	.content.embedded .input {
		min-width: 0;
		font-size: var(--fs-body-sm);
		padding: 0.45rem 0.65rem;
	}

	.content.embedded .button {
		padding: 0.45rem 0.85rem;
		font-size: var(--fs-body-sm);
		letter-spacing: 0.04em;
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
		box-shadow: none;
		transform: none;
	}

	.content.embedded .button:hover {
		background-color: var(--accent);
		border-color: var(--black);
		color: var(--white);
		box-shadow: none;
	}
</style>

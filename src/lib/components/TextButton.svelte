<script lang="ts">
	interface Props {
		type: "primary" | "secondary";
		text: string;
		onclick: () => void;
	}

	let { type, text, onclick }: Props = $props();
</script>

<button class={`textButton ${type}`} {onclick}>
	{text}
</button>

<style>
	.textButton {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.62rem 1rem;
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		box-shadow: 0 4px 0 0 var(--black);
		transform: translateY(-4px);
		cursor: pointer;
		transition: 0.12s ease;
	}

	.textButton.primary {
		background: var(--accent);
		color: var(--white);
	}

	.textButton.secondary {
		background: var(--white);
		color: var(--black);
	}

	.textButton:hover {
		border-color: var(--accent);
		box-shadow: 0 4px 0 0 var(--accent);
		background-color: color-mix(in srgb, var(--accent), white 65%);
		color: var(--black);
	}

	.textButton:active {
		border-color: var(--accent);
		transform: translateY(0);
		box-shadow: 0 0 0 0 var(--accent);
	}
</style>

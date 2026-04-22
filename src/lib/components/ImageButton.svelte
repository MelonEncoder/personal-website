<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		onclick: () => void;
	}

	let { src, alt, onclick }: Props = $props();
</script>

<button class="imageButton" {onclick}>
	<img {src} {alt} />
</button>

<style>
	.imageButton {
		display: flex;
		align-items: center;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		padding: 1rem;
		background-color: var(--white);
		box-shadow: 0 4px 0 0 var(--black);
		transform: translateY(-4px);
		text-decoration: none;
		transition: 0.12s ease;
	}

	.imageButton:hover {
		border-color: var(--accent);
		box-shadow: 0 4px 0 0 var(--accent);
		background-color: color-mix(in srgb, var(--accent), white 65%);
		cursor: pointer;
	}

	.imageButton:active {
		transform: translateY(0);
		box-shadow: 0 0 0 0 var(--accent);
	}

	.imageButton > img {
		width: 4rem;
		aspect-ratio: 1 / 1;
	}
</style>

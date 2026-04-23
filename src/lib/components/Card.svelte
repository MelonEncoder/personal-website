<script lang="ts">
	let { children } = $props();
</script>

<div class="card">
	{@render children?.()}
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		background-color: var(--white);
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		padding: clamp(1rem, 2.5vw, 1.8rem);
		max-width: var(--content-max-width);
	}
</style>

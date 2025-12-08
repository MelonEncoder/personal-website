<script lang="ts">
	let { children, closeModal } = $props();

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeModal();
		}
	}

	let dragging = $state(false);
	let x = $state(0);
	let y = $state(0);
	let offsetX = 0;
	let offsetY = 0;

	function dragStart(e: MouseEvent | TouchEvent) {
		dragging = true;
		const clientX = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX;
		const clientY = (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;
		offsetX = clientX - x;
		offsetY = clientY - y;
	}

	function drag(e: MouseEvent | TouchEvent) {
		if (dragging) {
			const clientX = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX;
			const clientY = (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;
			x = clientX - offsetX;
			y = clientY - offsetY;
		}
	}

	function dragEnd() {
		dragging = false;
	}
</script>

<svelte:window onkeydown={handleKeydown} />
<svelte:document onmousemove={drag} onmouseup={dragEnd} ontouchmove={drag} ontouchend={dragEnd} />

<div class="modal-backdrop" onclick={handleBackdropClick} role="presentation">
	<div
		class="modal-window"
		style:transform={`translate(${x}px, ${y}px)`}
		role="dialog"
		aria-modal="true"
	>
		<div
			class="modal-header"
			role="button"
			tabindex="-1"
			onmousedown={dragStart}
			ontouchstart={dragStart}
		>
			<button class="close-button" onclick={closeModal} aria-label="Close modal">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</div>
		<div class="modal-content">
			{@render children?.()}
		</div>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(100, 100, 100, 0.05);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		backdrop-filter: blur(3px);
	}

	.modal-window {
		position: relative;
		background-color: var(--white-1);
		border: 2px solid var(--black-1);
		border-radius: 1rem;
		box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.25);
		max-width: 90vw;
		max-height: 85vh;
		width: 600px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.modal-header {
		border-bottom: 2px solid var(--black-1);
		padding: 0.75rem 1rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		cursor: move;
		user-select: none;
		background-color: var(--black-1);
	}

	.close-button {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--white-1);
		border-radius: 4px;
		transition: all 0.2s;
	}

	.close-button:hover {
		background-color: var(--accent-main-1);
	}

	.modal-content {
		padding: 2rem;
		overflow-y: auto;
		flex: 1;
	}

	@media (max-width: 700px) {
		.modal-window {
			width: 95vw;
			max-height: 90vh;
		}

		.modal-content {
			padding: 1.5rem;
		}
	}
</style>

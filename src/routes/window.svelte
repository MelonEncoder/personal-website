<script lang="ts">
	let dragging: boolean = false;
	let x = $state(399); // initial x position
	let y = $state(399); // initial y position
	let offsetX: number;
	let offsetY: number;

	function dragStart(e: MouseEvent | TouchEvent) {
		dragging = true;
		offsetX = (e as MouseEvent).clientX - x || (e as TouchEvent).touches[0].clientX - x;
		offsetY = (e as MouseEvent).clientY - y || (e as TouchEvent).touches[0].clientY - y;
	}

	function drag(e: MouseEvent | TouchEvent) {
		if (dragging) {
			x = (e as MouseEvent).clientX - offsetX || (e as TouchEvent).touches[0].clientX - offsetX;
			y = (e as MouseEvent).clientY - offsetY || (e as TouchEvent).touches[0].clientY - offsetY;
		}
	}

	function dragEnd() {
		dragging = false;
	}
</script>

<svelte:document onmousemove={drag} onmouseup={dragEnd} ontouchmove={drag} ontouchend={dragEnd} />

<div class="window" style:left={`${x}px`} style:top={`${y}px`}>
	<button
		class="bar"
		aria-label="Window Drag Handel"
		onmousedown={dragStart}
		ontouchstart={dragStart}
	></button>
	<div class="content">
		<p>hello</p>
	</div>
</div>

<style>
	.window {
		position: absolute;
		z-index: 99;
		box-shadow: 10 10 10 10 var(--black-1);
		border: 2px solid var(--black-1);
		width: 400px;
		height: 300px;
		padding: 0;
		box-sizing: border-box;
		overflow-block: scroll;
		background-color: var(--white-2);
		border-radius: 1rem;
	}
	.bar {
		margin: 0;
		border: 0;
		border-bottom: 2px solid var(--black-1);
		width: 100%;
		height: 40px;
		background-color: transparent;
	}
</style>

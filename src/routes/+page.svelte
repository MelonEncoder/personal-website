<script>
	import monogram from '$lib/assets/monogram.svg';

	function aboutBtn() {}
</script>

<div id="page">
	<div id="container">
		<img src={monogram} alt="ian's monogram" width="100px" />
		<h1>Ian Gillette</h1>
		<nav>
			<ul>
				<li>
					<button onclick={aboutBtn}> about </button>
				</li>
				<li>
					<button>projects</button>
				</li>
				<li><button>graphic</button></li>
			</ul>
		</nav>
	</div>
</div>

<style>
	#page {
		padding: 0 1rem;
	}

	#container {
		display: flex;
		flex-direction: column;
		place-items: center;
		justify-self: center;
		align-self: center;
		padding: 40px;
		background-color: var(--black-1);
		color: var(--white-1);
		max-width: 700px;
		margin: auto;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}

	ul {
		display: flex;
		flex-direction: row;
		padding: 0;
		list-style: none;
	}

	button {
		padding: 0.5rem 0.75rem;
		border: 2px solid var(--white-1);
		margin: 0px 0.5rem;
		border-radius: 0.4rem;
		background-color: transparent;
		color: var(--white-1);
		font-size: 1rem;
	}

	button:hover {
		cursor: pointer;
		background-color: var(--white-1);
		color: var(--black-1);
	}

	button:active {
		background-color: var(--white-2);
	}
</style>

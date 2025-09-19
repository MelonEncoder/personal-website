<script>
	import monogram from '$lib/assets/monogram.svg';
</script>

<div id="page">
	<header>
		<img src={monogram} alt="ian's monogram" width="75px" />
		<nav>
			<ul>
				<li>
					<button>projects</button>
				</li>
				<li><button>graphic</button></li>
			</ul>
		</nav>
	</header>

	<div class="grid">
		<div class="box">
			<h1>Ian Gillette</h1>
			<h3>United States</h3>
		</div>
		<div class="box" id="about">
			<h1>About me</h1>
			<p>I</p>
			<p>Hello! I'm Ian.</p>
		</div>
		<div class="box">
			<h1>Links</h1>
		</div>
		<div class="box">
			<h1>Tools</h1>
			<h3>Programming</h3>
			<ul>
				<li>C</li>
				<li>C++</li>
				<li>Javascript</li>
				<li>HTML/CSS</li>
			</ul>
			<h3>Graphic Design</h3>
			<ul>
				<li>Affinity Designer</li>
				<li>Blender</li>
			</ul>
		</div>
	</div>
</div>

<style>
	.box {
		padding: 1rem;
		border: 2px solid var(--black-1);
		border-radius: 1rem;
	}

	.grid {
		display: grid;
		grid: repeat(2, auto) / auto-flow;
		grid-gap: 1rem;
	}

	#page {
		padding: 0 20%;
	}

	header {
		display: flex;
		flex-direction: row;
		place-content: bottom;
		justify-content: space-between;
		padding: 40px;
		background-color: var(--black-1);
		color: var(--white-1);
		margin: auto;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}

	nav {
		display: flex;
		justify-content: bottom;
		align-content: bottom;
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
		background-color: transparent;
		color: var(--white-1);
		font-size: 1.25rem;
		transition: 100ms;
	}

	button:hover {
		cursor: pointer;
		background-color: var(--white-1);
		color: var(--black-1);
		outline: 2px solid var(--white-1);
		outline-style: dotted;
		outline-offset: 5px;
	}

	button:active {
		background-color: var(--white-2);
	}
</style>

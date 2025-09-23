<script>
	import monogram from '$lib/assets/monogram.svg';

	const programmingLanguages = ['C', 'C++', 'Javascript', 'Go', 'Svelte', 'HTML/CSS'];
	const tools = ['Blender', 'Affinity Photo', 'Affinity Designer', 'Godot'];
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
			<p>Florida, United States</p>
		</div>
		<div class="box" id="about">
			<h1>About me</h1>
			<p>Hello!</p>
			<p>It's still a work in progress</p>
		</div>
		<div class="box">
			<h1>Links</h1>
			<a href="https://github.com/MelonEncoder">GitHub</a>
			<a href="https://linkedin.com/in/iangillette">LinkedIn</a>
		</div>
		<div class="box">
			<h1>Tech I Use</h1>
			<h3>Programming Languages</h3>
			<ul>
				{#each programmingLanguages as lang (lang)}
					<li class="programming-item" id={lang}>{lang}</li>
				{/each}
			</ul>
			<h3>Software</h3>
			<ul>
				{#each tools as tool (tool)}
					<li class="software-item" id={tool}>{tool}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.programming-item,
	.software-item {
		font-size: 1rem;
		border: 1px solid var(--black-1);
		border-radius: 0.2rem;
		padding: 0.2rem 0.35rem;
		margin-right: 0.5rem;
	}

	.box {
		padding: 1rem;
		border: 2px solid var(--black-1);
		border-radius: 1rem;
		/*box-shadow: 0px 8px 0px 0px var(--black-1);*/
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
		margin: 2rem auto;
		border-radius: 0.45rem;
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
		outline-offset: 0.4rem;
	}

	button:active {
		background-color: var(--white-2);
	}

	@media (max-width: 1200px) {
		#page {
			padding: 0 1rem;
		}
	}

	@media (max-width: 755px) {
		.grid {
			grid: repeat(1, auto) / 1fr;
		}
	}
</style>

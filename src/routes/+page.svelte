<script>
	import monogram from '$lib/assets/monogram.svg';

	import githubLogo from '$lib/assets/github-logo-black.svg';
	import linkedinLogo from '$lib/assets/linkedin-logo-black.svg';

	const programmingLanguages = ['C', 'C++', 'Javascript', 'HTML/CSS', 'Go', 'Swift'];
	const developerTools = ['Git', 'Svelte', 'OpenCV', 'Poppler', 'SFML'];
	const programms = ['Blender', 'Affinity Photo', 'Affinity Designer', 'Godot'];
</script>

<div class="page">
	<div class="grid-container">
		<header class="grid-item">
			<img id="monogram" src={monogram} alt="ian's monogram" width="75px" />
			<div>
				<h1>Ian Gillette</h1>
				<p>Problem Solver / Programmer / Graphic Designer</p>
			</div>
		</header>
		<div class="grid-item" id="about">
			<h1>About me</h1>
			<p>Hello!</p>
			<p>It's still a work in progress</p>
		</div>
		<div class="grid-item" id="welcome">
			<h1>Welcome to my portfolio website!</h1>
		</div>
		<div class="grid-item" id="links">
			<a class="link" href="https://github.com/MelonEncoder">
				<img src={githubLogo} alt="github logo" />
				GitHub
			</a>
			<a class="link" href="https://linkedin.com/in/iangillette">
				<img src={linkedinLogo} alt="linkedin logo" />
				LinkedIn
			</a>
		</div>
		<div class="grid-item" id="stuff">
			<h1>Stuff I Use</h1>
			<h3>Coding Languages</h3>
			<ul class="stuff-list">
				{#each programmingLanguages as lang (lang)}
					<li class="stuff-item" id={lang}>{lang}</li>
				{/each}
			</ul>
			<h3>Developer Tools and Libraries</h3>
			<ul class="stuff-list">
				{#each developerTools as dev (dev)}
					<li class="stuff-item" id={dev}>{dev}</li>
				{/each}
			</ul>
			<h3>Software</h3>
			<ul class="stuff-list">
				{#each programms as software (software)}
					<li class="stuff-item" id={software}>{software}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		place-content: center;
		padding-top: 1rem;
	}

	.stuff-list {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 0;
		list-style: none;
	}

	.stuff-item {
		font-size: 1rem;
		border: 1px solid var(--black-1);
		border-radius: 0.2rem;
		padding: 0.2rem 0.35rem;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
		box-shadow: 0 2px 0 0 var(--black-1);
	}

	#stuff {
		grid-column: 1 / -1;
	}

	.grid-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
		max-width: 1200px;
	}

	.grid-item {
		padding: 1rem;
		border: 2px solid var(--black-1);
		border-radius: 1rem;
	}

	#welcome {
		grid-row: 2 / 4;
		place-content: center;
		text-align: center;
	}

	#links {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		border: 0;
		padding: 0;
	}

	.link {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 2px solid var(--black-1);
		border-radius: 1rem;
		color: var(--black-1);
		text-decoration: none;
		font-size: 1.2rem;
		padding: 1rem;
		transition: 100ms;
	}

	.link:hover {
		cursor: pointer;
		outline: 3px dotted var(--black-1);
		outline-offset: 5px;
	}

	.link img {
		width: 40px;
	}

	header {
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
		padding: 40px;
		background-color: var(--black-1);
		color: var(--white-1);
		border-radius: 0.45rem;
		grid-column: 1 / -1;
	}

	header h1 {
		margin: 0;
	}

	header p {
		margin: 0;
	}

	#monogram {
		margin: 1rem;
		margin-right: 2rem;
	}

	@media (max-width: calc(1200px + 1rem)) {
		.page {
			padding: 1rem;
		}
	}

	@media (max-width: 755px) {
		.grid-container {
			grid-template-columns: 1fr;
		}
	}
</style>

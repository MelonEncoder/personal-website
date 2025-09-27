<script lang="ts">
	import { onMount } from 'svelte';

	import monogram from '$lib/assets/monogram.svg';
	import githubLogo from '$lib/assets/github-logo-black.svg';
	import linkedinLogo from '$lib/assets/linkedin-logo-black.svg';
	import businessCard from '$lib/assets/digital-media/ian-business-card.jpg';

	const programmingLanguages = ['C', 'C++', 'Javascript', 'HTML/CSS', 'Go', 'Swift'];
	const developerTools = ['Git', 'Svelte', 'OpenCV', 'Poppler', 'SFML'];
	const programms = ['Blender', 'Affinity Photo', 'Affinity Designer', 'Godot', 'Davinci Resolve'];

	let year: string = new Date().getFullYear().toString();
	let localTime = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/New_York',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false
	}).format(new Date());

	onMount(() => {
		localTime = new Intl.DateTimeFormat('en-US', {
			timeZone: 'America/New_York',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: false
		}).format(new Date());

		const interval = setInterval(() => {
			localTime = new Intl.DateTimeFormat('en-US', {
				timeZone: 'America/New_York',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
				hour12: false
			}).format(new Date());
		}, 1000);

		return () => clearInterval(interval);
	});

	function moreProgrammingProjects() {
		window.location.href = 'https://github.com/MelonEncoder';
	}

	function moreDigitalMedia() {
		alert('Work in progress.');
	}
</script>

<div class="page">
	<div class="grid-container">
		<header class="grid-item" id="header-section">
			<img id="monogram" src={monogram} alt="ian's monogram" width="75px" />
			<div>
				<h1>Ian Gillette</h1>
				<p>Problem Solver / Programmer / Graphic Designer</p>
			</div>
		</header>
		<div class="grid-item" id="about-section">
			<h1>About Me</h1>
			<p>
				Hello! My name is Ian Gillette and I'm currently a student at University studying Computer
				Science. I enjoy drawing, programming, and learning new things.
			</p>
		</div>
		<div class="grid-item" id="welcome-section">
			<h1>Welcome to my portfolio website!</h1>
		</div>
		<div class="grid-item" id="links-section">
			<a class="link" href="https://github.com/MelonEncoder" rel="external">
				<img src={githubLogo} alt="github logo" />
				GitHub
			</a>
			<a class="link" href="https://linkedin.com/in/iangillette" rel="external">
				<img src={linkedinLogo} alt="linkedin logo" />
				LinkedIn
			</a>
		</div>
		<div class="grid-item" id="work-section">
			<div class="work-item" id="programming-section">
				<div>
					<h1>Programming Projects</h1>
					<div>
						<h3>
							<a href="https://github.com/MelonEncoder/pdf-to-video">PDF to Video CLI tool</a>
						</h3>
						<p>
							This is a program that converts a .pdf file into a .mp4 file. You can set the FPS,
							duration, resolution, and even animate the pdf.
						</p>
					</div>
				</div>
				<button class="more-button" on:click={moreProgrammingProjects}>More</button>
			</div>
			<div class="work-item" id="graphic-design-section">
				<div>
					<h1>Graphic Design Work</h1>
					<div id="graphic-item">
						<img src={businessCard} alt="ian's business card" width="200px" />
						<div>
							<h3>Business Card - 2025</h3>
							<p>
								Designed in Affinity Designer with the purpose of making it easier to share my
								information and give a unique first impression.
							</p>
						</div>
					</div>
				</div>
				<button class="more-button" on:click={moreDigitalMedia}>More</button>
			</div>
		</div>

		<div class="grid-item" id="tools-section">
			<h1>Stuff I Use</h1>
			<h2>Coding Languages</h2>
			<ul class="tool-list">
				{#each programmingLanguages as lang (lang)}
					<li class="tool-item" id={lang}>{lang}</li>
				{/each}
			</ul>
			<h2>Developer Tools and Libraries</h2>
			<ul class="tool-list">
				{#each developerTools as dev (dev)}
					<li class="tool-item" id={dev}>{dev}</li>
				{/each}
			</ul>
			<h2>Software</h2>
			<ul class="tool-list">
				{#each programms as software (software)}
					<li class="tool-item" id={software}>{software}</li>
				{/each}
			</ul>
		</div>
		<div class="grid-item" id="languages-section">
			<h1>Languages</h1>
			<h2>Japanese (日本語) &#x1f1ef;&#x1f1f5</h2>
			<p>Elementary Proficiency</p>
			<h2>Spanish (Español) &#x1f1ea;&#x1f1f8</h2>
			<p>Elementary Proficiency</p>
		</div>
		<div class="grid-item" id="info-section">
			<p>My Time: {localTime}</p>
			<p>Copyright &copy {year} Ian Gillette</p>
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		place-content: center;
		padding: 1rem 0;
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

	.tool-list {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 0;
		list-style: none;
	}

	.tool-item {
		font-size: 1rem;
		border: 1px solid var(--black-1);
		border-radius: 0.2rem;
		padding: 0.2rem 0.35rem;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
		box-shadow: 0 2px 0 0 var(--black-1);
	}

	#header-section {
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
		background-color: var(--black-1);
		color: var(--white-1);
		border-radius: 1rem;
		grid-column: 1 / -1;
	}

	#header-section h1,
	#header-section p {
		margin: 0;
	}

	#welcome-section {
		grid-row: 2 / 4;
		place-content: center;
		text-align: center;
	}

	#welcome-section h1 {
		margin: 1rem 0;
	}

	#work-section {
		grid-column: 2 / -1;
		grid-row: 4 / 6;
		display: grid;
		grid-template-columns: f1;
		border: 0;
		padding: 0;
		gap: 1rem;
	}

	.work-item {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		padding: 1rem;
		border: 2px solid var(--black-1);
		border-radius: 1rem;
	}

	#graphic-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		align-self: center;
	}

	#graphic-item img {
		width: 200px;
		margin-right: 1rem;
	}

	#links-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		border: 0;
		padding: 0;
	}

	#info-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		grid-column: 1 / -1;
	}
	#info-section p {
		margin-top: 0;
	}
	#info-section p:last-child {
		margin-bottom: 0;
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

	.more-button {
		border: 2px solid var(--black-1);
		padding: 0.5rem 1rem;
		background-color: transparent;
		border-radius: 3rem;
		transition: 100ms;
		font-weight: bold;
	}

	.more-button:hover {
		cursor: pointer;
		outline: 2px dotted var(--black-1);
		background-color: var(--black-1);
		color: var(--white-1);
		outline-offset: 5px;
	}

	.more-button:active {
		background-color: var(--black-2);
		transition: 10ms;
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
		.grid-item {
			grid-column: 1 / -1;
		}
		#work-section {
			grid-column: 1 / -1;
			grid-row: 7 / 8;
		}
		p {
			margin-bottom: 1rem;
		}
		#more-button {
			margin-top: 1rem;
		}
		#graphic-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			align-self: center;
		}

		#graphic-item img {
			width: 200px;
			margin-right: 1rem;
		}
	}
</style>

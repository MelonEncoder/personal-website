<script lang="ts">
	import { resolve } from "$app/paths";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<div class="content">
	<h1 class="title">JOB MATERIALS</h1>

	<section class="section">
		<div class="card">
			<h2 class="sectionHeading">About this Project</h2>
			<p class="bodyText">
				The job materials assignment required me to create two professional career-oriented
				documents, a resume and a cover letter, and practice writing to a hiring manager.
				These documents would be based on a real-world job position I found on the career
				management platform, Handshake, to give me practical experience that can be used in
				the future. At the time of writing these documents, I was enrolled as a computer
				science major, though I am now a graphic design major with a game design track.
			</p>
			<p class="bodyText">
				Before I started working on the resume, I created an outline of my credentials,
				education, important links, and work experience. I also had my portfolio website up
				and running at this time, so I was able to put this on my resume as well. This
				allowed me to stay organized and keep track of relevant information so I could focus
				on designing the layout and structure of the document.
			</p>
			<p class="bodyText">
				For the cover letter, I found an internship position that matched my interests and
				worked well with my current resume. After I found the listing, I created another
				planning document that held the title of the position, its location, and work
				responsibilities. From there I noted my qualifications and how my experience can be
				beneficial for the company.
			</p>
			<p class="bodyText">
				After writing up the documents and submitting them, I received very helpful
				feedback. My cover letter needed the most work where my resume had minimal issues.
				When making updates to my cover letter, I mainly reorganized the content and was
				clearer on what my thesis was. I ended up moving my address and contact information
				into the header section up top instead of below the date. I removed duplicated
				references to contact information at the end of the document and split a big central
				body paragraph that explained my experience into two sections, one specifically for
				my experiences at UCF.
			</p>
			<p class="bodyText">
				From this project, I learned how to create a resume that highlights my strengths in
				an easily scannable format. Additionally, I practiced writing a potential cover
				letter to a real employer that expresses my interest in a specific job position and
				shares how I can be a valuable member of the organization. Finally, I got the chance
				to reflect on my skills and what I have learned from my experience throughout my
				life.
			</p>
		</div>
	</section>

	<section class="section">
		<div class="sectionHeader">
			<div class="sectionHeadingRow">
				<h2 class="sectionHeading">Resume</h2>
				<span class="badge">Password Protected</span>
			</div>
			{#if data.authenticated}
				<div class="fileNote">
					<a
						class="link"
						href={resolve("/private/resume.pdf")}
						target="_blank"
						rel="noopener">Open in new tab</a
					>
				</div>
			{/if}
		</div>
		{#if data.authenticated}
			<div class="embedWrapper">
				<iframe
					class="embed"
					src="/private/resume.pdf"
					title="Resume"
					aria-label="Embedded resume PDF"
				></iframe>
			</div>
		{:else}
			<div class="embedWrapper">
				<iframe
					class="embed"
					src="/private?embed=1&redirect=/private"
					title="Login"
					aria-label="Password prompt"
				></iframe>
			</div>
		{/if}
	</section>

	<section class="section">
		<div class="sectionHeader">
			<div class="sectionHeadingRow">
				<h2 class="sectionHeading">Cover Letter Example</h2>
				<span class="badge">Password Protected</span>
			</div>
			{#if data.authenticated}
				<div class="fileNote">
					<a
						class="link"
						href={resolve("/private/resume.pdf")}
						target="_blank"
						rel="noopener">Open in new tab</a
					>
				</div>
			{/if}
		</div>
		{#if data.authenticated}
			<div class="embedWrapper">
				<iframe
					class="embed"
					src="/private/cover-letter-example.pdf"
					title="Cover Letter"
					aria-label="Embedded cover letter PDF"
				></iframe>
			</div>
		{:else}
			<div class="embedWrapper">
				<iframe
					class="embed"
					src="/private?embed=1&redirect=/private"
					title="Login"
					aria-label="Password prompt"
				></iframe>
			</div>
		{/if}
	</section>
</div>

<style>
	.content {
		color: var(--black);
		font-family: var(--font-body), sans-serif;
	}

	.title {
		font-family: var(--font-title), monospace;
		font-size: var(--fs-title);
		color: var(--black);
		text-transform: uppercase;
		letter-spacing: 0.02em;
		margin: 0 0 1rem 0;
	}

	.section {
		margin-top: 2rem;
	}

	.sectionHeader {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.sectionHeading {
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-h2);
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: var(--black);
		line-height: 1.3;
		letter-spacing: 0.02em;
	}

	.card {
		background-color: var(--white);
		padding: 1rem 1.25rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		display: flex;
		flex-direction: column;
	}

	.bodyText {
		font-size: var(--fs-body);
		line-height: 1.75;
		margin: 0 0 0.85rem 0;
	}

	.bodyText:last-child {
		margin: 0;
	}

	.sectionHeadingRow {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin: 0 0 1rem 0;
	}

	.sectionHeadingRow .sectionHeading {
		margin: 0;
	}

	.fileNote {
		margin: 0 0 0.75rem 0;
	}

	.badge {
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body-sm);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--black), white 35%);
		border: 1px solid color-mix(in srgb, var(--black), white 55%);
		border-radius: var(--radius-sm);
		padding: 0.3rem 0.6rem;
	}

	.link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.62rem 1rem;
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-body);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		background: var(--white);
		color: var(--black);
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		box-shadow: 0 4px 0 0 var(--black);
		transition: 0.12s ease;
	}

	.link:hover {
		border-color: var(--accent);
		box-shadow: 0 4px 0 0 var(--accent);
		background-color: color-mix(in srgb, var(--accent), white 65%);
	}

	.link:active {
		border-color: var(--accent);
		transform: translateY(4px);
		box-shadow: 0 0 0 0 var(--accent);
	}

	.embedWrapper {
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		overflow: hidden;
		background-color: var(--white);
	}

	.embed {
		display: block;
		width: 100%;
		height: 70vh;
		min-height: 480px;
		border: none;
	}
</style>

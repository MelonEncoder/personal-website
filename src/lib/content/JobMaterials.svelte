<script lang="ts">
	import { page } from "$app/state";
	import AppPage from "#lib/components/desktop/AppPage.svelte";
	import jobIcon from "#lib/assets/icons/briefcase.svg";

	// Comes from the (app) layout server load so it is available whichever route is focused.
	const authenticated = $derived(page.data.privateAuthenticated === true);
</script>

<AppPage
	icon={jobIcon}
	title="Job Materials"
	subtitle="Resume and cover letter for a job application."
>
	<section class="section">
		<h2 class="label">About this Project</h2>
		<div class="prose">
			<p>
				The job materials assignment required me to create two professional career-oriented
				documents, a resume and a cover letter, and practice writing to a hiring manager.
				These documents would be based on a real-world job position I found on the career
				management platform, Handshake, to give me practical experience that can be used in
				the future. At the time of writing these documents, I was enrolled as a computer
				science major, though I am now a graphic design major with a game design track.
			</p>
			<p>
				Before I started working on the resume, I created an outline of my credentials,
				education, important links, and work experience. I also had my portfolio website up
				and running at this time, so I was able to put this on my resume as well. This
				allowed me to stay organized and keep track of relevant information so I could focus
				on designing the layout and structure of the document.
			</p>
			<p>
				For the cover letter, I found an internship position that matched my interests and
				worked well with my current resume. After I found the listing, I created another
				planning document that held the title of the position, its location, and work
				responsibilities. From there I noted my qualifications and how my experience can be
				beneficial for the company.
			</p>
			<p>
				After writing up the documents and submitting them, I received very helpful
				feedback. My cover letter needed the most work where my resume had minimal issues.
				When making updates to my cover letter, I mainly reorganized the content and was
				clearer on what my thesis was. I ended up moving my address and contact information
				into the header section up top instead of below the date. I removed duplicated
				references to contact information at the end of the document and split a big central
				body paragraph that explained my experience into two sections, one specifically for
				my experiences at UCF.
			</p>
			<p>
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
		<div class="labelRow">
			<h2 class="label">Resume</h2>
			{#if !authenticated}<span class="lock">Password protected</span>{/if}
		</div>
		{#if !authenticated}
			<div class="embedWrapper">
				<iframe
					class="embed"
					src="/private?embed=1&redirect=/private"
					title="Resume login"
					aria-label="Password prompt for the resume"
				></iframe>
			</div>
		{/if}
	</section>

	<section class="section">
		<div class="labelRow">
			<h2 class="label">Cover Letter</h2>
			{#if !authenticated}<span class="lock">Password protected</span>{/if}
		</div>
		{#if !authenticated}
			<div class="embedWrapper">
				<iframe
					class="embed"
					src="/private?embed=1&redirect=/private"
					title="Cover Letter login"
					aria-label="Password prompt for the cover letter"
				></iframe>
			</div>
		{/if}
	</section>
</AppPage>

<style>
	/* The section label with a "Password protected" tag on the right. */
	.labelRow {
		display: flex;
		align-items: flex-end;
		gap: 0.75rem;
		margin-bottom: 0.6rem;
		border-bottom: 1px solid color-mix(in srgb, var(--black), white 80%);
	}

	.labelRow :global(.label) {
		flex: 1;
		margin: 0;
		border-bottom: none;
	}

	.lock {
		margin-bottom: 0.35rem;
		padding: 0.15rem 0.45rem;
		border: 1.5px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--accent-2);
		font-size: 0.75rem;
		font-weight: 700;
		white-space: nowrap;
	}

	.embedWrapper {
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		overflow: hidden;
		background: var(--white);
	}

	.embed {
		display: block;
		width: 100%;
		height: 10rem;
		border: none;
	}
</style>

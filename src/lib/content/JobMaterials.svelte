<script lang="ts">
	import AppPage from "#lib/components/desktop/AppPage.svelte";
	import FileShortcut from "#lib/components/desktop/FileShortcut.svelte";
	import jobIcon from "#lib/assets/icons/briefcase.svg";
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
		<h2 class="label">Files</h2>
		<div class="files">
			<FileShortcut path="technical-writing/job-materials/resume" />
			<FileShortcut path="technical-writing/job-materials/cover-letter" />
		</div>
	</section>
</AppPage>

<style>
	.files {
		display: grid;
		gap: 0.25rem;
	}
</style>

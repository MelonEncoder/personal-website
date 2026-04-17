<script lang="ts">
	import { resolve } from "$app/paths";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<div class="content">
	<h1 class="title">JOB MATERIALS</h1>

	<section class="section">
		<h2 class="sectionHeading">About This Assignment</h2>
		<div class="card">
			<p class="bodyText">[placeholder]</p>
			<!-- <p class="bodyText">
				[Placeholder: Describe the job materials assignment here. Explain what the assignment
				asked you to produce — a resume and cover letter targeted at a specific job posting or
				industry. Discuss the genre conventions you were expected to follow and any constraints
				given by the course.]
			</p>
			<p class="bodyText">
				[Placeholder: Explain your approach. What job or role did you target? How did you tailor
				your resume and cover letter to that audience? What decisions did you make about format,
				length, and content selection? Discuss how you prioritized information for a hiring
				manager who may spend only a few seconds scanning a document.]
			</p>
			<p class="bodyText">
				[Placeholder: Describe what you specifically revised. What feedback did you receive on
				your first draft? What was unclear, too long, or missing? Walk through the concrete
				changes you made — restructured bullet points, tightened language, adjusted formatting,
				updated the summary statement — and explain why each change improved the document.]
			</p>
			<p class="bodyText">
				[Placeholder: Reflect on what you learned about technical communication through this
				project. How did working on these documents change how you think about writing for a
				professional audience? What surprised you? What would you do differently on the next
				revision?]
			</p> -->
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
		gap: 0.85rem;
	}

	.bodyText {
		font-size: var(--fs-body);
		line-height: 1.75;
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

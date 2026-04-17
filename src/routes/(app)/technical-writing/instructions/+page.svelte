<div class="content">
	<h1 class="title">INSTRUCTIONS</h1>

	<section class="section">
		<h2 class="sectionHeading">About This Assignment</h2>
		<div class="card">
			<p class="bodyText">[placeholder]</p>
			<!-- <p class="bodyText">
				[Placeholder: Describe the instructions assignment here. Explain what the assignment
				asked you to produce — a set of step-by-step instructions for completing a task
				aimed at a specific audience. Describe the task you chose to document and who your
				intended reader was. Discuss the genre conventions for instructional writing you
				were expected to apply, such as numbered steps, imperative verbs, warnings, and
				visual aids.]
			</p>
			<p class="bodyText">
				[Placeholder: Explain your approach. Why did you choose the task you documented? How
				did you think about your audience's prior knowledge and what they would need
				explained in detail versus what could be assumed? What decisions did you make about
				structure, step granularity, and visual support? Describe any testing or review you
				did to check whether the instructions were actually followable.]
			</p>
			<p class="bodyText">
				[Placeholder: Describe what you specifically revised. What feedback did you receive
				on your first draft? Were there steps that were unclear, out of order, or missing
				entirely? Were warnings or cautions absent where they were needed? Walk through the
				concrete changes you made and explain how each one improved usability for your
				target reader.]
			</p>
			<p class="bodyText">
				[Placeholder: Reflect on what you learned about technical communication through this
				project. How did writing instructions change how you think about clarity, precision,
				and audience awareness? What was harder than you expected? What would you revise
				further given more time?]
			</p> -->
		</div>
	</section>

	<section class="section">
		<div class="sectionHeader">
			<h2 class="sectionHeading">Document</h2>
			<p class="fileNote">
				<a
					class="link"
					href="https://files.iangillette.net/public/technical-writing/instructions.pdf"
					target="_blank"
					rel="noopener">Open in new tab</a
				>
			</p>
		</div>
		<div class="embedWrapper">
			<iframe
				class="embed"
				src="https://files.iangillette.net/public/technical-writing/instructions.pdf"
				title="Instructions Document"
				aria-label="Embedded instructions PDF"
			></iframe>
		</div>
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

	.fileNote {
		font-size: var(--fs-body-sm);
		font-family: var(--font-mono), monospace;
		color: color-mix(in srgb, var(--black), white 30%);
		margin: 0 0 0.75rem 0;
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

<div class="content">
	<h1 class="title">UN SDG BROCHURE</h1>

	<section class="section">
		<h2 class="sectionHeading">About This Assignment</h2>
		<div class="card">
			<p class="bodyText">[placeholder]</p>
			<!-- <p class="bodyText">
				[Placeholder: Describe the UN SDG brochure assignment here. Explain what the assignment
				asked you to produce — a persuasive brochure connected to one of the United Nations
				Sustainable Development Goals. Name the SDG you focused on and explain why you chose
				it. Discuss the audience you were writing for and what action or understanding you
				wanted to promote through the document.]
			</p>
			<p class="bodyText">
				[Placeholder: Explain your approach. How did you research your chosen SDG and find
				credible supporting information? How did you decide on the visual layout, tone, and
				the amount of text to include? Brochures must communicate quickly — describe how you
				balanced brevity with persuasion and how you structured the content to guide the reader
				through the document.]
			</p>
			<p class="bodyText">
				[Placeholder: Describe what you specifically revised. What feedback did you receive on
				your first draft? Were there sections that were too text-heavy, unclear in argument,
				or lacking visual appeal? Walk through the concrete changes you made to the content,
				design, and layout and explain how each revision better served your audience and purpose.]
			</p>
			<p class="bodyText">
				[Placeholder: Reflect on what you learned about technical communication through this
				project. How did the constraints of the brochure format challenge you as a writer?
				What did you learn about designing for visual communication alongside written content?
				How might you apply these skills to future professional writing or design work?]
			</p> -->
		</div>
	</section>

	<section class="section">
		<h2 class="sectionHeading">Document</h2>
		<p class="fileNote">
			<a
				class="link"
				href="https://files.iangillette.net/public/technical-writing/udl-brochure.pdf"
				target="_blank"
				rel="noopener">Open in new tab</a
			>
		</p>
		<div class="embedWrapper">
			<iframe
				class="embed"
				src="https://files.iangillette.net/public/technical-writing/udl-brochure.pdf"
				title="UN SDG Brochure"
				aria-label="Embedded brochure PDF"
			></iframe>
		</div>
	</section>

	<section class="section">
		<h2 class="sectionHeading">Writeup</h2>
		<p class="fileNote">
			<a
				class="link"
				href="https://files.iangillette.net/public/technical-writing/udl-brochure-writeup.pdf"
				target="_blank"
				rel="noopener">Open in new tab</a
			>
		</p>
		<div class="embedWrapper">
			<iframe
				class="embed"
				src="https://files.iangillette.net/public/technical-writing/udl-brochure-writeup.pdf"
				title="UN SDG Brochure Writeup"
				aria-label="Embedded brochure writeup PDF"
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

<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import FileShortcut from "$lib/components/desktop/FileShortcut.svelte";
</script>

<div class="content">
	<h1 class="title">UN SDG BROCHURE</h1>

	<section class="section">
		<Card>
			<h2 class="sectionHeading">About this Project</h2>
			<p class="bodyText">
				The UN SDG Project was a collaborative team project that aimed to simulate a
				real-world professional environment. Our team consisted of four people, and we were
				tasked with producing a research-based deliverable connected to the United Nations
				Sustainable Development Goals and their application to the UCF community. The
				research component of the deliverable consisted of both primary and secondary
				research. The primary research included a survey and at least two interviews with
				students at UCF and the secondary research involved using the UCF database to find
				other papers and articles on our topic. For the deliverable, we had the choice
				between a presentation, brochure, infographic, or a recommendation report.
			</p>
			<p class="bodyText">
				Before we got started with the project, we created a team charter, where we defined
				how we communicated, our availability, our individual and team goals, defining
				conflict-resolution and deadline agreements, and deciding on what our deliverable
				would be. After the charter, we started working on finalizing our topic and
				deliverables, defining our research question and audience, and gathering data from
				our primary and secondary sources.
			</p>
			<p class="bodyText">
				Once we had all the planning and research out of the way, we could start working on
				our deliverables. We chose to create a brochure that explained UDL principles and
				our target audience was teachers at UCF. We felt that teachers would be the best
				audience for this topic because they are directly involved with the education
				system, creating the curriculum they teach, and the classroom resources they use.
				Also, each member had to write at least 500 words and since a brochure was fairly
				limited in terms of space, we also wrote a writeup of our research to go along with
				the brochure.
			</p>
			<p class="bodyText">
				After submitting the project, we met with high praise on our deliverable and very
				few issues from the feedback we received from our instructor. They even wanted to
				use our work as an example for future classes, which we were delighted to hear. Of
				the feedback that we could act upon were some slight editorial fixes and the sizing
				of our graphs being too small. All of these changes were relatively easy to apply to
				our documents.
			</p>
			<p class="bodyText">
				From working on a team to conducting interviews to designing a brochure, I learned a
				lot during the process of developing these deliverables. I feel more confident while
				working with a team, I have a deeper understanding of the research process and
				important planning can be to the success of the final product.
			</p>
		</Card>
	</section>

	<section class="section">
		<h2 class="sectionHeading">Files</h2>
		<div class="fileRow">
			<FileShortcut path="technical-writing/un-sdg-brochure/udl-brochure" />
			<FileShortcut path="technical-writing/un-sdg-brochure/udl-brochure-writeup" />
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

	.bodyText {
		font-size: var(--fs-body);
		line-height: 1.7;
		margin: 0 0 1rem 0;
	}

	.bodyText:last-child {
		margin: 0;
	}

	.fileRow {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding-top: 0.25rem;
	}
</style>

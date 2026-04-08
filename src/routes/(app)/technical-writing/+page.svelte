<script lang="ts">
	import FolderButton from "$lib/components/FolderButton.svelte";
	import jobIcon from "$lib/assets/icons/briefcase.svg";
	import instructionsIcon from "$lib/assets/icons/assignment.svg";
	import brochureIcon from "$lib/assets/icons/newsmode.svg";
	import type { ResolvedPathname } from "$app/types";

	interface Section {
		label: string;
		description: string;
		url: ResolvedPathname;
		tag: string;
		icon: string;
	}

	const sections: Section[] = [
		{
			label: "Job Materials",
			description: "Resume and cover letter for a job application.",
			url: "/technical-writing/job-materials",
			tag: ".JOB",
			icon: jobIcon
		},
		{
			label: "Instructions",
			description: "Step-by-step instructional document.",
			url: "/technical-writing/instructions",
			tag: ".DOC",
			icon: instructionsIcon
		},
		{
			label: "UN SDG Brochure",
			description: "Brochure designed around a UN Sustainable Development Goal.",
			url: "/technical-writing/brochure",
			tag: ".SDG",
			icon: brochureIcon
		}
	];
</script>

<div class="content">
	<h1 class="title">TECHNICAL WRITING</h1>
	<div class="card intro">
		<p class="bodyText">
			This section showcases the projects I worked on while taking ENC2341 - Technical Writing
			at UCF. Each folder below contains the project documents with a reflection on the
			assignment, my approach, and what I learned about communicating to a specific audieance.
		</p>
	</div>

	<ul class="fileGrid" aria-label="Technical writing sections">
		{#each sections as section, i (i)}
			<li>
				<FolderButton
					href={section.url}
					tag={section.tag}
					title={section.label}
					icon={section.icon}
					description={section.description}
				/>
			</li>
		{/each}
	</ul>
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
		margin: 0 0 1.25rem 0;
	}

	.card {
		background-color: var(--white);
		padding: 1rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
	}

	.intro {
		margin-bottom: 2rem;
	}

	.bodyText {
		font-size: var(--fs-body);
		line-height: 1.7;
		margin: 0;
	}

	.fileGrid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.25rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	@media (max-width: 1000px) {
		.fileGrid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 700px) {
		.fileGrid {
			grid-template-columns: 1fr;
		}

		.title {
			font-size: var(--fs-h1);
		}
	}
</style>

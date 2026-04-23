<script lang="ts">
	import FolderButton from "$lib/components/FolderButton.svelte";
	import jobIcon from "$lib/assets/icons/briefcase.svg";
	import instructionsIcon from "$lib/assets/icons/assignment.svg";
	import brochureIcon from "$lib/assets/icons/newsmode.svg";
	import type { ResolvedPathname } from "$app/types";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import Card from "$lib/components/Card.svelte";

	interface Section {
		label: string;
		description: string;
		url: ResolvedPathname;
		tag: string;
		icon: string;
		iconAlt: string;
	}

	const sections: Section[] = [
		{
			label: "Job Materials",
			description: "Resume and cover letter for a job application.",
			url: "/technical-writing/job-materials",
			tag: ".JOB",
			icon: jobIcon,
			iconAlt: "briefcase icon"
		},
		{
			label: "UN SDG Brochure",
			description: "Brochure designed around a UN Sustainable Development Goal.",
			url: "/technical-writing/brochure",
			tag: ".SDG",
			icon: brochureIcon,
			iconAlt: "brochure icon"
		},
		{
			label: "Instructions",
			description: "Step-by-step instructional document.",
			url: "/technical-writing/instructions",
			tag: ".DOC",
			icon: instructionsIcon,
			iconAlt: "document icon"
		}
	];
</script>

<div class="content">
	<h1 class="title">TECHNICAL WRITING</h1>

	<Card>
		<p class="bodyText">
			This section showcases the projects I worked on while taking ENC2341 - Technical Writing
			at UCF. Each folder below contains the project documents with a reflection on the
			assignment, my approach, and what I learned about communicating to a specific audieance.
		</p>
	</Card>

	<ul class="fileGrid" aria-label="Technical writing sections">
		{#each sections as section, i (i)}
			<li>
				<FolderButton
					tag={section.tag}
					title={section.label}
					icon={section.icon}
					iconAlt={section.iconAlt}
					description={section.description}
					onclick={() => {
						goto(resolve(section.url));
					}}
				/>
			</li>
		{/each}
	</ul>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
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

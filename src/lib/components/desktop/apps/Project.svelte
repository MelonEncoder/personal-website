<script lang="ts">
	import WorkCard from "$lib/components/WorkCard.svelte";
	import { getProject } from "$lib/desktop/fs";
	import type { WinProps } from "$lib/desktop/types";

	/** One portfolio project (a programming project or a game) in its own window. */
	let { props }: { props: WinProps } = $props();

	const project = $derived(getProject(props.path ?? ""));
</script>

{#if project}
	<WorkCard
		title={project.title}
		description={project.description}
		href={project.href}
		image={project.image}
		imageAlt="{project.title} screenshot"
		tags={project.tags}
		date={project.date}
	/>
{:else}
	<p class="missing">This project could not be found.</p>
{/if}

<style>
	.missing {
		margin: 0;
		font-family: var(--font-mono), sans-serif;
	}
</style>

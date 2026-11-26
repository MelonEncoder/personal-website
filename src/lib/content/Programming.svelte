<script lang="ts">
	import ProjectList from "#lib/components/desktop/ProjectList.svelte";
	import codeIcon from "#lib/assets/icons/code-xml.svg";
	import { PROGRAMMING_PROJECTS } from "#lib/desktop/projects.ts";
</script>

<ProjectList
	projects={PROGRAMMING_PROJECTS}
	title="Programming"
	app="programming"
	icon={codeIcon}
/>

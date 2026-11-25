<script lang="ts">
	import ProjectList from "#lib/components/desktop/ProjectList.svelte";
	import gameIcon from "#lib/assets/icons/joystick.svg";
	import { GAME_PROJECTS } from "#lib/desktop/projects.ts";
</script>

<ProjectList projects={GAME_PROJECTS} title="Video Games" icon={gameIcon} />

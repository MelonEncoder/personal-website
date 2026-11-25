<script lang="ts">
	import { APPS } from "$lib/desktop/apps";
	import { getWindowManager } from "$lib/desktop/windows.svelte";
	import folderIcon from "$lib/assets/icons/folder.svg";

	const wm = getWindowManager();
	const year = new Date().getFullYear();

	function toggle(id: string) {
		const win = wm.get(id);
		if (!win) return;
		if (wm.active?.id === id) wm.minimize(id);
		else wm.focus(id);
	}
</script>

<footer class="taskbar">
	<button
		type="button"
		class="launcher"
		onclick={() => wm.open("explorer", { path: "" })}
		aria-label="Open File Explorer"
	>
		<img src={folderIcon} alt="" aria-hidden="true" />
		<span class="launcherLabel">Files</span>
	</button>

	<ul class="tasks" aria-label="Open windows">
		{#each wm.windows as win (win.id)}
			{@const app = APPS[win.appId]}
			{@const title = app.title(win.props)}
			<li>
				<button
					type="button"
					class="task"
					class:active={wm.active?.id === win.id}
					class:minimized={win.minimized}
					aria-pressed={wm.active?.id === win.id}
					{title}
					onclick={() => toggle(win.id)}
				>
					<img src={app.icon(win.props)} alt="" aria-hidden="true" />
					<span class="taskLabel">{title}</span>
				</button>
			</li>
		{/each}
	</ul>

	<div class="tray">
		<span class="copyright">&copy; {year} Ian Gillette</span>
	</div>
</footer>

<style>
	.taskbar {
		position: relative;
		z-index: 500;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		height: var(--taskbar-h);
		padding: 0 0.4rem;
		box-sizing: border-box;
		background: var(--backlight-2);
		border-top: 2px solid var(--black);
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body-sm);
		color: var(--black);
		user-select: none;
	}

	button {
		font: inherit;
		color: inherit;
		cursor: pointer;
	}

	button:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: 1px;
	}

	.launcher,
	.task {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		height: calc(var(--taskbar-h) - 12px);
		padding: 0 0.6rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		box-shadow: 0 2px 0 0 var(--black);
	}

	.launcher {
		font-weight: 700;
		background: var(--accent);
		color: var(--white);
	}

	.launcher img {
		filter: invert(1);
	}

	.launcher:hover {
		background: color-mix(in srgb, var(--accent), black 12%);
	}

	img {
		width: 1rem;
		height: 1rem;
		flex: 0 0 auto;
	}

	.tasks {
		flex: 1;
		min-width: 0;
		display: flex;
		gap: 0.35rem;
		margin: 0;
		padding: 0 0 2px;
		list-style: none;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.task {
		max-width: 13rem;
	}

	.task:hover {
		background: var(--accent-2);
	}

	.task.active {
		background: var(--accent-2);
		box-shadow: inset 0 2px 0 0 color-mix(in srgb, var(--black), transparent 75%);
		font-weight: 700;
	}

	.task.minimized {
		border-style: dashed;
		box-shadow: none;
		color: color-mix(in srgb, var(--black), white 30%);
	}

	.taskLabel {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tray {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0 0.5rem;
		white-space: nowrap;
	}

	@media (max-width: 700px) {
		.launcherLabel,
		.taskLabel,
		.copyright {
			display: none;
		}

		.tray {
			padding: 0 0.25rem;
		}
	}
</style>

<script lang="ts">
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import FolderButton from "./FolderButton.svelte";
    import type { FolderProps } from "$lib/types/folder";

	let { folders, ariaLabel }: { folders: FolderProps[]; ariaLabel: string } = $props();
</script>

<ul class="folderGrid" aria-label={ariaLabel}>
		{#each folders as folder, i (i)}
			<li>
				<FolderButton
					{...folder}
					onclick={() => {
						goto(resolve(folder.url));
					}}
				/>
			</li>
		{/each}
	</ul>

<style>
    .folderGrid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.25rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	@media (max-width: 1200px) {
		.folderGrid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 700px) {
		.folderGrid {
			grid-template-columns: 1fr;
		}
	}
</style>

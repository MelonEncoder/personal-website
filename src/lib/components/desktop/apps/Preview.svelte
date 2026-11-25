<script lang="ts">
	import { getPreviewable, fileIcon } from "$lib/desktop/fs";
	import type { WinProps } from "$lib/desktop/types";
	import zoomInIcon from "$lib/assets/icons/zoom-in.svg";
	import infoIcon from "$lib/assets/icons/info.svg";
	import arrowOut from "$lib/assets/icons/arrow-outward.svg";

	let { props }: { props: WinProps } = $props();

	/** An image, a PDF, or a project (programming project or video game). */
	const file = $derived(getPreviewable(props.path ?? ""));

	/** The picture to show, if any: the image itself, or a project's screenshot. */
	const imageSrc = $derived(
		file?.kind === "image" ? file.src : file?.kind === "project" ? file.image : undefined
	);
	/** Where "open" goes: the file itself, or the project's page (GitHub, itch.io). */
	const openHref = $derived(file ? (file.kind === "project" ? file.href : file.src) : "");

	const kindLabel = $derived.by(() => {
		if (!file) return "";
		if (file.kind === "project") {
			return file.category === "game" ? "Video game" : "Programming project";
		}
		return file.kind === "pdf" ? "PDF document" : "Image";
	});

	const linkLabel = $derived.by(() => {
		if (file?.kind !== "project") return "Open in new tab";
		if (file.href.includes("github.com")) return "View on GitHub";
		if (file.href.includes("itch.io")) return "Play on itch.io";
		return "Open link";
	});

	const ZOOM_STEPS = [0.25, 0.5, 0.75, 1, 1.5, 2, 3];
	/** `null` means "fit to window". */
	let zoom: number | null = $state(null);
	let showInfo = $state(true);

	function zoomBy(direction: 1 | -1) {
		const current = zoom ?? 1;
		const next =
			direction === 1
				? ZOOM_STEPS.find((step) => step > current)
				: [...ZOOM_STEPS].reverse().find((step) => step < current);
		if (next !== undefined) zoom = next;
	}
</script>

{#if file}
	<div class="preview">
		<div class="toolbar">
			<span class="fileName">
				<img class="fileIcon" src={fileIcon(file)} alt="" aria-hidden="true" />
				<span class="fileNameText">{file.name}</span>
			</span>
			<div class="tools">
				{#if imageSrc}
					<button
						type="button"
						class="tool"
						aria-label="Zoom out"
						title="Zoom out"
						onclick={() => zoomBy(-1)}>−</button
					>
					<button
						type="button"
						class="tool zoomLabel"
						title="Fit to window"
						onclick={() => (zoom = null)}
					>
						{zoom === null ? "Fit" : `${Math.round(zoom * 100)}%`}
					</button>
					<button
						type="button"
						class="tool"
						aria-label="Zoom in"
						title="Zoom in"
						onclick={() => zoomBy(1)}
					>
						<img src={zoomInIcon} alt="" aria-hidden="true" />
					</button>
				{/if}
				<button
					type="button"
					class="tool"
					aria-pressed={showInfo}
					aria-label="Toggle info"
					title="Info"
					onclick={() => (showInfo = !showInfo)}
				>
					<img src={infoIcon} alt="" aria-hidden="true" />
				</button>
				<a
					class="tool"
					href={openHref}
					target="_blank"
					rel="external noopener noreferrer"
					aria-label={linkLabel}
					title={linkLabel}
				>
					<img src={arrowOut} alt="" aria-hidden="true" />
				</a>
			</div>
		</div>

		<div class="stage" class:withInfo={showInfo}>
			<div class="canvas" class:pdf={file.kind === "pdf"}>
				{#if imageSrc}
					<div class="imageWrap" class:fit={zoom === null}>
						<img
							class="image"
							src={imageSrc}
							alt={file.kind === "project" ? `${file.title} screenshot` : file.title}
							style:width={zoom === null ? undefined : `${zoom * 100}%`}
						/>
					</div>
				{:else if file.kind === "pdf"}
					<iframe class="document" src={file.src} title={file.title}></iframe>
				{:else if file.kind === "project"}
					<!-- Programming projects have no screenshot: show a big app tile instead. -->
					<div class="placeholder">
						<span class="placeholderTile">
							<img src={fileIcon(file)} alt="" aria-hidden="true" />
						</span>
						<p class="placeholderTitle">{file.title}</p>
						<a
							class="linkButton"
							href={file.href}
							target="_blank"
							rel="external noopener noreferrer"
						>
							{linkLabel}
							<img src={arrowOut} alt="" aria-hidden="true" />
						</a>
					</div>
				{/if}
			</div>

			{#if showInfo}
				<aside class="info" aria-label="File info">
					<h3 class="infoTitle">{file.title}</h3>
					{#if file.description}<p class="infoText">{file.description}</p>{/if}
					{#if file.kind === "project" && file.tags?.length}
						<ul class="tags" aria-label="Technologies used">
							{#each file.tags as tag (tag)}
								<li>{tag}</li>
							{/each}
						</ul>
					{/if}
					<dl class="meta">
						<div>
							<dt>Kind</dt>
							<dd>{kindLabel}</dd>
						</div>
						{#if file.date}<div>
								<dt>Created</dt>
								<dd>{file.date}</dd>
							</div>{/if}
						<div>
							<dt>Name</dt>
							<dd>{file.name}</dd>
						</div>
					</dl>
					{#if file.kind === "project"}
						<a
							class="linkButton infoLink"
							href={file.href}
							target="_blank"
							rel="external noopener noreferrer"
						>
							{linkLabel}
							<img src={arrowOut} alt="" aria-hidden="true" />
						</a>
					{/if}
				</aside>
			{/if}
		</div>
	</div>
{:else}
	<p class="missing">This file could not be found.</p>
{/if}

<style>
	.preview {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		font-family: var(--font-mono), sans-serif;
		font-size: var(--fs-body-sm);
		color: var(--black);
	}

	.toolbar {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.4rem 0.5rem 0.4rem 0.75rem;
		border-bottom: 2px solid var(--black);
		background: var(--backlight-2);
	}

	.fileName {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		min-width: 0;
		font-weight: 700;
	}

	/* Shows what kind of file this is: image, PDF, program or game. */
	.fileIcon {
		width: 1.1rem;
		height: 1.1rem;
		flex: 0 0 auto;
	}

	.fileNameText {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tools {
		display: flex;
		gap: 0.3rem;
	}

	.tool {
		display: grid;
		place-items: center;
		min-width: 2rem;
		height: 1.9rem;
		padding: 0 0.4rem;
		box-sizing: border-box;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		font: inherit;
		font-weight: 700;
		color: inherit;
		text-decoration: none;
		cursor: pointer;
	}

	.tool:hover,
	.tool[aria-pressed="true"] {
		background: var(--accent-2);
	}

	.tool:focus-visible {
		outline: 2px dashed var(--accent);
		outline-offset: 1px;
	}

	.tool img {
		width: 1rem;
		height: 1rem;
	}

	.zoomLabel {
		min-width: 3.5rem;
	}

	.stage {
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: 1fr;
	}

	.stage.withInfo {
		grid-template-columns: 1fr minmax(11rem, 14rem);
	}

	.canvas {
		position: relative;
		min-width: 0;
		min-height: 0;
		overflow: auto;
		background: repeating-conic-gradient(var(--off-white) 0 25%, var(--white) 0 50%) 0 0 / 20px
			20px;
	}

	.canvas.pdf {
		overflow: hidden;
		background: var(--off-white);
	}

	.imageWrap {
		box-sizing: border-box;
		min-height: 100%;
		padding: 1rem;
		display: grid;
		place-items: center;
	}

	/* Fit: a definite-size box, so the image's max-height can resolve against it. */
	.imageWrap.fit {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image {
		display: block;
		max-width: none;
		border: 2px solid var(--black);
		box-shadow: 4px 4px 0 0 color-mix(in srgb, var(--black), transparent 70%);
	}

	.imageWrap.fit .image {
		max-width: 100%;
		max-height: 100%;
		box-sizing: border-box;
		object-fit: contain;
	}

	.document {
		display: block;
		width: 100%;
		height: 100%;
		border: none;
	}

	.info {
		min-height: 0;
		overflow: auto;
		padding: 0.9rem;
		border-left: 2px solid var(--black);
		background: color-mix(in srgb, var(--backlight-2), white 45%);
	}

	.infoTitle {
		margin: 0 0 0.5rem;
		font-size: var(--fs-body);
		line-height: 1.3;
	}

	.infoText {
		margin: 0 0 1rem;
		font-family: var(--font-body), sans-serif;
		line-height: 1.55;
	}

	.meta {
		display: grid;
		gap: 0.4rem;
		margin: 0;
	}

	dt {
		font-weight: 700;
		color: color-mix(in srgb, var(--black), white 35%);
	}

	dd {
		margin: 0;
		overflow-wrap: anywhere;
	}

	.missing {
		margin: 2rem;
		font-family: var(--font-mono), sans-serif;
	}

	/* Programming projects (no screenshot) */
	.placeholder {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1.5rem;
		text-align: center;
	}

	.placeholderTile {
		display: grid;
		place-items: center;
		width: 6.5rem;
		height: 6.5rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		box-shadow: 0 4px 0 0 var(--black);
	}

	.placeholderTile img {
		width: 3.25rem;
		height: 3.25rem;
	}

	.placeholderTitle {
		margin: 0;
		font-size: var(--fs-h3);
		font-weight: 700;
	}

	.linkButton {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.85rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--white);
		box-shadow: 0 3px 0 0 var(--black);
		color: var(--black);
		font-weight: 700;
		text-decoration: none;
	}

	.linkButton:hover,
	.linkButton:focus-visible {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent), white 65%);
		box-shadow: 0 3px 0 0 var(--accent);
		outline: none;
	}

	.linkButton img {
		width: 1rem;
		height: 1rem;
	}

	.infoLink {
		margin-top: 1rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0 0 1rem;
		padding: 0;
		list-style: none;
	}

	.tags li {
		padding: 0.15rem 0.45rem;
		border: 1.5px solid var(--black);
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--backlight-3), white 30%);
		font-size: 0.75rem;
		font-weight: 700;
	}

	@container (max-width: 560px) {
		/*
		 * Stack the file above its info. A column flexbox (not a grid row sized to the info's
		 * content) so the info box and the space it takes are the same height: it shrinks to
		 * fit its text, caps at 45%, and scrolls past that.
		 */
		.stage.withInfo {
			display: flex;
			flex-direction: column;
		}

		.stage.withInfo .canvas {
			flex: 1 1 0;
		}

		.info {
			flex: 0 0 auto;
			max-height: 45%;
			box-sizing: border-box;
			border-left: none;
			border-top: 2px solid var(--black);
		}
	}
</style>

<script lang="ts">
	import { tick } from "svelte";
	import { page } from "$app/state";
	import { getMedia, fileIcon } from "#lib/desktop/fs.ts";
	import type { WinProps } from "#lib/desktop/types.ts";
	import zoomInIcon from "#lib/assets/icons/zoom-in.svg";
	import infoIcon from "#lib/assets/icons/info.svg";
	import arrowOut from "#lib/assets/icons/arrow-outward.svg";
	import PdfGlyph from "../PdfGlyph.svelte";
	import ImageGlyph from "../ImageGlyph.svelte";

	let { props }: { props: WinProps } = $props();

	/** An image or a PDF. */
	const file = $derived(getMedia(props.path ?? ""));
	const imageSrc = $derived(file?.kind === "image" ? file.src : undefined);
	// From the (app) layout server load, so it is available whichever route is focused.
	const authenticated = $derived(page.data.privateAuthenticated === true);
	const showLogin = $derived(file?.locked === true && !authenticated);

	/** Zoom levels relative to the image's real size (1 = 100% = actual pixels). */
	const ZOOM_STEPS = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 3];
	/** `null` means "fit to window". */
	let zoom: number | null = $state(null);
	let showInfo = $state(true);

	let canvasEl: HTMLDivElement | undefined = $state();
	let imageEl: HTMLImageElement | undefined = $state();
	let naturalWidth = $state(0);

	// The image may already be loaded (from cache or before hydration), so its load event
	// can be missed; read the real size directly as well.
	$effect(() => {
		if (imageEl?.complete && imageEl.naturalWidth) naturalWidth = imageEl.naturalWidth;
	});

	/** The scale the image is drawn at in Fit mode, so zooming steps from what you see. */
	function fitScale() {
		if (!imageEl || !naturalWidth) return 1;
		return imageEl.clientWidth / naturalWidth;
	}

	/** Change zoom while keeping the same point in the middle of the view. */
	async function setZoom(next: number | null) {
		const canvas = canvasEl;
		const centerX = canvas
			? (canvas.scrollLeft + canvas.clientWidth / 2) / Math.max(canvas.scrollWidth, 1)
			: 0.5;
		const centerY = canvas
			? (canvas.scrollTop + canvas.clientHeight / 2) / Math.max(canvas.scrollHeight, 1)
			: 0.5;
		zoom = next;
		await tick();
		if (!canvas || next === null) return;
		canvas.scrollLeft = centerX * canvas.scrollWidth - canvas.clientWidth / 2;
		canvas.scrollTop = centerY * canvas.scrollHeight - canvas.clientHeight / 2;
	}

	function zoomBy(direction: 1 | -1) {
		const current = zoom ?? fitScale();
		const next =
			direction === 1
				? ZOOM_STEPS.find((step) => step > current + 0.001)
				: [...ZOOM_STEPS].reverse().find((step) => step < current - 0.001);
		if (next !== undefined) setZoom(next);
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
						onclick={() => setZoom(null)}
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
				{#if file.src && !showLogin}
					<a
						class="tool"
						href={file.src}
						target="_blank"
						rel="external noopener noreferrer"
						aria-label="Open in new tab"
						title="Open in new tab"
					>
						<img src={arrowOut} alt="" aria-hidden="true" />
					</a>
				{/if}
			</div>
		</div>

		<div class="stage" class:withInfo={showInfo}>
			<div class="canvas" class:pdf={file.kind === "pdf"} bind:this={canvasEl}>
				{#if imageSrc}
					{#if !naturalWidth}
						<div class="loading"><ImageGlyph size="5rem" /></div>
					{/if}
					<div class="imageWrap" class:fit={zoom === null}>
						<img
							class="image"
							class:pending={!naturalWidth}
							src={imageSrc}
							alt={file.title}
							bind:this={imageEl}
							onload={() => (naturalWidth = imageEl?.naturalWidth ?? 0)}
							style:width={zoom === null || !naturalWidth
								? undefined
								: `${Math.round(naturalWidth * zoom)}px`}
						/>
					</div>
				{:else if showLogin}
					<div class="notice">
						<PdfGlyph size="4.4rem" locked />
						<p class="noticeTitle">Password protected</p>
						<div class="embedWrapper">
							<iframe
								class="embed"
								src="/private?embed=1&redirect=/private"
								title="{file.title} login"
								aria-label="Password prompt for {file.title}"
							></iframe>
						</div>
					</div>
				{:else if file.kind === "pdf" && file.src}
					<iframe class="document" src={file.src} title={file.title}></iframe>
				{:else}
					<div class="notice">
						<PdfGlyph size="4.4rem" locked={file.locked} />
						<p class="noticeTitle">Not uploaded yet</p>
						<p class="noticeText">This file will be available here soon.</p>
					</div>
				{/if}
			</div>

			{#if showInfo}
				<aside class="info" aria-label="File info">
					<h3 class="infoTitle">{file.title}</h3>
					{#if file.description}<p class="infoText">{file.description}</p>{/if}
					<dl class="meta">
						<div>
							<dt>Kind</dt>
							<dd>{file.kind === "pdf" ? "PDF document" : "Image"}</dd>
						</div>
						{#if file.locked}<div>
								<dt>Access</dt>
								<dd>Password protected</dd>
							</div>{/if}
						{#if file.date}<div>
								<dt>Created</dt>
								<dd>{file.date}</dd>
							</div>{/if}
						<div>
							<dt>Name</dt>
							<dd>{file.name}</dd>
						</div>
					</dl>
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

	/* A message (not the document itself) can scroll in a small window. */
	.canvas.pdf:has(.notice) {
		overflow: auto;
	}

	/*
	 * Zoomed: the wrapper grows to fit the image, and the image is centered with auto
	 * margins. (Centering with place-items pushed an oversized image past the left and top
	 * edges, where it couldn't be scrolled to.)
	 */
	.imageWrap {
		box-sizing: border-box;
		display: flex;
		width: max-content;
		min-width: 100%;
		min-height: 100%;
		padding: 1rem;
	}

	/* Fit: a definite-size box, so the image's max-height can resolve against it. */
	.imageWrap.fit {
		position: absolute;
		inset: 0;
		width: auto;
		min-width: 0;
		min-height: 0;
	}

	.image {
		display: block;
		flex: none;
		margin: auto;
		max-width: none;
		border: 2px solid var(--black);
		box-shadow: 4px 4px 0 0 color-mix(in srgb, var(--black), transparent 70%);
	}

	/* Until the image loads, ImageGlyph sits in the middle of the canvas instead. */
	.image.pending {
		visibility: hidden;
	}

	.loading {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		pointer-events: none;
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

	/* Locked or not-yet-uploaded PDFs: a centered message instead of the document. */
	.notice {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		min-height: 100%;
		padding: 1.5rem 1rem;
		text-align: center;
	}

	.noticeTitle {
		margin: 0.4rem 0 0;
		font-size: var(--fs-body);
		font-weight: 700;
	}

	.noticeText {
		margin: 0;
		color: color-mix(in srgb, var(--black), white 35%);
	}

	.embedWrapper {
		width: min(100%, 24rem);
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		overflow: hidden;
		background: var(--white);
	}

	.embed {
		display: block;
		width: 100%;
		height: 10rem;
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

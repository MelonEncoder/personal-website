<script lang="ts">
	import monogram from "$lib/assets/brand/monogram.svg";
</script>

<div class="wallpaper" aria-hidden="true">
	<div class="sun"></div>
	<img class="watermark" src={monogram} alt="" />
</div>

<style>
	.wallpaper {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		background:
			/* 32px pixel grid */
			repeating-linear-gradient(
				0deg,
				transparent 0 31px,
				color-mix(in srgb, var(--black), transparent 92%) 31px 32px
			),
			repeating-linear-gradient(
				90deg,
				transparent 0 31px,
				color-mix(in srgb, var(--black), transparent 92%) 31px 32px
			),
			linear-gradient(
				160deg,
				var(--backlight-2) 0%,
				color-mix(in srgb, var(--backlight-2), var(--backlight-3) 55%) 45%,
				var(--backlight-3) 75%,
				color-mix(in srgb, var(--backlight-3), var(--accent) 35%) 100%
			);
	}

	/* A banded retro "sunset" disc behind the monogram. */
	.sun {
		position: absolute;
		left: 50%;
		top: 52%;
		width: min(62vmin, 34rem);
		aspect-ratio: 1;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background:
			repeating-linear-gradient(
				180deg,
				transparent 0 58%,
				var(--backlight-3) 58% 61%,
				transparent 61% 66%,
				var(--backlight-3) 66% 70%,
				transparent 70% 76%,
				var(--backlight-3) 76% 81%,
				transparent 81% 100%
			),
			linear-gradient(180deg, var(--accent-2), var(--accent));
		opacity: 0.45;
	}

	.watermark {
		position: absolute;
		left: 50%;
		top: 52%;
		width: min(26vmin, 14rem);
		transform: translate(-50%, -50%);
		opacity: 0.16;
	}

	/* Scanlines and vignette carried over from the old screen. */
	.wallpaper::after {
		content: "";
		position: absolute;
		inset: 0;
		background:
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 3px,
				rgba(0, 0, 0, 0.04) 3px,
				rgba(0, 0, 0, 0.04) 4px
			),
			radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.16) 100%);
	}
</style>

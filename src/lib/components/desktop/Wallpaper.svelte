<script lang="ts">
	import monogram from "#lib/assets/brand/monogram.svg";
</script>

<div class="wallpaper" aria-hidden="true">
	<img class="logo" src={monogram} alt="" />
</div>

<style>
	/* Just a gradient and the monogram. */
	.wallpaper {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		background: linear-gradient(
			160deg,
			var(--backlight-2) 0%,
			color-mix(in srgb, var(--backlight-2), var(--backlight-3) 55%) 45%,
			var(--backlight-3) 75%,
			color-mix(in srgb, var(--backlight-3), var(--accent) 35%) 100%
		);
	}

	.logo {
		position: absolute;
		left: 50%;
		top: 50%;
		width: min(26vmin, 14rem);
		transform: translate(-50%, -50%);
		opacity: 0.16;
	}
</style>

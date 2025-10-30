<script lang="ts">
	import monogram from '$lib/assets/monogram.svg';

	let year: string = new Date().getFullYear.toString();
</script>

<footer>
	<img id="monogram" src={monogram} alt="ian's monogram" width="75px" />
	<p>Copyright &copy {year} Ian Gillette</p>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

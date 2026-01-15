<script lang="ts">
	import { page } from "$app/state";
	import { resolve } from "$app/paths";

	const message = page.error?.message ?? "error";
	const value = page.state;
</script>

<h1>Error {value}</h1>
<p>{message}</p>

<a href={resolve("/")} aria-label="go home">home</a>

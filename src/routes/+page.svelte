<script>
    import "../style.css";
    import Nav from "$lib/nav.svelte";
</script>

<div id="home">
    <Nav />
</div>

<style>
    :global(body) {
        margin: 0;
        background-color: var(--black);
        color: white;
    }
    #home {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 100vh;
    }
</style>

<script>
    import Header from "../Header.svelte";
</script>

<Header />
<div id="monogramDiv">
    <p>Ian Gillette</p>
    <img src="monogram.svg" type="svg" alt="monogram of 'IG'" />
</div>

<style>
    :global(body) {
        background-color: #cfd1d2;
    }
    #monogramDiv {
        font-family: "Space Mono";
        margin: auto;
        padding: 50px 0px;
        width: 400px;
        height: 500px;
        background-color: crimson;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    #monogramDiv > img {
        height: 100%;
    }
    #monogramDiv > p {
        margin-top: 0px;
        color: white;
        font-size: 1.6em;
        font-weight: bold;
    }
</style>

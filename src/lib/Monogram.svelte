<script>
    import "../app.css";
</script>

<div id="monogramDiv">
    <p>Ian Gillette</p>
    <img src="monogram.svg" type="svg" alt="monogram of 'IG'" />
</div>

<style>
    :global(body) {
        background-color: var(--body-color);
    }
    #monogramDiv {
        font-family: "Space Mono", monospace;
        margin: auto;
        padding: 50px 0px;
        width: 300px;
        height: 450px;
        border-radius: 5px;
        border-width: 5px;
        border-color: blue;
        background-color: var(--red);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    #monogramDiv > img {
        height: 100%;
        padding: 1rem 2rem;
        background-color: rgb(180, 10, 50);
        border-radius: 5px;
    }
    #monogramDiv > p {
        margin-top: 0px;
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        border-radius: 5px;
    }
</style>

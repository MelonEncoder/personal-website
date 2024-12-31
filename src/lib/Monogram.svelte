<script>
    import "../app.css";
</script>

<div id="monogram-div">
    <img id="monogram" src="monogram.svg" type="svg" alt="monogram of 'IG'" />
    <p>Ian Gillette</p>
</div>

<style>
    :global(body) {
        background-color: var(--body-color);
    }
    #monogram-div {
        font-family: "Space Mono", monospace;
        margin: auto;
        width: 300px;
        height: 520px;
        border-radius: 5px;
        border-width: 5px;
        border-color: blue;
        background-color: var(--red);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    #monogram {
        height: 310px;
        width: 210px;
        background-color: rgb(180, 10, 50);
        border-radius: 105px;
        padding-top: 48px;
        padding-bottom: 48px;
        box-shadow: 0px 0px 12px 10px rgba(0, 0, 0, 0.35);
        transition: scale 300ms ease-in-out;
    }
    #monogram:hover {
        scale: 1.04;
        cursor: pointer;
    }
    #monogram-div p {
        margin-bottom: 0px;
        margin-top: 1rem;
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>

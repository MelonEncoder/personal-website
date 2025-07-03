<script>
    import "../style.css";
</script>

<div id="monogram-layer-3">
    <div id="monogram-layer-2">
        <div id="monogram-layer-1">
            <img id="monogram" src="monogram.svg" alt="ian's monogram" />
        </div>
    </div>
</div>

<style>
    #monogram-layer-1 {
        background-color: var(--red);
        padding: 35px 10px;
        margin: 0;
        border-radius: 120px;
        box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
    }

    #monogram-layer-1:hover {
        cursor: pointer;
        border-width: 5px;
        border-color: white;
        border-color: blue;
    }

    #monogram-layer-1:active {
        scale: 0.95;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        background-color: var(--dark-red);
    }

    #monogram-layer-2 {
        background-color: var(--dark-red);
        border-radius: 140px;
        padding: 20px;
        margin: 0;
        box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
    }

    #monogram-layer-3 {
        background-color: var(--darker-red);
        width: 280px;
        border-radius: 180px;
        padding: 20px;
        margin: auto;
        box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
    }
</style>

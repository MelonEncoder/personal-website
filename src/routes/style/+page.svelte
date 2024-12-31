<div id="style-div">
    <button>Button</button>
</div>

<style>
    :global(body) {
        background-color: var(--body-color);
    }
    #style-div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button {
        font-family: "Space Mono";
        background-color: var(--red);
        color: white;
        border-radius: 5px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(255, 55, 95);
        font-size: 1em;
        padding: 0.5em 1em;
        transition:
            border-color 250ms linear,
            background-color 250ms linear;
    }
    button:hover {
        cursor: pointer;
        border-color: rgb(300, 100, 140);
        background-color: rgb(235, 35, 75);
        transition:
            border-color 100ms linear,
            background-color 100ms linear;
    }
</style>

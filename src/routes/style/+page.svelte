<script>
    let ax = $state(0);
    let ay = $state(0);
    let mx, my;
    addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        console.log(mx, my);
    });
</script>

<div id="style-div">
    <button>Button</button>
    <div id="skew-card">
        <p>Card For Fun</p>
    </div>
</div>

<style>
    :global(body) {
        background-color: var(--body-color);
    }
    #style-div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #skew-card {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 300px;
        border-radius: 10px;
        background-color: var(--red);
        transition: scale 200ms ease;
    }
    #skew-card:hover {
        cursor: pointer;
        scale: 1.04;
    }
    #skew-card > p {
        color: white;
        font-family: "Space Mono";
        font-style: italic;
        font-weight: bold;
        margin: 0px auto;
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

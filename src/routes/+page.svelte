<script>
    import "../style.css";
    import Mono from "$lib/mono.svelte";
</script>

<nav>
    <ul>
        <li>Home</li>
        <li>Contact Me</li>
        <li>Projects</li>
    </ul>
</nav>

<div id="middle">
    <div id="m-center">
        <Mono></Mono>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        background-color: var(--white);
    }
    #middle {
        display: flex;
        flex-direction: row;
        height: 50vh;
        margin: 25vh 0;
        border-top: 2px black solid;
        border-bottom: 2px black solid;
    }
    #m-center {
        position: static;
        width: 100vw;
        background-color: var(--black);
    }
    nav {
        font-family: var(--font-body);
    }
</style>

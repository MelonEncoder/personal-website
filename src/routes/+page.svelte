<script>
    import "../style.css";
</script>

<div id="home">
    <nav id="page-nav">
        <ul>
            <li class="tab" id="about"><span>About</span></li>
            <li class="tab" id="projects"><span>Projects</span></li>
            <!-- <li class="tab" id="photagraphy"><span>Contact Me</span></li> -->
            <!-- <li class="tab" id="games"><span>Contact Me</span></li> -->
            <li class="tab" id="contect-me"><span>Contact Me</span></li>
        </ul>
    </nav>
    <div id="content">
        <img
            id="monogram"
            src="ian-monogram-white.svg"
            alt="ian monogram"
            width="100px"
        />
    </div>
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
        height: 100vh;
    }
    #content {
        border-left: 2px solid white;
        margin-left: 20px;
    }
    #page-nav > ul {
        list-style: none;
        text-align: right;
        display: flex;
        flex-direction: column;
    }
    .tab {
        font-family: var(--font-body);
        font-size: 1.5rem;
        width: 200px;
        padding: 10px;
        padding: 10px 20px;
        margin-bottom: 10px;
        border: 2px solid rgba(0, 0, 0, 0);
    }
    .tab:hover {
        border: 2px solid var(--white);
        cursor: pointer;
    }
</style>

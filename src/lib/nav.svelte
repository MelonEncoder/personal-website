<script>
    import "../style.css";
</script>

<nav id="page-nav">
    <a href="#">
        <img
            id="monogram"
            src="monogram-white.svg"
            alt="ian monogram white"
            width="100px"
        />
    </a>
    <ul>
        <a href="#">
            <li class="tab" id="about">About</li>
        </a>
        <a href="#">
            <li class="tab" id="projects">Projects</li>
        </a>
        <a href="#">
            <li class="tab" id="contect">Contact</li>
        </a>
    </ul>
</nav>

<style>
    #page-nav {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    #page-nav > ul {
        list-style: none;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding: 0 40px;
        margin-top: 3rem;
    }
    a {
        text-decoration: none;
        color: var(--white);
    }
    .tab {
        font-family: var(--font-body);
        font-size: 1.5rem;
        width: 180px;
        padding: 5px 15px;
        margin-bottom: 0.5rem;
        border: 2px solid var(--white);
    }
    .tab:hover {
        background-color: var(--white);
        color: var(--black);
        cursor: pointer;
    }
</style>

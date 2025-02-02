<script>
    import "$lib/app.css";
</script>

<header>
    <nav>
        <button id="home" name="home">
            <a href=".">Home</a>
        </button>
        <button id="about" name="about">
            <a href="./about">About</a>
        </button>
        <button id="portfolio" name="portfolio">
            <a href="./portfolio">Portfolio</a>
        </button>
        <button id="blog" name="blog">
            <a href="./blog">Blog</a>
        </button>
        <!-- <button id="resume" name="resume">Resume</button> -->
    </nav>
</header>

<style>
    header {
        padding: 0.5rem;
        margin: 20px 0px;
        border-color: white;
    }
    nav {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }
    button {
        margin: 0px 10px;
        background: transparent;
        border: 0px;
    }
    button:hover {
        cursor: pointer;
    }
    a {
        font-family: "Tajawal", sans-serif;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        text-decoration: none;
    }
    a:hover {
        color: var(--red);
    }
</style>

<script>
    import Header from "$lib/Header.svelte";
</script>

<Header />
<div id="coding-projects">
    <ul>
        <li>
            <h2>
                <a
                    href="https://github.com/ianseeingbeing/pdf_to_video"
                    target="_blank">PDF to Video</a
                >
            </h2>
            <p>Language: C++</p>
            <p>
                Created a CLI program that converts an array of .pdf files to a
                .mp4 file.
            </p>
        </li>
        <li>
            <h2>
                <a href="https://github.com/ianseeingbeing/pong" target="_blank"
                    >Pong</a
                >
            </h2>
            <p>Language: C</p>
            <p>Recreated classic pong game using the Raylib framework.</p>
        </li>
        <li>
            <h2>
                <a
                    href="https://github.com/ianseeingbeing/personal_website"
                    target="_blank">This Website</a
                >
            </h2>
            <p>Language: Svelte</p>
            <p>
                I wanted to practice using Svelte to build stuff with<br />so I
                started with my own website.
            </p>
        </li>
    </ul>
</div>

<style>
    #coding-projects {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;
    }
    ul {
        list-style-type: none;
    }
    p {
        font-family: var(--main-font);
        color: lightgrey;
    }
    a {
        color: white;
        font-family: var(--main-font);
        text-decoration: underline;
    }
    a:hover {
        text-decoration-thickness: 2px;
    }
</style>

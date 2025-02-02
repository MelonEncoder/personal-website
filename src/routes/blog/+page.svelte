<script>
    import Header from "$lib/Header.svelte";

    let blogs = [
        ["Yuka-02-01-2025", "Yuka: A Consumer's Best Friend"],
        ["Test-01-01-1970", "test: test"],
    ];
</script>

<Header />
<div>
    <ul>
        {#each blogs as blog}
            <a class="blog-post-link" href="blog/{blog[0]}">
                <li>
                    <h2 id="blog-post-title">
                        {blog[1]}
                    </h2>
                </li>
            </a>
        {/each}
    </ul>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    ul {
        font-family: var(--main-font);
        text-align: center;
        list-style: none;
        padding: 0;
        border-width: 10px;
    }
    li {
        background-color: maroon;
        width: 400px;
        min-height: 100px;
        margin: 20px 0px;
        border-radius: 5px;
        border-width: 3px;
        border-color: blue;
    }
    #blog-post-link {
        color: white;
        text-decoration: none;
    }
    #blog-post-title {
        color: white;
        text-align: center;
        text-decoration: none;
    }
</style>

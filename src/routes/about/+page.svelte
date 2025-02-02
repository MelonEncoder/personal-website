<script>
    import Header from "$lib/Header.svelte";
</script>

<Header />
<h1>Hello there!</h1>
<div id="content">
    <p>
        I have a passion for learning, problem solving, and discovering new
        things. I enjoy programming, drawing, robotics, graphic design, reading,
        and videogames.
    </p>
</div>

<style>
    #content {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-family: var(--main-font);
        color: white;
        width: 60vw;
        max-width: 600px;
        margin: 0 auto;
    }
    h1 {
        color: white;
        font-family: var(--main-font);
        text-align: center;
    }
</style>

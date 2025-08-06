import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-page">
            <svg
                className="monogram"
                width="100%"
                height="100%"
                viewBox="0 0 996 996"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g transform="matrix(1,0,0,1,-14,-14)">
                    <path
                        id="ian-monogram-white"
                        d="M470,440.125L98.5,440.125L98.5,1009.5L14.5,1009.5L14.5,356.125L470,356.125L470,14.5L554,14.5L554,356.125L1009.5,356.125L1009.5,1009.5L242.25,1009.5L242.25,811.625L326.25,811.625L326.25,853.625L326.25,925.5L925.5,925.5L925.5,440.125L554,440.125L554,697.75L781.75,697.75L781.75,781.75L470,781.75L470,440.125ZM170.375,56.5C233.224,56.5 284.25,107.526 284.25,170.375C284.25,233.224 233.224,284.25 170.375,284.25C107.526,284.25 56.5,233.224 56.5,170.375C56.5,107.526 107.526,56.5 170.375,56.5Z"
                    />
                </g>
            </svg>
            <h1 className="my-name">Ian Gillette</h1>
            <div className="word-container">
                <div className="word-title">
                    <h2 className="word">freethinker</h2>
                    <h3 className="word-type">noun</h3>
                </div>
                <p className="word-sound">free•think•er</p>
                <p className="definition">
                    a person who forms their own opinions, independently from
                    authority or established norms, on the basis of reason and
                    observable information
                </p>
            </div>
        </div>
    );
}

export default HomePage;

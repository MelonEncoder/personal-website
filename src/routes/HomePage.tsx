import "./HomePage.css";
import monogram from "/monogram-white.svg";

function HomePage() {
    return (
        <>
            <div className="monogram-container">
                <img
                    id="monogram"
                    src={monogram}
                    alt="monogram white"
                    width="100px"
                />
                <h1 className="my-name">Ian Gillette</h1>
            </div>
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
        </>
    );
}

export default HomePage;

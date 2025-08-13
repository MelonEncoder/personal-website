import "./+Page.css";
import Word from "../lib/Word.tsx";
import PageNav from "../lib/PageNav.tsx";
import Spacer from "../lib/Spacer.tsx";
import Monogram from "../lib/Monogram.tsx";

function HomePage() {
    return (
        <div className="home-page">
            <Monogram size="100px" />
            <h1 className="my-name">Ian Gillette</h1>
            <Spacer width="100%" height="2rem" />
            <Word
                spelling="freethinker"
                type="noun"
                phoneticSpelling="free•think•er"
                definition="a person who forms their own opinions, independently from authority or established norms, on the basis of reason and observable information"
            />
            <Spacer width="100%" height="2rem" />
            <PageNav />
        </div>
    );
}

export default HomePage;

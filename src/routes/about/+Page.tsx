import "./+Page.css";
import Header from "../../lib/Header";

function AboutPage() {
    return (
        <div className="about-page general-page">
            <Header />
            <h1>Who Am I?</h1>
            {/*<p>
                My name is Ian Gillette. I would define myself as a designer,
                programmer, and advid learner of things.
            </p>*/}
            <p>This is the About page.</p>
        </div>
    );
}

export default AboutPage;

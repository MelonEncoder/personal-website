import "./+Page.css";
import Header from "../../lib/Header";

function ProjectsPage() {
    return (
        <div className="projects-page general-page">
            <Header />
            <h1>
                <a
                    className="extern-link"
                    href="https://github.com/MelonEncoder"
                    target="_blank"
                >
                    My Github
                </a>
            </h1>
            <p>This is the Projects page.</p>
        </div>
    );
}

export default ProjectsPage;

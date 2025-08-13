import "./PageNav.css";
import { Link } from "react-router";

function PageNav() {
    return (
        <nav id="page-nav">
            <ul>
                <Link className="link" to="/about">
                    <li>About</li>
                </Link>
                <Link className="link" to="/projects">
                    <li>Projects</li>
                </Link>
            </ul>
        </nav>
    );
}

export default PageNav;

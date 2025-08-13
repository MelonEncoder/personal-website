import "./Header.css";
import Monogram from "./Monogram";
import PageNav from "./PageNav";
import { Link } from "react-router";
import Spacer from "./Spacer";

function Header() {
    return (
        <header>
            <Link to="/">
                <Monogram size="64px" />
            </Link>
            <Spacer width="2rem" height="100%" />
            <PageNav />
        </header>
    );
}

export default Header;

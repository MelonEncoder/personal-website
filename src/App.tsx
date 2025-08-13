import "./App.css";
import HomePage from "./routes/+Page.tsx";
import AboutPage from "./routes/about/+Page.tsx";
import ProjectsPage from "./routes/projects/+Page.tsx";
import { Routes, Route } from "react-router";

function App() {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="about" element={<AboutPage />}></Route>
                <Route path="projects" element={<ProjectsPage />}></Route>
            </Routes>
        </div>
    );
}

export default App;

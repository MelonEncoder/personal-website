import "./App.css";
import monogram from "./assets/monogram-white.svg";

function App() {
    return (
        <>
            <img
                id="monogram"
                src={monogram}
                alt="monogram white"
                width="100px"
            />
            <h1>Ian Gillette</h1>
        </>
    );
}

export default App;

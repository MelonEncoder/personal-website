import "./Word.css";

interface WordParams {
    spelling: string;
    type: string;
    phoneticSpelling: string;
    definition: string;
}

function Word(params: WordParams) {
    return (
        <div className="word-container">
            <div className="word-title">
                <h2 className="word">{params.spelling}</h2>
                <h3 className="word-type">{params.type}</h3>
            </div>
            <p className="phonetic">{params.phoneticSpelling}</p>
            <p className="definition">{params.definition}</p>
        </div>
    );
}

export default Word;

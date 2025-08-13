interface SpacerParams {
    width: string;
    height: string;
}

function Spacer(p: SpacerParams) {
    return (
        <div
            style={{
                width: p.width,
                height: p.height,
            }}
        ></div>
    );
}

export default Spacer;

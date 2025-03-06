

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            <video
                src="/Opening.mp4"
                autoPlay
                loop
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Covers the full screen
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            />
        </div>
    );
}

export default App;

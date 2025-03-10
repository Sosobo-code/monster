import { useState, useRef, useEffect } from "react";
import "./app.css"; // Import styles

function App() {
    const [play, setPlay] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(null); // Reference for audio

    const handlePlay = () => {
        setPlay(true);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= 10) {
            videoRef.current.pause();
            setVideoEnded(true); // Freeze the frame after 10 seconds
        }
    };

    useEffect(() => {
        if (videoEnded && audioRef.current) {
            audioRef.current.play(); // Play audio when the text appears
        }
    }, [videoEnded]); // This will run when videoEnded is set to true

    return (
        <div className="video-container">
            {!play ? (
                <button className="play-button" onClick={handlePlay}>
                    Play Video
                </button>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        src="/Opening.mp4"
                        autoPlay
                        onTimeUpdate={handleTimeUpdate}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    />
                    {videoEnded && (
                        <>
                            <div className="freeze-frame">
                                <h1>What is a human worth?</h1>
                            </div>
                            <audio ref={audioRef} src="/waitingforthenight.mp3" />
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default App;

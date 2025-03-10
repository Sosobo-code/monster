import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./app.css";

function App() {
    const [play, setPlay] = useState(false);
    const [fadeTextIndex, setFadeTextIndex] = useState(0);
    const [isButtonVisible, setButtonVisible] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const texts = [
        "What makes a monster?",
        "Nurture, Nature?",
        "Really? What makes a monster?",
        "Does a monster exist inside all of us?",
        "A monster.",
        "A true ever-growing monster.",
        "What makes a monster?"
    ];

    const handlePlay = () => {
        setPlay(true);
    };

    useEffect(() => {
        const textInterval = setInterval(() => {
            setFadeTextIndex((prevIndex) => {
                if (prevIndex === texts.length - 1) {
                    setButtonVisible(true);
                    clearInterval(textInterval);
                    return prevIndex;
                }
                return prevIndex + 1;
            });
        }, 5000);

        return () => clearInterval(textInterval);
    }, []);

    return (
        <div className="video-container">
            {/* Text container only visible before button appears */}
            {!isButtonVisible && (
                <div className="text-container">
                    {texts.slice(0, fadeTextIndex + 1).map((text, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="fade-text"
                        >
                            {text}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Button appears after last text */}
            {isButtonVisible && !play && (
                <div className="centered-button-container">
                    <motion.button
                        className="play-button"
                        onClick={handlePlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        {texts[fadeTextIndex]}
                    </motion.button>
                </div>
            )}

            {play && (
                <video
                    ref={videoRef}
                    src="/Opening.mp4"
                    autoPlay
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
            )}

            <audio ref={audioRef} src="/waitingforthenight.mp3" />
        </div>
    );
}

export default App;
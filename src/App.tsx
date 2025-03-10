import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./app.css";

function App() {
    const [play, setPlay] = useState(false);
    const [fadeTextIndex, setFadeTextIndex] = useState(0);
    const [isButtonVisible, setButtonVisible] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const texts = [
        "What makes a monster?",
        "Nature, Nurture?",
        "Does a monster exist inside all of us?",
        "A monster.",
        "An ever-growing monster.",
        "Look at me, Look at me. The monster inside of me is growing bigger.",
        "What makes a monster?",
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
            {/* Text container */}
            {!isButtonVisible && (
                <div className="text-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={fadeTextIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="text-content"
                        >
                            {texts[fadeTextIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            {/* Button with smooth entrance */}
            {isButtonVisible && !play && (
                <div className="centered-button-container">
                    <motion.button
                        className="play-button"
                        onClick={handlePlay}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
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
                    className="video-container"
                />
            )}

            <audio ref={audioRef} src="/waitingforthenight.mp3" />
        </div>
    );
}

export default App;
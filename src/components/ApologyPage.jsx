import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import s11 from './11.jpg';
import s22 from './22.jpg';
import s33 from './33.jpg';
import { div } from "framer-motion/client";

const messages = [
    "You are my sunshine ☀️",
    "My heart beats only for you ❤️",
    "Forever & Always 💕",
    "You're my safe place 🌸",
    "I love you more every day 🌹"
];

const photos = [
    { src: s11, caption: "Our First Date 💖" },
    { src: s22, caption: "Your Beautiful Smile 🌸" },
    { src: s33, caption: "Best Memory Ever ✨" },
];

export default function ApologyPage() {
    const [text, setText] = useState("");
    const [showConfetti, setShowConfetti] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [daysTogether, setDaysTogether] = useState(0);
    const [randomMsg, setRandomMsg] = useState("");

    const apology =
        "I know I made a mistake... 💔 But I truly care about you and I'm really sorry. Please forgive me ❤️";

    // Typing effect
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(apology.slice(0, i));
            i++;
            if (i > apology.length) clearInterval(interval);
        }, 70);
        return () => clearInterval(interval);
    }, []);

    // Days Counter (example: relationship start date)
    useEffect(() => {
        const startDate = new Date("2023-01-01"); // change this to your real start date ❤️
        const today = new Date();
        const diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        setDaysTogether(diff);
    }, []);

    // Slideshow Auto Change
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhoto((prev) => (prev + 1) % photos.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleForgive = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    };

    const randomLove = () => {
        setRandomMsg(messages[Math.floor(Math.random() * messages.length)]);
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 via-red-300 to-purple-400 text-center relative overflow-hidden">


            {showConfetti && <Confetti />}

            {/* Title */}
            <motion.h1
                className="text-5xl font-bold text-white drop-shadow-lg mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
            >
                I’m Sorry 💔
            </motion.h1>

            {/* Typing Text */}
            <p className="text-lg md:text-2xl text-white font-medium max-w-xl px-4 mb-6">
                {text}
            </p>

            {/* Forgive Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleForgive}
                className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-2xl shadow-lg hover:bg-pink-100 transition"
            >
                Forgive Me 💕
            </motion.button>

            {/* Days Counter */}
            <p className="mt-4 text-white font-semibold">
                We’ve been together for {daysTogether} days 💞
            </p>

            {/* Slideshow */}
            {/* Slideshow */}
            <div className="mt-6 w-64 h-64 bg-white rounded-2xl shadow-lg relative overflow-hidden">
                <img
                    src={photos[currentPhoto].src}
                    alt="memory"
                    className="w-full h-full object-cover"
                />
                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-1 text-sm">
                    {photos[currentPhoto].caption}
                </div>
            </div>


            {/* Random Love Message */}
            <button
                onClick={randomLove}
                className="mt-6 px-4 py-2 bg-yellow-200 text-pink-700 font-semibold rounded-lg hover:bg-yellow-300"
            >
                Click for a Surprise 💌
            </button>
            {randomMsg && (
                <p className="mt-3 text-xl font-bold text-white">{randomMsg}</p>
            )}
        </div>
    );
}

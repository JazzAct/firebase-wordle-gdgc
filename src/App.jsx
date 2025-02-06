import React, { useEffect, useState } from 'react';
import WordGrid from './WordGrid';
import Leaderboard from "./Leaderboard.jsx";
import './App.css';
import Keyboard from './Keyboard';
import words from './random_words';
import { db, collection, addDoc } from "./firebase"; // Firebase imports

const MAX_ATTEMPTS = 10; // Set max attempts limit

function App() {
    const [pastGuesses, setPastGuesses] = useState([]);
    const [guess, setGuess] = useState("");
    const [correctWord, setCorrectWord] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [gameOver, setGameOver] = useState(false); // Changed from string to boolean
    const [score, setScore] = useState(0);
    const [gameResult,setGameResult] = useState(""); // "win" or "lose"

    const handleKey = (key) => {
        if (gameOver || pastGuesses.length >= MAX_ATTEMPTS) return; // Stop input if game is over

        setGuess((e) => {
            if (e.length >= 4) {
                const newGuess = e + key;
                setPastGuesses((p) => [...p, newGuess]);
                return "";
            }
            return e + key;
        });
    };

    const backspaceKey = () => {
        setGuess((e) => e.slice(0, -1));
    };

    useEffect(() => {
        setCorrectWord(words[Math.floor(Math.random() * words.length)]);
        
        const handleKeyPress = (ev) => {
            const letter = ev.key.toLowerCase();
            if (ev.key === 'Backspace') {
                backspaceKey();
                return;
            }
            if (letter < "a" || letter > "z" || letter.length > 1) return;
            handleKey(letter);
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, []);

    useEffect(() => {
        if (pastGuesses.length === 0) return;

        const lastGuess = pastGuesses.at(-1);

        if (lastGuess === correctWord) {
            const finalScore = Math.max(110 - pastGuesses.length * 10, 0);
            setScore(finalScore);
            setGameOver(true);
            setGameResult("win"); // Player won
        } else if (pastGuesses.length >= MAX_ATTEMPTS) {
            setGameOver(true);
            setGameResult("lose"); // Player lost
        }
    }, [pastGuesses, correctWord]);

    // Function to save score in Firebase
    const saveScore = async (name, attempts) => {
        if (!name) return;
        try {
            await addDoc(collection(db, "leaderboard"), {
                name,
                score: 110 - attempts * 10, 
                timestamp: new Date(),
            });
            alert("Score submitted!");
        } catch (error) {
            console.error("Error saving score:", error);
        }
    };

    return (
        <main>
            <div>
                <h1>Word Guessing Game</h1>
            </div>

            {!gameOver ? (
                <>
                    <WordGrid currentGuess={guess} guesses={pastGuesses} correctWord={correctWord} />
                    <Keyboard handleKey={handleKey} correctWord={correctWord} pastGuesses={pastGuesses} />
                </>
            ) : (
                <div>
                    <h2>Game Over!</h2>
                    <p>Your Score: {score}</p>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                    <button onClick={() => saveScore(playerName, pastGuesses.length)}>Submit Score</button>
                    <button onClick={() => window.location.reload()}>Play Again</button>
                </div>
            )}

            <Leaderboard />
        </main>
    );
}

export default App;
